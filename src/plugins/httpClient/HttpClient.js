import axios from 'axios';
import Vue from 'vue';
import { capitalizeFirstLetter } from './helpers';

export default class HttpClient {
  constructor(baseConfig, methods) {
    this.client = axios.create(baseConfig);
    this.methodsList = methods;
    this.awakenRequests = Vue.observable({ requests: [] });

    this.methodsList.forEach(({
      name, config, setCustomLoader, requireAuth,
    }) => {
      if (setCustomLoader) {
        this.setCustomLoader(name);
      }

      this[name] = async () => {
        try {
          this.addToAwakenRequests(name);
          let methodConfig = config;
          if (requireAuth) {
            methodConfig = this.addAuth(config);
          }
          return await this.client.request(methodConfig);
        } catch {
          throw new Error();
        } finally {
          this.removeFromAwakenRequests(name);
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

  // eslint-disable-next-line class-methods-use-this
  getToken() {
    const oktaTS = JSON.parse(localStorage.getItem('okta-token-storage'));
    return oktaTS && oktaTS.accessToken ? oktaTS.accessToken.accessToken : '';
  }

  addAuth(config) {
    const hasHeaders = Object.prototype.hasOwnProperty.call(config, 'headers');
    if (hasHeaders) {
      const headers = {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          ...config.headers,
        },
      };
      return Object.assign(config, { ...headers });
    }
    return Object.assign(config, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
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
