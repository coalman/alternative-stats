<template lang="pug">
router-view
</template>

<script>
export default {
  props: {
    quizId: String
  },

  data() {
    return {};
  },

  created() {
    this.$store.dispatch({
      type: 'startQuiz',
      quizId: this.quizId
    });

    this.$router.replace({
      name: 'quizQuestion',
      params: {
        quizId: this.quizId,
        questionId: 0
      }
    });
  }
};
</script>

<style lang="scss"></style>
