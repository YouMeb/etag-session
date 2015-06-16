'use strict';

var ETagSession = require('./etag-session');

module.exports = function () {
  return function *etagSession(next) {
    this.etagSession = ETagSession(this.request, this.response);
    yield* next;
  };
};
