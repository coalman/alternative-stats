<template lang="pug">
.section
  h1.title Quizzes
  template(v-for="quiz in quizLinks")
    article.media
      .media-content
        .content
          router-link(:to="quiz.link") {{ quiz.name }}
          p {{ quiz.publishdate }}
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
        link: {
          name: 'quiz',
          params: {
            quizId: getQuizId(quiz)
          }
        }
      }));
    }
  },
};

</script>

<style lang="scss"></style>
