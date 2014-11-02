angular.module('moodTracker')
.controller('MoodPulseCtrl', function ($scope, moods, moodRecord) {
    var storedMoods = moods.$asArray();
    var records = moodRecord.$asArray();
    $scope.dayByDay = [0];
    var currentDay = 0;

    var getCounts = function (records) {
        var counts = [0, 0, 0];

        _.each(records, function (record) {
            counts[record.positive + 1]++;
        });

        return counts;
    };



    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];



    $scope.polarColors = [
        Chart.defaults.global.colours[2],
        Chart.defaults.global.colours[1],
        Chart.defaults.global.colours[3]
    ];


    storedMoods.$loaded().then(function () {
        records.$loaded().then(function () {
            _.each(records, function (record) {
                // find the associate mood
                var mood = _.find(storedMoods, { 'name': record.mood });

                if (_.isObject(mood)) {
                    record.positive = mood.positive;

                    var dayPositivity = $scope.dayByDay[currentDay] + record.positive;
                    $scope.dayByDay.push(dayPositivity)
                    currentDay++;
                }
            });

            $scope.counts = getCounts(records);

            var today = new Date();
            var sevenDaysAgo = today.setDate(today.getDate() - 7);
            var lastSevenDays = _.filter(records, function (record) {
                return record.time > sevenDaysAgo;
            });

            $scope.countSeven = getCounts(lastSevenDays);
        });
    });
});