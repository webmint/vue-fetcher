import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@okta/okta-vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/implicit/callback',
    component: Auth.handleCallback(),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
