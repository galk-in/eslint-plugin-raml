'use strict'

var plugin = require('../../../lib/index.js')
var assert = require('chai').assert
var path = require('path')
var fs = require('fs')

describe('raml', function () {
  describe('preprocess', function () {
    var preprocess = plugin.processors['.raml'].preprocess
    it('should return the same text', function () {
      var fileName = 'reallyLongFileName'
      var text = 'long long text'

      var newText = preprocess(text, fileName)
      assert.isArray(newText, 'preprocess should return array')
      assert.strictEqual(newText[0], text)
    })
  })
  describe('postprocess', function () {
    var postprocess = plugin.processors['.raml'].postprocess
    var preprocess = plugin.processors['.raml'].preprocess
    describe('raml parsing', function () {
      it('should return no errors for valid.raml', function () {
        var fileName = makeRAMLFilePath('valid.raml')
        var text = fs.readFileSync(fileName)
        preprocess(text, fileName)
        var results = postprocess([], fileName)

        assert.isArray(results, 'should return an array')
        assert.lengthOf(results, 0, 'valid.raml shouldnt have any errors')
      })

      it('should return an error for the missing include', function () {
        var fileName = makeRAMLFilePath('missingInclude.raml')
        var text = fs.readFileSync(fileName)
        preprocess(text, fileName)
        var results = postprocess([], fileName)
        assert.isArray(results, 'should return an array')
        assert.lengthOf(results, 2, 'should return 2 errors')
        assert.strictEqual(results[0].ruleId, 'bad-raml')
        assert.strictEqual(results[0].line, 12, 'should point to 12 line')
        assert.strictEqual(results[0].column, 13, 'should point to 22 character')
        assert.strictEqual(results[1].ruleId, 'bad-raml')
        assert.strictEqual(results[1].line, 12, 'should point to 12 line')
        assert.strictEqual(results[1].column, 13, 'should point to 22 character')
      })

      it('should return an error for the authorizationUri Twice', function () {
        var fileName = makeRAMLFilePath('samePropertyTwice.raml')
        var text = fs.readFileSync(fileName)
        preprocess(text, fileName)
        var results = postprocess([], fileName)

        assert.isArray(results, 'should return an array')
        assert.lengthOf(results, 2, 'should return 2 errors')
        assert.strictEqual(results[0].ruleId, 'bad-raml')
        assert.strictEqual(results[0].line, 9, 'should point to 9 line')
        assert.strictEqual(results[0].column, 8, 'should point to 8 character')
        assert.strictEqual(results[1].ruleId, 'bad-raml')
        assert.strictEqual(results[1].line, 12, 'should point to 12 line')
        assert.strictEqual(results[1].column, 8, 'should point to 8 character')
      })
    })

    describe('examples and schemas checking', function () {
      it('should return an error for example with mistake', function () {
        var fileName = makeRAMLFilePath('exampleWithError.raml')
        var text = fs.readFileSync(fileName)
        preprocess(text, fileName)
        var results = postprocess([], fileName)
        assert.isArray(results, 'should return an array')
        assert.lengthOf(results, 1, 'should return one error')
        var error = results[0]
        assert.strictEqual(error.ruleId, 'bad-raml')
        assert.strictEqual(error.line, 13, 'should point to 13 line')
      })

      it('should return an error for schema with error', function () {
        var fileName = makeRAMLFilePath('schemaWithError.raml')
        var text = fs.readFileSync(fileName)
        preprocess(text, fileName)
        var results = postprocess([], fileName)
        assert.isArray(results, 'should return an array')
        assert.lengthOf(results, 2, 'should return one error')
        assert.strictEqual(results[0].ruleId, 'bad-raml')
        assert.strictEqual(results[0].line, 12, 'should point to 12 line')
        assert.strictEqual(results[1].ruleId, 'bad-raml')
        assert.strictEqual(results[1].line, 12, 'should point to 12 line')
      })

      it('should return an errors for not valid example', function () {
        var fileName = makeRAMLFilePath('notValidExample.raml')
        var text = fs.readFileSync(fileName)
        preprocess(text, fileName)
        var results = postprocess([], fileName)
        assert.isArray(results, 'should return an array')
        assert.lengthOf(results, 1, 'should return one error')
        var error = results[0]
        assert.strictEqual(error.ruleId, 'bad-raml')
        assert.strictEqual(error.line, 13, 'should point to 13 line')
      })
    })
  })
})

function makeRAMLFilePath (fileName) {
  return path.join(__dirname, '..', 'asserts', fileName)
}
