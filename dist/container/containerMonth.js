(function($root, ng) {
  ng
    .module("exam.calendar")
    .controller("controllerContainerMonth", ['$scope', 'holidaysService', '$filter', function($scope, holidaysService, $filter) {

      var vm = this;

      function updateView() {

        var months = [];
        var startDate = new Date(vm.startDate.valueOf());
        var endDate = new Date(startDate.valueOf());
        endDate.setDate(startDate.getDate() + (vm.countDays || 0));
        var cm = ((endDate.getFullYear() - startDate.getFullYear()) * 12) - (startDate.getMonth() + 1) + (endDate.getMonth() + 2);
        for (var index = 0; index < cm; index++) {
          var nm = new Date(vm.startDate.valueOf());
          nm.setMonth(startDate.getMonth() + index);
          months.push({ startDate: new Date(nm.getFullYear(), nm.getMonth(), 1), countDays: new Date(nm.getFullYear(), nm.getMonth(), 0).getDate() });
        }
        months[0].startDate = vm.startDate;
        months[months.length - 1].countDays = endDate.getDate();
        vm.months = months;
      }

      function getData() {
        holidaysService.getFromCache(vm.country).then(function(response) {
          vm.holidays = response;
        });

      }

      function getPublics(element) {
        var result = ""
        for (var index = 0; index < element.length; index++) {
          var item = element[index];
          if (item.public) result += item.name + "  ";
        }
        return result;
      }

      function getHoliday(e) {
        if (vm.holidays && e.date) {
          var tdate = $filter('date')(e.date, 'yyyy-MM-dd')
          for (var key in vm.holidays) {
            if (vm.holidays.hasOwnProperty(key)) {
              var element = vm.holidays[key];
              var names = getPublics(element)
              if (key === tdate && names) return names;
            }
          }
        }

      }
      vm.getHoliday = getHoliday;
      $scope.$watch("$ctrl.country", function(n, o) {
        if (n && n.length == 2)
          getData();
      })
      $scope.$watch("$ctrl.startDate", function(n, o) {
        if (n)
          updateView();
      })

      $scope.$watch("$ctrl.countDays", function(n, o) {
        if (n)
          updateView();
      })

    }])
    .component("containerMonth", {
      templateUrl: "/dist/container/containerMonth.html",
      controller: "controllerContainerMonth",
      bindings: {
        startDate: "=",
        countDays: "=",
        country: "="
      }
    });
})(window, angular);