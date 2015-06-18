'use strict';

var proto = ETagSession.prototype;

module.exports = ETagSession;

function ETagSession(request, response) {
  if (!(this instanceof ETagSession)) {
    return new ETagSession(request, response);
  }
  this.data = parse(request.get('if-none-match') || '');
  this.request = request;
  this.response = response;
}

proto.get = function (key) {
  return this.data[key];
};

proto.set = function (key, val) {
  this.data[key] = val;
  this.response.etag = stringify(this.data);
};

function parse(str) {
  var parsed = {};
  str.split(';').forEach(function (keyval) {
    keyval = keyval.split('=').map(decodeURIComponent);
    if (keyval.length === 2) {
      parsed[keyval[0]] = keyval[1];
    }
  });
  return parsed;
}

function stringify(data) {
  return Object.keys(data)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    })
    .join(';');
}
