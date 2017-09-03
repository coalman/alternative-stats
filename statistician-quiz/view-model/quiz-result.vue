<template>
  <section class="container">
    <div class="section">
      <h2 class="subtitle is-3">Results</h2>

      <table class="table is-narrow">
        <thead>
          <tr>
            <th>Question</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(questionResult, index) in questionResults">
            <th class="question-result-index">{{ index }}</th>
            <th class="question-result-score">{{ questionResult.score }}</th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>{{ totalScore }}</th>
          </tr>
        </tfoot>
      </table>

      <button class="button" @click="navHome">More Quizes</button>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

export default {
  data() {
    return {
      // NOTE(coalman): this is changed during a computed method,
      // don't expect scoreDeltaCache to be watchable (shouldn't need to be)
      scoreDeltaCache: []
    };
  },

  computed: {
    ...mapState({
      answers: state => state.quiz.answers
    }),

    ...mapGetters('quiz', {
      quiz: 'currentQuiz'
    }),

    choices() {
      return this.answers.map((answer, questionId) => this.quiz.questions[questionId].choices[answer]);
    },

    questionResults() {
      return this.choices.map((choice, index) => {

        return {
          choice,
          correct: choice.correct,
          score: (choice.correct ? 1.0 : 0.0)
        };
      });
    },

    totalScore() {
      return this.questionResults.reduce((total, result) => total + result.score, 0);
    }
  },

  methods: {
    navHome() {
      this.$router.push('/');
    }
  }
};

</script>

<style lang="scss">
.question-result-index {
  width: 80%;
}

.question-result-score {
  width: 20%;
}
</style>
