'use strict';

var koa = require('koa');
var assert = require('assert');
var request = require('supertest');
var etagSession = require('../lib');

describe('etagSession()', function () {
  describe('without etag', function () {
    it('it should add etag header', function (cb) {
      var app = koa();
      app.use(etagSession());
      app.use(function *() {
        this.etagSession.set('a', 'b');
        this.etagSession.set('c', 'd');
        this.body = 'success';
      });
      request(app.listen())
        .get('/')
        .expect('etag', '"a=b;c=d"')
        .end(cb);
    });
  });

  describe('with etag', function () {
    it('it should parse etag header', function (cb) {
      var app = koa();
      app.use(etagSession());
      app.use(function *() {
        assert(this.etagSession.get('a') === 'b');
        assert(this.etagSession.get('c') === 'd');
        this.body = 'success';
      });
      request(app.listen())
        .get('/')
        .set('etag', 'a=b;c=d')
        .expect(200)
        .end(cb);
    });
  });
});
