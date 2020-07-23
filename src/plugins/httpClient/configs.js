export const baseConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};

export const methodsList = [
  {
    name: 'getPosts',
    setCustomLoader: true,
    config: {
      url: '/posts',
    },
  },
];
