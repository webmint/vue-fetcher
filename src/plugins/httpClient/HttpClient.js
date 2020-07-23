import axios from 'axios';
import Vue from 'vue';
import { capitalizeFirstLetter } from './helpers';

export default class HttpClient {
  constructor(baseConfig, methods) {
    const observableRequests = Vue.observable({ requests: [] });

    this.client = axios.create(baseConfig);
    this.methodsList = methods;
    this.awakenRequests = observableRequests;

    this.methodsList.forEach(({
      name, config, setCustomLoader, requireAuth,
    }) => {
      if (setCustomLoader) {
        Object.defineProperty(this, `isLoading${capitalizeFirstLetter(name)}`, {
          get: () => this.awakenRequests.requests.includes(name),
        });
      }
      this[name] = async () => {
        try {
          if (requireAuth) {
            const oktaTS = await JSON.parse(localStorage.getItem('okta-token-storage'));
            const token = oktaTS.accessToken ? oktaTS.accessToken.accessToken : null;
            this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
          }
          this.addToAwakenRequests(name);
          const result = await this.client.request(config);
          this.removeFromAwakenRequests(name);
          return result;
        } catch {
          this.removeFromAwakenRequests(name);
          return new Error();
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

  get isLoading() {
    return !!this.awakenRequests.requests.length;
  }
}
