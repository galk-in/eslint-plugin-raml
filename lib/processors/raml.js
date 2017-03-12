'use strict'

var parser = require('raml-1-parser')

module.exports = {
  preprocess: function (text) {
    return [text]
  },
  postprocess: function (messages, fileName) {
    var errors = []
    var api = parser.loadApiSync(fileName)
    // console.log(api.schemas().forEach((schema) => console.log(schema.key())))
    // console.log(api.schemas().forEach((schema) => console.log(schema.value())))
    console.log(api.errors())
    process.exit()
    api.errors().forEach(function (error) {
      errors.push({
        ruleId: 'bad-raml',
        severity: error.isWarning ? 1 : 2,
        message: error.message,
        source: error.path,
        line: error.range.start.line + 1,
        column: error.range.start.column + 1
      })
    })

    return errors
  }
}
