import quiz, {quizLookup, getQuizId} from '../quizzes';

function state() {
  return {
    currentQuizId: '',
    answers: [],

    data: quiz,
    lookup: quizLookup
  };
};

const getters = {
  currentQuizId(state, getters, rootState) {
    return rootState.route.params.quizId;
  },

  currentQuestionId(state, getters, rootState) {
    return Number(rootState.route.params.questionId);
  },

  currentQuiz(state, getters) {
    if (getters.currentQuizId == null) { return null; }

    return state.lookup[getters.currentQuizId];
  },

  currentQuestion(state, getters) {
    if (getters.currentQuestionId == null || getters.currentQuiz == null) {
      return null;
    }
    return getters.currentQuiz.questions[getters.currentQuestionId];
  },

  currentAnswer(state) {
    if (state.answers.length <= 0) {
      return -1;
    }

    return state.answers[state.answers.length - 1];
  },

  currentChoice(state, getters) {
    if (getters.currentAnswer === -1 || getters.currentQuestion == null) {
      return null;
    }

    return getters.currentQuestion.choices[getters.currentAnswer];
  }
};

const actions = {};

const mutations = {
  addAnswer(state, payload) {
    state.answers.push(payload.answer);
  },

  newQuiz(state, payload) {
    state.currentQuizId = payload.quizId;
    state.answers = [];
  }
};

export { state, getters, actions, mutations };
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
