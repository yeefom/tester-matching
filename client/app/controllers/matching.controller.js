(function() {
    'use strict';

    angular
      .module('testermatching')
      .controller('matchingCtrl', matchingCtrl);

    matchingCtrl.$inject = ['$scope', 'dataService'];

    function matchingCtrl($scope, dataService) {
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

      $scope.selectCountry = function (country, selected) {
        if (selected) {
          $scope.criteria.country[country] = true;
          $scope.criteria.countrySize++;
        } else {
          delete $scope.criteria.country[country];
          $scope.criteria.countrySize--;
        }
        $scope.render();
      };

      $scope.selectDevice = function (device) {
        
      };

      function render () {
        var shown = [];
        var testerMatched;
        if (!criteria.countrySize && !criteria.deviceSize) {
          for (var i = 0; i < testers.length; i++) {
            testerMatched = fillBasicInfo(testers, i);
            testerMatched.bugsFiled = 0;
            for (var prop in testerMatched.devices) {
              testerMatched.bugsFiled += testerMatched.devices[prop];
            }
            shown.push(testerMatched);
          }
        } else if (!$scope.criteria.countrySize) {
          var isPicked;
          var bugsFiled; 
          for (var i = 0; i < testers; i++) {
            isPicked = false;
            for (var prop in criteria.device) {
              bugsFiled = testers[i].devices[prop];
              if (!isPicked) {
                if (bugsFiled){
                  isPicked = true;
                  testerMatched = fillBasicInfo(testers, i);
                  testerMatched.devices[prop] = bugsFiled;
                  testerMatched.bugsFiled = bugsFiled;
                }
              } else {
                if (bugsFiled){
                  testerMatched.devices[prop] = bugsFiled;
                  testerMatched.bugsFiled += bugsFiled;
                }
              }
            }
          }
        } else if (!$scope.criteria.deviceSize) {

        }
        else {

        }
        $scope.testersMatched = shown;
      }

      function getData () {
        dataService.getData()
        .then(function (data) {
          testers = data.testers;
          $scope.countries.data = data.countries;
          $scope.devices.data = data.devices;
        });
      }

      function fillBasicInfo (testers, i) {
        var testerMatched = {};
        testerMatched.name = testers[i].name;
        testerMatched.country = testers[i].country;
        return testerMatched;
      }

      getData();
      $scope.render();
    }
})();
