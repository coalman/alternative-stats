<template>
  <section class="container">
    <div class="section">
      <h1 class="title">Quizes</h1>
      <article class="media" v-for="quiz in quizes">
        <div class="media-content">
          <div class="content">
            <router-link :to="quizPath(quiz)">{{ quiz.name }}</router-link>
            <p>{{ quiz.description }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import quizes, {getQuizId} from '../quizzes';

export default {
  data() {
    return {
      quizes
    };
  },

  methods: {
    quizPath(quiz) {
      return {
        name: 'question',
        params: {
          quizId: getQuizId(quiz),
          questionId: 0
        }
      };
    }
  }
};

</script>

<style lang="scss"></style>
