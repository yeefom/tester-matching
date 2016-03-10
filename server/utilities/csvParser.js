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

module.exports = csvParser;
