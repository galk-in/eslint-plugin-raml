'use strict';

var parser = require('raml-parser');
var tv4 = require('tv4');
var utils = require('../utils');
var parsingErrors = {};
var parsingResults = {};
var fileContents = {};
var errors = {};

module.exports = {
  preprocess: function (text, fileName) {
    fileContents[fileName] = text.toString();
    return [text];
  },
  postprocess: function (messages, fileName) {
    errors[fileName] = [];

    parseRaml(fileName);
    checkParsingErrors(fileName);
    checkExampleWithSchemas(fileName);

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
      ruleId: 'bad-raml',
      severity: 2,
      message: error.message,
      source: error.context,
      line: error.problem_mark.line + 1,
      column: error.problem_mark.column + 1
    });
  }
}

function checkExampleWithSchemas(fileName) {
  var type = 'application/json';
  var bodyLines = [];
  var bodyList = utils.getValues(parsingResults[fileName], 'body', []);

  fileContents[fileName].split('\n').forEach(function (line, index) {
    if (line.indexOf('body:') > -1) {
      bodyLines.push(index + 1);
    }
  });

  bodyList.forEach(function (item, index) {
    var example = item[type].example;
    var schema = item[type].schema;
    if (example && schema) {
      var result = tv4.validateResult(JSON.parse(example), JSON.parse(schema));
      if (!result.valid) {
        errors[fileName].push({
          ruleId: 'example-not-correspond-schema',
          severity: 2,
          message: 'Error in example. ' + result.error.message,
          source: fileName,
          line: bodyLines[index]
        });
      }
    }
  });
}
