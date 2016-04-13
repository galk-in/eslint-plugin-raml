"use strict";

var plugin = require('../../lib/index.js');
var assert = require('chai').assert;

describe('plugin', function () {
  it('should contain processors object', function () {
    assert.property(plugin, 'processors', '.processors property is not defined');
  });
  it('should contain .preprocess property for each processor', function () {
    Object.keys(plugin.processors).forEach(function (name) {
      assert.property(plugin.processors[name], 'preprocess', name + '.preprocess is not defined');
    });
  });
  it('should contain .postprocess property for each processor', function () {
    Object.keys(plugin.processors).forEach(function (name) {
      assert.property(plugin.processors[name], 'postprocess', name + '.postprocess is not defined');
    });
  });
});
