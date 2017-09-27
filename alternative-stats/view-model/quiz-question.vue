<template lang="pug">
.section
  h2.subtitle.is-3 {{ questionText }}

  .question-choice-container
    .question-choice(v-for="(choice, index) in questionChoices")
      img.question-choice-img(:src="choice.image" :alt="choice.alt" @click="onChoiceClick(index)")
      p.question-choice-text {{ choice.alt }}

  p.subtitle {{ progressText }}

  b-modal(:active="showResponse" @close="nextQuestion")
    .card
      .card-content
        p.title.is-4 {{ answerTitle }}
        .content {{ answerResponse }}
        button.button(type="button" @click="nextQuestion") Next
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  props: ['questionId'],

  data() {
    return {
      showResponse: false
    };
  },

  computed: {
    ...mapGetters({
      quiz: 'currentQuiz',
      question: 'currentQuestion',
      answer: 'currentAnswer',
      score: 'currentScore',
      lastQuestion: 'lastQuestion'
    }),

    progressText() {
      const qId = Number(this.questionId) + 1;
      const total = this.quiz.questions.length;

      return `Progress: ${qId} / ${total}`;
    },

    questionText() {
      if (this.question) {
        const qText = this.question.question;
        const qId = Number(this.questionId) + 1;

        return `${qId}) ${qText}`;
      }

      return null;
    },

    questionChoices() {
      if (this.question) {
        return this.question.choices;
      }

      return null;
    },

    answerTitle() {
      if (!this.answer) {
        return null;
      }

      if (this.answer.correct) {
        return 'Correct!';
      } else {
        return 'Wrong!';
      }
    },

    answerResponse() {
      if (!this.answer) {
        return null;
      }

      return this.answer.response;
    }
  },

  methods: {
    onChoiceClick(index) {
      this.showResponse = true;

      this.$store.dispatch({
        type: 'answerQuestion',
        answer: index
      });
    },

    nextQuestion() {
      this.showResponse = false;

      this.$nextTick(() => {
        if (this.lastQuestion) {
          this.$router.replace({
            name: 'quizResult',
            params: {
              quizId: this.$route.params.quizId
            }
          });
        } else {
          this.$router.replace({
            name: 'quizQuestion',
            params: {
              quizId: this.$route.params.quizId,
              questionId: Number(this.questionId) + 1
            }
          });

          this.$store.dispatch('nextQuestion');
        }
      });
    }
  }
};
</script>

<style lang="scss">
.question-choice-img:hover {
    cursor: pointer;
}

.question-choice-text {
    text-align: center;
}

.question-choice-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 200px;
}

.question-choice {
    width: 50%;
    max-width: 300px;
    height: 100%;
}

.question-choice-img {
    width: 100%;
}

.result-btn {
    width: 35%;
    min-width: 200px;
    max-width: 400px;
    margin: 0.5rem 0.5rem 0rem 0.5rem;
}
</style>
