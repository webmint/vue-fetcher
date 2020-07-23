import Vue from 'vue';
import { baseConfig, methodsList } from './configs';
import httpClientPlugin from './plugin';

Vue.use(httpClientPlugin, { baseConfig, methodsList });
