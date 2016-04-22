'use strict';

var plugin = require('../../../lib/index.js');
var assert = require('chai').assert;
var path = require('path');
var fs = require('fs');

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
    var preprocess = plugin.processors['.raml'].preprocess;
    describe('raml parsing', function () {
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
        assert.strictEqual(error.ruleId, 'bad-raml');
        assert.strictEqual(error.line, 12, 'should point to 12 line');
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
        assert.strictEqual(error.ruleId, 'bad-raml');
        assert.strictEqual(error.line, 12, 'should point to 12 line');
        assert.strictEqual(error.column, 8, 'should point to 8 character');
      });
    });
    describe('checking schemas', function () {
      it('should return no errors for valid schemas', function () {
        var fileName = makeRAMLFilePath('valid.raml');
        var text = fs.readFileSync(fileName);
        preprocess(text, fileName);
        var results = postprocess([], fileName);

        assert.isArray(results, 'should return an array');
        assert.lengthOf(results, 0, 'valid.raml shouldnt have any errors');
      });

      it('should return an errors for example not valid with schema', function () {
        var fileName = makeRAMLFilePath('invalidExample.raml');
        var text = fs.readFileSync(fileName);
        preprocess(text, fileName);
        var results = postprocess([], fileName);

        assert.isArray(results, 'should return an array');
        assert.lengthOf(results, 1, 'should return one error');
        var error = results[0];
        assert.strictEqual(error.ruleId, 'example-not-correspond-schema');
        assert.strictEqual(error.line, 10, 'should point to 10 line');
      });
    });
  });
});

function makeRAMLFilePath(fileName) {
  return path.join(__dirname, '..', 'asserts', fileName);
}
