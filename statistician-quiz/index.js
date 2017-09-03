import './style/site.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Buefy from 'buefy';
import {sync} from 'vuex-router-sync';

import HomeViewModel from './view-model/home.vue';
import QuizViewModel from './view-model/quiz.vue';
import QuestionViewModel from './view-model/question.vue';
import QuizResultViewModel from './view-model/quiz-result.vue';

import createStoreOpts from './store';
import quizes, {getQuizId} from './quizes';

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(Vuex);

export function createRoutes() {
  let routes = [{
    name: 'home',
    path: '/',
    component: HomeViewModel
  }, {
    name: 'quiz',
    path: '/quiz/:quizId',
    component: QuizViewModel,
    children: [{
      name: 'question',
      path: 'question/:questionId',
      component: QuestionViewModel
    }, {
      name: 'quizResult',
      path: 'result',
      component: QuizResultViewModel
    }]
  }];
  return routes;
};

const routes = createRoutes();

const router = new VueRouter({
  routes,
  mode: 'hash',
  base: '/'
});

const store = new Vuex.Store(createStoreOpts());

// NOTE(coalman): returns an unsync callback
sync(store, router);

const app = new Vue({
  router,
  store,

  template: '<router-view></router-view>'
});

app.$mount('#app');
