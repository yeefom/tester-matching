(function() {
    'use strict';

    angular
      .module('testermatching')
      .controller('matchingCtrl', matchingCtrl);

    matchingCtrl.$inject = ['$scope', 'dataService'];

    function matchingCtrl($scope, dataService) {
      $scope.testers = {};
      $scope.countries = {};
      $scope.devices = {};

      $scope.getData = function () {
        dataService.getData()
        .then(function (data) {
          $scope.testers.data = data.testers;
          $scope.countries.data = data.countries;
          $scope.devices.data = data.devices;
          console.log($scope.devices.data);
          console.log($scope.countries.data);
        });
      };

      $scope.selectCountry = function (country, selected) {
        console.log(country, selected);
      };

      $scope.selectDevice = function (device) {
        
      };

      $scope.getData();
    }
})();
