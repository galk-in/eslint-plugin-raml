"use strict";

module.exports.processors = {
  ".json": require('./processors/json'),
  ".raml": require('./processors/raml')
};

module.exports.rules = {
  'check-examples': require('./rules/check-examples')
};
