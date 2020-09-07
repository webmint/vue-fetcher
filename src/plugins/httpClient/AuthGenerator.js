export default class AuthGenerator {
  constructor(config) {
    const AuthorisedConfig = this.addAuth(config);
    Object.keys(AuthorisedConfig).forEach((key) => {
      Object.defineProperty(this, key, { value: AuthorisedConfig[key] });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getToken() {
    const oktaTS = JSON.parse(localStorage.getItem('okta-token-storage'));
    return oktaTS && oktaTS.accessToken ? oktaTS.accessToken.accessToken : '';
  }

  addAuth(config) {
    const hasHeaders = Object.prototype.hasOwnProperty.call(config, 'headers');
    let headers = {
      Authorization: `Bearer ${this.getToken()}`,
    };
    if (hasHeaders) {
      headers = Object.assign(config.headers, headers);
    }
    return Object.assign(config, { headers });
  }
}
