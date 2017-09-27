import roundTo from 'round-to';

function state() {
  return {
    quizId: '',
    questionId: 0,
    answers: [],
    scores: []
  };
};

const getters = {
  currentQuiz(state, getters, rootState) {
    const quizId = state.quizId;
    const lookup = rootState.quizzes.lookup;

    return lookup[quizId];
  },

  currentQuestion(state, getters) {
    const quiz = getters.currentQuiz;

    if (quiz && quiz.questions) {
      return quiz.questions[state.questionId];
    }

    return null;
  },

  currentAnswer(state, getters) {
    const question = getters.currentQuestion;

    if (state.answers.length <= 0 || !question) {
      return null;
    }

    const lastAnswer = state.answers[state.answers.length - 1];

    return question.choices[lastAnswer];
  },

  otherAnswers(state, getters) {
    const question = getters.currentQuestion;

    if (state.answers.length <= 0 || !question) {
      return null;
    }

    const lastAnswer = state.answers[state.answers.length - 1];

    let othersBegin = question.choices.slice(0, lastAnswer);
    let othersEnd = question.choices.slice(lastAnswer + 1, question.choices.length);

    return othersBegin.concat(othersEnd);
  },

  currentScore(state) {
    return state.scores[state.questionId];
  },

  lastQuestion(state, getters) {
    const quiz = getters.currentQuiz;

    if (!quiz) return false;

    return quiz.questions.length <= state.answers.length;
  },

  totalScore(state) {
    const sum = state.scores.reduce((total, score) => total + score, 0);
    return roundTo(sum, 2);
  }
};

const mutations = {
  currentQuiz(state, args) {
    state.quizId = args.quizId;
  },

  currentQuestion(state, args) {
    state.questionId = args.questionId;
  },

  clearAnswers(state) {
    state.answers = [];
    state.scores = [];
  },

  addAnswer(state, args) {
    state.answers.push(args.answer);
    state.scores.push(args.score);
  }
};

const actions = {
  startQuiz(ctx, args) {
    ctx.commit({
      type: 'currentQuiz',
      quizId: args.quizId
    });

    ctx.commit({
      type: 'shuffleQuestions',
      quizId: args.quizId
    });

    ctx.commit({
      type: 'currentQuestion',
      questionId: 0
    });

    ctx.commit('clearAnswers');
  },

  answerQuestion(ctx, args) {
    let score = 0;
    const choice = ctx.getters.currentQuestion.choices[args.answer];

    if (choice.correct) {
      score = 0.5 + (Math.random() * 0.5);
      score = roundTo(score, 2);
    }

    ctx.commit({
      type: 'addAnswer',
      answer: args.answer,
      score
    });
  },

  nextQuestion(ctx) {
    ctx.commit({
      type: 'currentQuestion',
      questionId: ctx.state.questionId + 1
    });
  }
};

export { state, getters, mutations, actions };
export default {
  state,
  getters,
  actions,
  mutations
};
