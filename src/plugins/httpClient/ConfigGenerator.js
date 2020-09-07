import AuthGenerator from './AuthGenerator';

export default class ConfigGenerator {
  constructor(request, params, data) {
    this.config = { ...request.config };
    if (request.requireAuth) {
      this.config = new AuthGenerator(this.config);
    }
    if (params) {
      Object.assign(this.config, { params });
    }
    if (data) {
      Object.assign(this.config, { data });
    }
  }
}
