'use strict';

var parser = require('raml-parser');
var parsingErrors = {};
var parsingResults = {};
var fileContents = {};
var errors = {};

module.exports = {
  preprocess: function (text, fileName) {
    fileContents[fileName] = text;
    return [text];
  },
  postprocess: function (messages, fileName) {
    errors[fileName] = [];

    parseRaml(fileName);
    checkParsingErrors(fileName);

    delete parsingErrors[fileName];
    delete parsingResults[fileName];
    delete fileContents[fileName];

    return errors[fileName];
  }
};

function parseRaml(fileName) {
  var parsed = false;
  parser.loadFile(fileName).then(function (data) {
    parsed = true;
    parsingResults[fileName] = data;
  }).catch(function (error) {
    parsed = true;
    parsingErrors[fileName] = error;
  });
  // eslint-disable-next-line
  while (!parsed) {
    require('deasync').sleep(10);
  }
}

function checkParsingErrors(fileName) {
  if (parsingErrors[fileName]) {
    var error = parsingErrors[fileName];
    errors[fileName].push({
      ruleId: "bad-raml",
      severity: 2,
      message: error.message,
      source: error.context,
      line: error.problem_mark.line + 1,
      column: error.problem_mark.column + 1
    });
  }
}
