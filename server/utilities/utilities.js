var path = require('path');
var promisify = require("promisify-node");
var fs = promisify("fs");
var Promise = require('bluebird');
var csv = require('csv');

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

var readFile = function (string) {
  return fs.readFile(path.resolve(__dirname, string));
};

module.exports.csvParser = csvParser;
module.exports.readFile = readFile;
