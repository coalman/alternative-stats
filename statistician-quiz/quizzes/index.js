import slugify from 'slugify';

import ExampleQuiz from './example.yaml';

const quizList = [
  ExampleQuiz
];

export function getQuizId(quiz) {
  return slugify(quiz.name, {lower: true});
};

export const quizLookup = quizList.reduce((lookup, quiz) => {
  lookup[getQuizId(quiz)] = quiz;
  return lookup;
}, {});

export default quizList;
