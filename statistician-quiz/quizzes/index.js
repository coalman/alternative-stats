import slugify from 'slugify';

const quizRequire = require.context('./', false, /\.yaml$/);
const quizList = quizRequire.keys().map((quizFile) => quizRequire(quizFile));

export function getQuizId(quiz) {
  return slugify(quiz.name, {lower: true});
};

export const quizLookup = quizList.reduce((lookup, quiz) => {
  lookup[getQuizId(quiz)] = quiz;
  return lookup;
}, {});

export default quizList;
