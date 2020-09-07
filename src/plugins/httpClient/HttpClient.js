import axios from 'axios';
import Vue from 'vue';
import { capitalizeFirstLetter } from './helpers';
import ConfigGenerator from './ConfigGenerator';

export default class HttpClient {
  constructor(requests) {
    this.client = axios.create();
    this.awakenRequests = Vue.observable({ requests: [] });

    requests.forEach((request) => {
      if (request.setCustomLoader) {
        this.setCustomLoader(request.name);
      }

      this[request.name] = async (params, data) => {
        try {
          this.addToAwakenRequests(request.name);
          return await this.client.request(new ConfigGenerator(request, params, data).config);
        } catch {
          throw new Error();
        } finally {
          this.removeFromAwakenRequests(request.name);
        }
      };
    });
  }

  addToAwakenRequests(name) {
    this.awakenRequests.requests.push(name);
  }

  removeFromAwakenRequests(name) {
    this.awakenRequests.requests = this.awakenRequests.requests
      .filter((r) => r !== name);
  }

  setCustomLoader(name) {
    return Object.defineProperty(this, `isLoading${capitalizeFirstLetter(name)}`, {
      get: () => this.awakenRequests.requests.includes(name),
    });
  }

  get isLoading() {
    return !!this.awakenRequests.requests.length;
  }
}
