(function() {
    'use strict';

    angular.module('testermatching', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: './app/templates/matching.html',
        controller: 'matchingCtrl'
      });
    }]);
})();
