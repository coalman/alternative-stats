<template>
  <b-modal :active="visible" @close="next">
    <div class="card">
      <div class="card-content">
        <p class="title is-4">{{ titleText }}</p>
        <div class="content">{{ responseText }}</div>
        <button class="button" type="button" @click="next">Next</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import {quizLookup} from '../quizes';
import {mapState, mapGetters} from 'vuex';

export default {
  props: {
    visible: {
      type: Boolean
    }
  },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      answers: state => state.quiz.answers
    }),

    ...mapGetters('quiz', {
      choice: 'currentChoice'
    }),


    titleText() {
      if (this.choice === null) { return ''; }

      if (this.choice.correct) {
        return 'Good Job!';
      } else {
        return 'Oh no!';
      }
    },

    responseText() {
      if (this.choice === null) { return ''; }

      return this.choice.response;
    }
  },

  methods: {
    next() {
      this.$emit('next');
    }
  }
};

</script>

<style lang="scss"></style>
