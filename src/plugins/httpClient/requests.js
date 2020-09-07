export default [
  {
    name: 'getPosts',
    setCustomLoader: true,
    config: {
      baseURL: process.env.VUE_APP_API,
      url: '/posts',
    },
    requireAuth: true,
  },
];
