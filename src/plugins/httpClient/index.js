import Vue from 'vue';
import requests from './requests';
import httpClientPlugin from './plugin';

Vue.use(httpClientPlugin, { requests });
