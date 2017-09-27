<template lang="pug">
.section
  h1.title Quizzes
  template(v-for="quiz in quizLinks")
    article.card.quiz-card(@click="startQuiz(quiz.link)")
      figure.card-image.quiz-img-container
        img.quiz-img(v-for="icon in quiz.icons" :src="icon.src" :alt="icon.alt")
      .card-content.quiz-content-container
        .content.quiz-content
          a.quiz-link {{ quiz.name }}
</template>

<script>
import {mapState} from 'vuex';
import {getQuizId} from 'alternative-stats/quizzes';

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      quizzes: state => state.quizzes.list
    }),

    quizLinks() {
      return this.quizzes.map((quiz) => ({
        name: quiz.name,
        publishdate: quiz.publishdate,
        icons: quiz.icons,
        link: {
          name: 'quiz',
          params: {
            quizId: getQuizId(quiz)
          }
        }
      }));
    }
  },

  methods: {
    startQuiz(link) {
      this.$router.push(link);
    }
  }
};
</script>

<style lang="scss">
.quiz-card:hover {
    cursor: pointer;
}

.quiz-card:hover .quiz-link {
    color: #363636;
}

.quiz-img-container {
    padding: 1rem 1rem 0rem 1rem;
}

.quiz-img {
    width: 50%
}

.quiz-content-container {
    padding: 0.5rem;
}

.quiz-content {
    text-align: center;
    font-size: small;
    font-weight: bold;
}

@media screen and (orientation:landscape) {
    .quiz-card {
        width: 33%;
        max-width: 400px;
    }
}

@media screen and (orientation:portrait) {
    .quiz-card {
        width: 100%;
    }
}
</style>
