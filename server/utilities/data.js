var path = require('path');
var promisify = require("promisify-node");
var fs = promisify("fs");
var csvParser = require('./csvParser.js');

var output = [];
var devices = [];

fs.readFile(path.resolve(__dirname, '../data/testers.csv'))
.then(function (data) {
  return csvParser(data);
})
.then(function (data) {
  for (var i = 1; i < data.length; i++) {
    output[i - 1] = {
      id: data[i][0],
      name: data[i][1] + ' ' + data[i][2],
      country: data[i][3],
      devices: {}
    };
  }
  return;
})
.then(function () {
  return fs.readFile(path.resolve(__dirname, '../data/devices.csv'));
})
.then(function (data) {
  return csvParser(data);
})
.then(function (data) {
  for (var i = 1; i < data.length; i++) {
    devices[i - 1] = data[i][1];
  }
  return;
})
.then(function () {
  return fs.readFile(path.resolve(__dirname, '../data/tester_device.csv'));
})
.then(function (data) {
  return csvParser(data);
})
.then(function (data) {
  for (var i = 1; i < data.length; i++) {
    var tester = data[i][0] - 1;
    var deviceName = devices[data[i][1] - 1];
    output[tester].devices[deviceName] = 0;
  }
  console.log(output);
})
.catch(function (err) {
  console.error('ERR in parsing data', err);
});

module.exports = output;
