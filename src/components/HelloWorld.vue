<template>
  <div class="hello">
    <div v-if="this.$httpClient.isLoadingGetPosts">Loading</div>
    <button v-if='authenticated' v-on:click='logout' id='logout-button'> Logout </button>
    <button v-else v-on:click='login' id='login-button'> Login </button>
    <ul>
      <li
        v-for="(p, i) in posts"
        :key="i"
      >
        {{ p.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      authenticated: false,
      posts: [],
    };
  },
  created() {
    this.isAuthenticated();
    this.fetchData();
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
    },
    async fetchData() {
      const { data } = await this.$httpClient.getPosts();
      this.posts = data;
    },
    login() {
      this.$auth.loginRedirect('/');
    },
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();

      // Navigate back to home
      this.$router.push({ path: '/' });
    },
  },
};
</script>
