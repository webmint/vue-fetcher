import Vue from 'vue';
import Auth from '@okta/okta-vue';

Vue.use(Auth, {
  issuer: `https://${process.env.VUE_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.VUE_APP_OKTA_ID,
  redirectUri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
});
