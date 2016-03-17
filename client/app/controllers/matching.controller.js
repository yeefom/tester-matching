(function() {
    'use strict';

    angular
      .module('testermatching')
      .controller('matchingCtrl', matchingCtrl);

    matchingCtrl.$inject = ['$scope', 'dataService', 'matchService'];

    function matchingCtrl($scope, dataService, matchService) {
      // data used only in the controller
      var testers;
      var criteria = {
        country: {},
        countrySize: 0,
        countryMaxSize: 0,
        device: {},
        deviceSize: 0,
        deviceMaxSize: 0
      };

      // models
      $scope.testersMatched = [];
      $scope.country = {};
      $scope.device = {};
      $scope.countryAll = {selected: false};
      $scope.deviceAll = {selected: false};

      var selectOne = function (type) {
        var typeAll = $scope[type + 'All'];
        return function (item, selected) {
          if (typeAll.selected) {
            typeAll.selected = false;
          }
          if (selected) {
            criteria[type][item] = true;
            criteria[type + 'Size']++;
            if (criteria[type + 'Size'] === criteria[type + 'MaxSize']) {
              typeAll.selected = true;
            }
          } else {
            delete criteria[type][item];
            criteria[type + 'Size']--;
          }
          $scope.testersMatched = matchService.findMatches(testers, criteria);
        };
      };

      var selectAll = function (type) {
        var collection = $scope[type];
        return function (selected) {
          if (selected) {
            criteria[type + 'Size'] = criteria[type + 'MaxSize'];
            for (var prop in collection.data) {
              collection.data[prop] = true;
              criteria[type][prop] = true;
            }
          } else {
            criteria[type + 'Size'] = 0;
            for (var prop in collection.data) {
              collection.data[prop] = false;
              delete criteria[type][prop];
            }
          }
          $scope.testersMatched = matchService.findMatches(testers, criteria);
        };
      };

      var getData = function () {
        dataService.getData()
        .then(function (data) {
          testers = data.testers;
          $scope.country.data = data.countries;
          criteria.countryMaxSize = Object.keys($scope.country.data).length;
          $scope.device.data = data.devices;
          criteria.deviceMaxSize = Object.keys($scope.device.data).length;
          $scope.testersMatched = matchService.findMatches(testers, criteria);
        });
      };

      $scope.selectCountry = selectOne('country');
      $scope.selectDevice = selectOne('device');
      $scope.selectAllCountries = selectAll('country');
      $scope.selectAllDevices = selectAll('device');

      // get data when initiating
      getData();
    }
})();
