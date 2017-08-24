(function($root, ng) {
  ng
    .module("exam.calendar", [])
    .controller("controllerExamCalendar", ['$element', '$scope', function($element, $scope) {
      var vm = this;

      function refresh() {
        var weeks = [],
          week = null;
        var current = vm.startDate.getDate();
        var weekDay = vm.startDate.getDay();
        var lastDay = vm.countDays || new Date(vm.startDate.getFullYear(), vm.startDate.getMonth(), 0).getDate();
        var iterator = current;
        while (iterator <= lastDay) {
          week = [];
          for (var index = 0; index < 7; index++) {
            if ((weekDay <= index || weeks.length !== 0) && iterator <= lastDay) {
              week.push({
                isEmpty: false,
                day: index,
                date: new Date(vm.startDate.getFullYear(), vm.startDate.getMonth(), iterator),
                dayNumber: iterator
              });
              iterator++;
            } else {
              week.push({
                isEmpty: true
              })
            }

          }
          weeks.push(week);
        }

        vm.weeks = weeks;
      }
      $scope.$watch("$ctrl.startDate", function(n, o) {

        if (n)
          refresh();
      })
      vm.isHolyday = function(day) {
        return vm.onIsHoliday({ $day: day });
      }
    }])
    .component("examCalendar", {
      templateUrl: "/dist/calendar/calendar.html",
      controller: "controllerExamCalendar",
      bindings: {
        startDate: "=",
        countDays: "=",
        onIsHoliday: "&"
      }
    });
})(window, angular);