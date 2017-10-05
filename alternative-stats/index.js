import 'babel-polyfill';
import './style/site.scss';

import Buefy from 'buefy';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import createRoutes from './routes';
import createStoreOpts from './store';

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes: createRoutes(),
  mode: 'hash',
  base: '/'
});

const store = new Vuex.Store(createStoreOpts());

const app = new Vue({
  router,
  store,

  template: '<router-view></router-view>'
});

app.$mount('#app');
