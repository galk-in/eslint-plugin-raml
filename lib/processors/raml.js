'use strict';

var parser = require('raml-1-parser');

module.exports = {
  preprocess: function (text) {
    return [text];
  },
  postprocess: function (messages, fileName) {
    var errors = [];
    var api = parser.loadApiSync(fileName);

    api.errors().forEach(function (error) {
      errors.push({
        ruleId: 'bad-raml',
        severity: error.isWarning ? 2 : 1,
        message: error.message,
        source: error.path,
        line: error.line + 1,
        column: error.column + 1
      });
    });

    return errors;
  }
};
