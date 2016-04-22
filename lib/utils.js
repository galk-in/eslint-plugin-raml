'use strict';

module.exports = {
  getValues: getValues
};

function getValues(obj, key, list) {
  if (!obj) {
    return list;
  }
  if (obj instanceof Object) {
    if (obj[key]) {
      list.push(obj[key]);
    }
  }
  if (obj instanceof Array || obj instanceof Object) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        list = list.concat(getValues(obj[i], key, []));
      }
    }
    return list;
  }

  return list;
}
