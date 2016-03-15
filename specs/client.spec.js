describe('Tester Matching', function () {
  beforeEach(module('testermatching'));

  describe('dataService', function () {
    var $httpBackend;
    var dataService;
    beforeEach(inject(function (_dataService_, _$httpBackend_) {
      dataService = _dataService_;
      $httpBackend = _$httpBackend_;
    }));

    it('should get data from server', function () {
      var data = {
        testers: [{
          firstName: "Frank",
          lastName: "Underwood",
          country: "US",
          devices: {
            "iPhone 5": 3
          }
        }]
      };

      $httpBackend
        .expectGET('/api/data')
        .respond(200, data);

      dataService.getData().then(function (data) {
        expect(data.testers[0].firstName).to.eql('Frank');      
      });

      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();     
    });
  });

  describe('matchService', function () {
    var matchService;
    beforeEach(inject(function (_matchService_) {
      matchService = _matchService_;
    }));

    it('should find matched testers', function () {
      expect(matchService.findMatches).to.exist;
    });
  });

  describe('matchingCtrl', function () {
    var scope;
    beforeEach(inject(function (_$controller_, _$rootScope_) {
      scope = _$rootScope_.$new();
      _$controller_('matchingCtrl', {$scope: scope});
    }));

    it('should select criteria', function () {
      expect(scope.select).to.exist;
    });
  });

});
