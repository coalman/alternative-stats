import currentQuiz from './current-quiz';
import quizzes from './quizzes';

export default function createStoreOpts() {
  return {
    modules: {
      currentQuiz,
      quizzes
    }
  };
};
