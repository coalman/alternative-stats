import chai from 'chai';

// expose globals for conveniance
window.chai = chai;
window.asset = chai.assert;

// NOTE: require.context is from webpack: https://webpack.js.org/guides/dependency-management/#require-context
const testRequire = require.context('./', true, /\.test\.js$/);
testRequire.keys().forEach(testRequire);
