'use strict';

var fileContents = {};

module.exports = {
  preprocess: function (text, fileName) {
    fileContents[fileName] = text;
    return [text];
  },
  postprocess: function (messages, fileName) {

  }
};
