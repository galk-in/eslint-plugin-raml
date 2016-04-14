"use strict";

module.exports.processors = {
  ".json": require('./processors/json'),
  ".raml": require('./processors/raml')
};
