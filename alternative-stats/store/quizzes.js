import quizzes, {quizLookup} from 'alternative-stats/quizzes';
import shuffle from 'lodash.shuffle';

function state() {
  return {
    list: quizzes,
    lookup: quizLookup
  };
};

const getters = {};
const mutations = {
  shuffleQuestions(state, args) {
    const quiz = state.lookup[args.quizId];

    const shuffled = shuffle(quiz.questions);

    quiz.questions = shuffled;
  }
};
const actions = {};

export { state, getters, actions, mutations };
export default {
  state,
  getters,
  actions,
  mutations
};
