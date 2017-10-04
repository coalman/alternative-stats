import slugify from 'slugify';
import {iterToLookup} from 'alternative-stats/utils';

const quizRequire = require.context('./', false, /\.yaml$/);
const quizList = quizRequire.keys()
      .map((quizFile) => quizRequire(quizFile))
      .sort((a, b) => (new Date(b.publishdate) - new Date(a.publishdate)));

export function getQuizId(quiz) {
  return slugify(quiz.name, {lower: true});
};

export const quizLookup = iterToLookup(quizList, getQuizId);

export default quizList;
