'use strict';

var parser = require('raml-parser');
var parsingErrors = {};

module.exports = {
  preprocess: function (text, fileName) {
    var raml;
    parser.loadFile(fileName).then(function (data) {
      raml = [data];
      parsingErrors[fileName] = null;
    }, function (error) {
      raml = [];
      parsingErrors[fileName] = error;
    });
    // eslint-disable-next-line
    while (raml === undefined) {
      require('deasync').sleep(10);
    }
    return raml;
  },
  postprocess: function (messages, fileName) {
    if (parsingErrors[fileName]) {
      var error = parsingErrors[fileName];
      delete parsingErrors[fileName];
      return [{
        ruleId: "bad-raml",
        severity: 2,
        message: error.message,
        source: error.context,
        line: error.problem_mark.line,
        column: error.problem_mark.column
      }];
    }
    return [];
  }
};
