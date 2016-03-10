var path = require('path');
var csv = require('csv');
var Promise = require('bluebird');

var csvParser = function (data) {
  return new Promise(function (resolve, reject) {
    csv.parse(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

var pathParser = function (string) {
  return path.resolve(__dirname, string);
};

module.exports.csvParser = csvParser;
module.exports.pathParser = pathParser;
