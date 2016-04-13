"use strict";

var requireIndex = require('requireindex');
var path = require('path');

module.exports.rules = requireIndex(path.resolve(__dirname, 'rules'));

module.exports.processors = {
  ".json": require('./processors/json')
};
