(function($root, ng) {
  ng.module("exam.calendar")
    .factory('holidaysService', ['$http', '$q', '$cacheFactory', function($http, $q, $cacheFactory) {
      var cache = $cacheFactory('cacheHoliday');

      function get(country) {
        var defer = $q.defer();
        $http.get("https://holidayapi.com/v1/holidays?key=1e589f5b-45a0-443d-b6cc-89134127af64&country=" + country + "&year=2008")
          .then(function(response) {
            defer.resolve(response.data.holidays);
          }, function(e) {
            defer.reject(e);
          });
        return defer.promise;
      }
      return {
        getFromCache: function(country) {
          if (cache.get('holidays' + country)) {
            return $q.resolve(cache.get('holidays' + country));
          } else {
            var p = get(country);
            p.then(function(holidays) {
              cache.put('holidays' + country, holidays);
            })
            return p;
          }
        },
        get: get
      }
    }])
})(window, angular);