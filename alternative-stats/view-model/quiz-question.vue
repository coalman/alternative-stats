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
        p.title.is-4(:style="answerStyle") {{ answerTitle }}
        .content
          p(v-for="response in answerResponses") {{ response }}
        .response-btn-container
          button.button.is-primary.response-btn(type="button" @click="nextQuestion") Next
          button.button.response-other-btn.response-btn(type="button" @click="showOtherResponse = !showOtherResponse") {{ showOtherResponse ? "Hide Other Response" : "Show Other Response" }}
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  props: ['questionId'],

  data() {
    return {
      showResponse: false,
      showOtherResponse: false
    };
  },

  computed: {
    ...mapGetters({
      quiz: 'currentQuiz',
      question: 'currentQuestion',
      answer: 'currentAnswer',
      otherAnswers: 'otherAnswers',
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

    answerStyle() {
      if (!this.answer) {
        return {};
      }

      let style = { 'font-weight': '900' };

      if (this.answer.correct) {
        style.color = '#008416';
      } else {
        style.color = '#AF0000';
      }

      return style;
    },

    answerResponses() {
      if (!this.answer) {
        return null;
      }

      let responses = [];
      responses.push(this.answer.response);
      if (this.showOtherResponse) {
        let others = this.otherAnswers.map((ans) => ans.response);
        return responses.concat(others);
      } else {
        return responses;
      }
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
      this.showOtherResponse = false;

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

.response-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.response-btn {
    width: 30%;
    margin: 0rem 0.5rem 0rem 0.5rem;
}

.response-other-btn {
    color: #c7b299;
    border-color: #c7b299;
}

.response-other-btn:focus {
    color: #c7b299;
    border-color: #c7b299;
}

.response-other-btn:hover {
    color: #c7b299;
    border-color: #c7b299;
}
</style>
