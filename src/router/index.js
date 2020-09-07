import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@okta/okta-vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

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
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
