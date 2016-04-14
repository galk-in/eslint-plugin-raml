var plugin = require('../../../lib/index.js');
var assert = require('chai').assert;
var path = require('path');

describe('raml', function () {
  describe('preprocess', function () {
    var preprocess = plugin.processors['.raml'].preprocess;
    it('should return the same text', function () {
      var fileName = 'reallyLongFileName';
      var text = 'long long text';
      var newText = preprocess(text, fileName);

      assert.isArray(newText, 'preprocess should return array');
      assert.strictEqual(newText[0], text);
    });
  });
  describe('postprocess', function () {
    var postprocess = plugin.processors['.raml'].postprocess;

    it('should return no errors for valid.raml', function () {
      postprocess([], path.join(__dirname, '..', 'asserts', 'valid.raml')).then(function (results) {
        assert.isArray(results, 'should return an array');
        assert.lengthOf(results, 0, 'valid.raml shouldnt have any errors');
      });
    });

    it('should return an error for the authorizationUri Twice', function () {
      postprocess([], path.join(__dirname, '..', 'asserts', 'samePropertyTwice.raml')).then(function (results) {
        assert.isArray(results, 'should return an array');
        assert.lengthOf(results, 1, 'should return one error');
        var error = results[0];
        assert.strictEqual(error.line, 11, 'should point to eleven line');
        assert.strictEqual(error.column, 7, 'should point to seven character');
      });
    });

    it('should return an error for the missing include', function () {
      postprocess([], path.join(__dirname, '..', 'asserts', 'missingInclude.raml')).then(function (results) {
        assert.isArray(results, 'should return an array');
        assert.lengthOf(results, 1, 'should return one error');
        var error = results[0];
        assert.strictEqual(error.line, 11, 'should point to eleven line');
        assert.strictEqual(error.column, 21, 'should point to 21 character');
      });
    });
  });
});
