import HttpClient from './HttpClient';

const httpClientPlugin = {
  install(Vue, options) {
    if (!options || !options.requests) {
      throw new Error('Please initialise plugin with requests');
    }
    if (options.requests.length < 1) {
      throw new Error('Please specify at least one request in list');
    }
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$httpClient = new HttpClient(options.requests);
  },
};

export default httpClientPlugin;
