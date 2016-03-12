(function() {
    'use strict';

    angular
        .module('testermatching')
        .service('dataService', dataService);

    dataService.$inject = ['$http'];

    function dataService($http) {
      var getData = function () {
        return $http({
          method: 'GET',
          url: '/api/data'
        })
        .then(function (data) {
          return data.data;
        });
      };

      return {
        getData: getData,
      };
    }
})();
