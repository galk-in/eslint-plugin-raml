'use strict';

module.exports = function (context) {
  console.log(context);
  return {
    CallExpression: function (node) {
      console.log(node);
    }
  };
};
