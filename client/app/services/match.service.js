(function() {
    'use strict';

    angular
        .module('testermatching')
        .service('matchService', matchService);

    matchService.$inject = [];

    function matchService() {
      var parseAllDevices = function (testerMatched, tester, criteria) {
        testerMatched.devices = tester.devices;
        testerMatched.bugsFiled = 0;
        for (var prop in testerMatched.devices) {
          testerMatched.bugsFiled += testerMatched.devices[prop];
        }
      };

      var parseSelectedDevices = function (testerMatched, tester, criteria) {
        var bugsFiled;
        var isPicked = false;
        for (var prop in criteria.device) {
          bugsFiled = tester.devices[prop];
          if (bugsFiled) {
            if(!isPicked) {
              testerMatched.devices = {};
              testerMatched.devices[prop] = bugsFiled;
              testerMatched.bugsFiled = bugsFiled;
              isPicked = true;
            } else {
              testerMatched.devices[prop] = bugsFiled;
              testerMatched.bugsFiled += bugsFiled;
            }
          }
        }
        return isPicked;
      };

      var TesterMatched = function (firstName, lastName, country) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
      };

      var findMatches = function (testers, criteria) {
        var shown = [];
        var testerMatched;
        if (!criteria.countrySize && !criteria.deviceSize) {
          for (var i = 0; i < testers.length; i++) {
            testerMatched = new TesterMatched(testers[i].firstName, testers[i].lastName, testers[i].country);
            parseAllDevices(testerMatched, testers[i], criteria);
            shown.push(testerMatched);
          }
        } else if (!criteria.countrySize) {
          var bugsFiled;
          for (var i = 0; i < testers.length; i++) {
            testerMatched = new TesterMatched(testers[i].firstName, testers[i].lastName, testers[i].country);
            if(parseSelectedDevices(testerMatched, testers[i], criteria)) {
              shown.push(testerMatched);
            }
          }
        } else if (!criteria.deviceSize) {
          for (var i = 0; i < testers.length; i++) {
            if (criteria.country[testers[i].country]) {
              testerMatched = new TesterMatched(testers[i].firstName, testers[i].lastName, testers[i].country);
              parseAllDevices(testerMatched, testers[i], criteria);
              shown.push(testerMatched);
            }
          }
        }
        else {
          for (var i = 0; i < testers.length; i++) {
            if(criteria.country[testers[i].country]) {
              testerMatched = new TesterMatched(testers[i].firstName, testers[i].lastName, testers[i].country);
              if (parseSelectedDevices(testerMatched, testers[i], criteria)) {
                shown.push(testerMatched);
              }
            }
          }
        }
        return shown;
      };

      return {
        findMatches: findMatches
      };
    }
})();
