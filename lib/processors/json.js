'use strict';

var fileContents = {};
var jshint = require('jshint');

module.exports = {
  preprocess: function (text, fileName) {
    fileContents[fileName] = text;
    return [text];
  },
  postprocess: function (messages, fileName) {
    // eslint-disable-next-line
    jshint.JSHINT(fileContents[fileName]);
    delete fileContents[fileName];
    var data = jshint.JSHINT.data();
    var errors = (data && data.errors) || [];
    return errors.filter(function (e) {
      return Boolean(e);
    }).map(function (error) {
      return {
        ruleId: 'bad-json',
        severity: 2,
        message: error.reason,
        source: error.evidence,
        line: error.line,
        column: error.character
      };
    });
  }
};
