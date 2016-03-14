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

      $scope.countries = {};
      $scope.devices = {};
      $scope.testersMatched = [];

      $scope.select = function (type, item, selected) {
        if (type === "country") {
          if (selected) {
            criteria.country[item] = true;
            criteria.countrySize++;
          } else {
            delete criteria.country[item];
            criteria.countrySize--;
          }
        } else {
          if (selected) {
            criteria.device[item] = true;
            criteria.countrySize++;
          } else {
            delete criteria.device[item];
            criteria.countrySize--;
          }
        }
        $scope.testersMatched = matchService.findMatches(testers, criteria);
      };

      var getData = function () {
        dataService.getData()
        .then(function (data) {
          testers = data.testers;
          $scope.countries.data = data.countries;
          $scope.devices.data = data.devices;
          $scope.testersMatched = matchService.findMatches(testers, criteria);
        });
      };

      getData();
    }
})();
