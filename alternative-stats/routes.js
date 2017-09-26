import HomeViewModel from './view-model/home.vue';
import QuizViewModel from './view-model/quiz.vue';
import QuizQuestionViewModel from './view-model/quiz-question.vue';
import QuizResultViewModel from './view-model/quiz-result.vue';

export default function createRoutes() {
  let routes = [{
    name: 'home',
    path: '/',
    component: HomeViewModel
  }, {
    name: 'quiz',
    path: '/quiz/:quizId',
    component: QuizViewModel,
    props: true,
    children: [{
      name: 'quizQuestion',
      path: 'question/:questionId',
      component: QuizQuestionViewModel,
      props: true
    }, {
      name: 'quizResult',
      path: 'result',
      component: QuizResultViewModel
    }]
  }];

  return routes;
};
