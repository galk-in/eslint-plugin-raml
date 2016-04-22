'use strict';

var plugin = require('../../../lib/index.js');
var assert = require('chai').assert;
var path = require('path');
var fs = require('fs');

describe('raml', function () {
  describe('preprocess', function () {
    var preprocess = plugin.processors['.raml'].preprocess;
    it('should return RAML', function () {
      var fileName = makeRAMLFilePath('valid.raml');
      var text = fs.readFileSync(fileName);
      var result = preprocess(text, fileName);

      assert.isArray(result, 'preprocess should return array');
      assert.strictEqual(result[0].title, 'Test');
      assert.strictEqual(result[0].resources[0].relativeUri, '/customers');
    });
  });
  describe('postprocess', function () {
    var postprocess = plugin.processors['.raml'].postprocess;
    var preprocess = plugin.processors['.raml'].preprocess;

    it('should return no errors for valid.raml', function () {
      var fileName = makeRAMLFilePath('valid.raml');
      var text = fs.readFileSync(fileName);
      preprocess(text, fileName);
      var results = postprocess([], fileName);

      assert.isArray(results, 'should return an array');
      assert.lengthOf(results, 0, 'valid.raml shouldnt have any errors');
    });

    it('should return an error for the missing include', function () {
      var fileName = makeRAMLFilePath('missingInclude.raml');
      var text = fs.readFileSync(fileName);
      preprocess(text, fileName);
      var results = postprocess([], fileName);

      assert.isArray(results, 'should return an array');
      assert.lengthOf(results, 1, 'should return one error');
      var error = results[0];
      assert.strictEqual(error.line, 12, 'should point to twelve line');
      assert.strictEqual(error.column, 22, 'should point to 21 character');
    });

    it('should return an error for the authorizationUri Twice', function () {
      var fileName = makeRAMLFilePath('samePropertyTwice.raml');
      var text = fs.readFileSync(fileName);
      preprocess(text, fileName);
      var results = postprocess([], fileName);

      assert.isArray(results, 'should return an array');
      assert.lengthOf(results, 1, 'should return one error');
      var error = results[0];
      assert.strictEqual(error.line, 12, 'should point to twelve line');
      assert.strictEqual(error.column, 8, 'should point to seven character');
    });
  });
});

function makeRAMLFilePath(fileName) {
  return path.join(__dirname, '..', 'asserts', fileName);
}
