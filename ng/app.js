(function() {
  "use strict;"

  angular.module("Proverbs", [])
  .controller("ProverbsController", ProverbsController)
  .service("ProverbsService", ProverbsService)
  .constant("url", "https://brentn.github.io/Proverbs/ng/proverbs.json");

  ProverbsController.$inject = ['ProverbsService'];
  function ProverbsController(ProverbsService) {
    var Proverbs = this;
    Proverbs.verses = "";
    Proverbs.version = "";
    Proverbs.load = function() {
      Proverbs.verses = ProverbsService.getVerses(Proverbs.chapter);
    }
    Proverbs.chapter = new Date().getDate();
    var promise = ProverbsService.loadData();
    promise.then(
      function() {
        Proverbs.version = ProverbsService.getVersion;
        Proverbs.load();
      },
      function() {console.error("error2")}
    )
  }

  ProverbsService.$inject = ['$http', 'url'];
  function ProverbsService($http, url) {
    var service=this;
    var data={};

    service.getVersion = "";
    service.getVerses = function(chapter) {return [""];}
    service.loadData = function() {
      var promise = $http({url:url})
      .then(
        function(response) {
          data=response.data;
          service.getVersion = response.data.version;
          service.getVerses = function(chapter) {
            return data.proverb[chapter-1].text.split('\n');
          }
        },
        function(error) {console.error("error")}
      );
      return promise;
    }
 }
})();
