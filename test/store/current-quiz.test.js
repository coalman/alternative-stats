import {state, getters, mutations, actions} from 'alternative-stats/store/current-quiz';

describe('store/current-quiz.js', function () {
  describe('getters', function () {
    describe('currentQuiz', function () {
      it('should use quizzes.lookup', function () {
        const state = {
          quizId: 'test-id'
        };
        const quiz = 'test';
        const rootState = {
          quizzes: {
            lookup: {
              'test-id': quiz
            }
          }
        };

        const actual = getters.currentQuiz(state, null, rootState);

        assert.strictEqual(actual, quiz, 'should return the value assigned to test-id');
      });
    });
  });
});
