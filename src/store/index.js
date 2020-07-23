import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async myAction() {
      // eslint-disable-next-line no-underscore-dangle
      const { data } = await this._vm.$httpClient.getPosts();
      console.log(data);
    },
  },
  modules: {
  },
});
