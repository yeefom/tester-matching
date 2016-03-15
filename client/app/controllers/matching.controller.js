(function() {
    'use strict';

    angular
      .module('testermatching')
      .controller('matchingCtrl', matchingCtrl);

    matchingCtrl.$inject = ['$scope', 'dataService', 'matchService'];

    function matchingCtrl($scope, dataService, matchService) {
      var testers;
      var criteria = {
        country: {},
        countrySize: 0,
        device: {},
        deviceSize: 0
      };
      var countriesLength;
      var devicesLength;

      $scope.countries = {};
      $scope.devices = {};
      $scope.testersMatched = [];

      $scope.countryAll = {selected: false};
      $scope.deviceAll = {selected: false};

      $scope.select = function (type, item, selected) {      
        if (type === 'country') {
          if ($scope.countryAll.selected) {
            $scope.countryAll.selected = false;
          }
          if (selected) {
            criteria.country[item] = true;
            criteria.countrySize++;
            if (criteria.countrySize === countriesLength) {
              $scope.countryAll.selected = true;
            }
          } else {
            delete criteria.country[item];
            criteria.countrySize--;
          }
        } else {
          if ($scope.deviceAll.selected) {
            $scope.deviceAll.selected = false;
          }
          if (selected) {
            criteria.device[item] = true;
            criteria.deviceSize++;
            if (criteria.deviceSize === devicesLength) {
              $scope.deviceAll.selected = true;
            }
          } else {
            delete criteria.device[item];
            criteria.deviceSize--;
          }
        }
        $scope.testersMatched = matchService.findMatches(testers, criteria);
      };

      $scope.selectAll = function (type, selected) {
        if (selected) {
          if (type === 'country') {
            criteria.countrySize = 0;
            for (var prop in $scope.countries.data) {
              $scope.countries.data[prop] = true;
              criteria.country[prop] = true;
              criteria.countrySize++;
            }
          } else {
            criteria.deviceSize = 0;
            for (var prop in $scope.devices.data) {
              $scope.devices.data[prop] = true;
              criteria.device[prop] = true;
              criteria.deviceSize++;
            }
          }
        } else {
          if (type === 'country') {
            criteria.countrySize = 0;
            for (var prop in $scope.countries.data) {
              $scope.countries.data[prop] = false;
              delete criteria.country[prop];
            }
          } else {
            criteria.deviceSize = 0;
            for (var prop in $scope.devices.data) {
              $scope.devices.data[prop] = false;
              delete criteria.device[prop];
            }
          }
        }
        $scope.testersMatched = matchService.findMatches(testers, criteria);
      };

      var getData = function () {
        dataService.getData()
        .then(function (data) {
          testers = data.testers;
          $scope.countries.data = data.countries;
          countriesLength = Object.keys($scope.countries.data).length;
          $scope.devices.data = data.devices;
          devicesLength = Object.keys($scope.devices.data).length;
          $scope.testersMatched = matchService.findMatches(testers, criteria);
        });
      };

      getData();
    }
})();
