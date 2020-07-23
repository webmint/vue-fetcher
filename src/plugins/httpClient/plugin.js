import HttpClient from './HttpClient';

const httpClientPlugin = {
  install(Vue, options) {
    if (!options || !options.baseConfig) {
      throw new Error('Please initialise plugin with baseConfig.');
    }
    if (!options.baseConfig.baseURL) {
      throw new Error('baseURL in baseConfig is required');
    }
    if (!options || !options.methodsList) {
      throw new Error('Please initialise plugin with methodsList');
    }
    if (options.methodsList.length < 1) {
      throw new Error('Please specify at least one method in list');
    }
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$httpClient = new HttpClient(options.baseConfig, options.methodsList);
  },
};

export default httpClientPlugin;
