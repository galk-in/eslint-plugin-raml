'use strict';

var parser = require("raml-parser");

module.exports = {
  preprocess: function (text) {
    return [text];
  },
  postprocess: function (messages, fileName) {
    return parser.loadFile(fileName).then(function () {
      return true;
    }, function (error) {
      return [{
        ruleId: "bad-raml",
        severity: 2,
        message: error.message,
        source: error.context,
        line: error.problem_mark.line,
        column: error.problem_mark.column
      }];
    });
  }
};
