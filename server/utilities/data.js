var util = require('./utilities.js');

module.exports = function () {
  var testers = [];
  var devices = [];
  var countries = {};

  return util.readFile('../data/testers.csv')
  .then(function (data) {
    return util.csvParser(data);
  })
  .then(function (data) {
    var country;
    for (var i = 1; i < data.length; i++) {
      country = data[i][3];
      if (!countries[country]) {
        countries[country] = true;
      }
      testers[i - 1] = {
        id: data[i][0],
        name: data[i][1] + ' ' + data[i][2],
        country: country,
        devices: {}
      };
    }
  })
  .then(function () {
    return util.readFile('../data/devices.csv');
  })
  .then(function (data) {
    return util.csvParser(data);
  })
  .then(function (data) {
    for (var i = 1; i < data.length; i++) {
      devices[i - 1] = data[i][1];
    }
  })
  .then(function () {
    return util.readFile('../data/tester_device.csv');
  })
  .then(function (data) {
    return util.csvParser(data);
  })
  .then(function (data) {
    for (var i = 1; i < data.length; i++) {
      var tester = data[i][0] - 1;
      var deviceName = devices[data[i][1] - 1];
      testers[tester].devices[deviceName] = 0;
    }
  })
  .then(function () {
    return util.readFile('../data/bugs.csv');
  })
  .then(function (data) {
    return util.csvParser(data);
  })
  .then(function (data) {
    for (var i = 1; i < data.length; i++) {
      var tester = data[i][2] - 1;
      var deviceName = devices[data[i][1] - 1];
      testers[tester].devices[deviceName]++;
    }
    return {testers: testers, countries: countries, devices: devices};
  })
  .catch(function (err) {
    console.error('ERR in parsing data', err);
  });
};
