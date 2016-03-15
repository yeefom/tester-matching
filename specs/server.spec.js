describe('Tester Matching server', function () {
  var request = require('supertest');
  var expect = require('chai').expect;

  describe('utilities', function () {
    var util = require('../server/utilities/utilities.js');
    var data = require('../server/utilities/data.js');

    it('should have helper to read file', function () {
      expect(util.readFile).to.exist;
    });

    it('should have helper to parse csv file', function () {
      expect(util.csvParser).to.exist;
    });
  });

  describe('API', function () {
    var app = require('../server/server.js');

    it('should send data for a GET request', function (done) {
      request(app)
      .get('/api/data')
      .expect(200, done);
    });
  });
});
