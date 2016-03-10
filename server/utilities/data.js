var promisify = require("promisify-node");
var fs = promisify("fs");
var parser = require('./parser.js');

var output = [];
var devices = [];

fs.readFile(parser.pathParser('../data/testers.csv'))
.then(function (data) {
  return parser.csvParser(data);
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
})
.then(function () {
  return fs.readFile(parser.pathParser('../data/devices.csv'));
})
.then(function (data) {
  return parser.csvParser(data);
})
.then(function (data) {
  for (var i = 1; i < data.length; i++) {
    devices[i - 1] = data[i][1];
  }
})
.then(function () {
  return fs.readFile(parser.pathParser('../data/tester_device.csv'));
})
.then(function (data) {
  return parser.csvParser(data);
})
.then(function (data) {
  for (var i = 1; i < data.length; i++) {
    var tester = data[i][0] - 1;
    var deviceName = devices[data[i][1] - 1];
    output[tester].devices[deviceName] = 0;
  }
})
.then(function () {
  console.log(output);
  // read bug file
})
.catch(function (err) {
  console.error('ERR in parsing data', err);
});

module.exports = output;
