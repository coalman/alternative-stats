<template lang="pug">
.section.quiz-result
  h2.subtitle.is-3.quiz-result-title Results

  table.table.is-narrow.quiz-result-table
    thead
      tr
        th Question
        th Score
    tbody
      tr(v-for="(result, index) in results")
        th.question-result-index {{ index }}
        th.question-result-score {{ result.score }}
    tfoot
      tr
        th Total
        th {{ totalScore }}

  p Did you enjoy the quiz? Share it with your friends!
  div.quiz-result-share
    a.button.is-white.share-btn(href="https://twitter.com/home?status=Check%20out%20these%20fun%20and%20educational%20quizzes%20on%20famous%20statisticians!%20http%3A//alternative-stats.laber-labs.com" target="_blank")
      span.icon.is-medium
        i.fa.fa-twitter-square.fa-2x
    a.button.is-white.share-btn(href="https://www.facebook.com/sharer/sharer.php?u=http%3A//alternative-stats.laber-labs.com" target="_blank")
      span.icon.is-medium
        i.fa.fa-facebook-square.fa-2x
  p Check out other Laber Lab projects:
  div.quiz-result-links
    a.button.is-white.share-btn(href="http://www.laber-labs.com/" target="_blank")
      span.icon.is-medium
        i.fa.fa-globe.fa-2x
    a.button.is-white.share-btn(href="https://www.youtube.com/channel/UChEmOo4KF-Vt52E0tAyPK3w" target="_blank")
      span.icon.is-medium
        i.fa.fa-youtube-square.fa-2x
    a.button.is-white.share-btn(href="https://twitter.com/laberlabs" target="_blank")
      span.icon.is-medium
        i.fa.fa-twitter-square.fa-2x

  div
    button.button.is-primary.result-btn(@click="again") Take it again
    button.button.is-primary.result-btn(@click="done") See more quizzes
</template>

<script>
import {mapGetters, mapState} from 'vuex';

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      answers: state => state.currentQuiz.answers,
      scores: state => state.currentQuiz.scores
    }),

    ...mapGetters({
      quiz: 'currentQuiz',
      totalScore: 'totalScore'
    }),

    choices() {
      return this.answers.map((answer, index) => {
        const question = this.quiz.questions[index];

        return question.choices[answer];
      });
    },

    results() {
      return this.choices.map((choice, index) => ({
        score: this.scores[index]
      }));
    }
  },

  methods: {
    again() {
      const quizId = this.$route.params.quizId;

      this.$store.dispatch({
        type: 'startQuiz',
        quizId
      });

      this.$router.replace({
        name: 'quizQuestion',
        params: {
          quizId,
          questionId: 0
        }
      });
    },

    done() {
      this.$router.push('/');
    }
  }
};

</script>

<style lang="scss">
.quiz-result-title {
    font-weight: 900;
}

.question-result-index {
  width: 80%;
}

.question-result-score {
  width: 20%;
}

.share-btn {
  margin-left: 4px;
  width: 24px;
  height: 24px;
}

.quiz-result {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
}

.quiz-result-table {
    margin-left: auto;
    margin-right: auto;
}

.quiz-result-share {
    margin-bottom: 0.5rem;
}

.quiz-result-links {
    margin-bottom: 1.0rem;
}
</style>
