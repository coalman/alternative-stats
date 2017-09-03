<template>
  <section class="container">
    <div class="section">
      <h2 class="subtitle is-3">{{ questionText }}</h2>

      <div class="question-choice-container">
        <div class="question-choice" v-for="(choice, cIndex) in questionChoices">
          <img class="question-choice-img" :src="choice.image" :alt="choice.alt" @click="onChoiceClick(cIndex)"></img>
        </div>
      </div>
    </div>
    <question-result-modal :visible="showResult" @next="nextQuestion"></question-result-modal>
  </section>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

import QuestionResultModal from './question-result-modal.vue';

export default {
  components: {
    QuestionResultModal
  },

  data() {
    return {
      showResult: false
    };
  },

  computed: {
    ...mapState({
      quizLookup: state => state.quiz.lookup
    }),

    ...mapGetters('quiz', {
      quiz: 'currentQuiz',
      questionId: 'currentQuestionId',
      question: 'currentQuestion'
    }),

    questionText() {
      if (!this.question) { return null; }

      return this.question.question;
    },

    questionChoices() {
      if (!this.question) { return null; }

      return this.question.choices;
    }
  },

  methods: {
    onChoiceClick(index) {
      this.$store.commit({
        type: 'quiz/addAnswer',
        answer: index
      });

      this.showResult = true;
    },

    nextQuestion() {
      this.showResult = false;

      const nextQuestionId = this.questionId + 1;
      if (nextQuestionId >= this.quiz.questions.length) {
        this.$router.push({
          name: 'quizResult',
          params: {
            quizId: this.$route.params.quizId
          }
        });
      } else {
        this.$router.replace({
          name: 'question',
          params: {
            quizId: this.$route.params.quizId,
            questionId: this.questionId + 1
          }
        });
      }
    }
  }
};

</script>

<style lang="scss">
.question-choice-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 200px;
}

.question-choice {
  min-width: 300px;
}

.question-choice-img {
  width: 100%;
}

.question-choice-img:hover {
  cursor: pointer;
}
</style>
