angular.module('moodTracker')
.controller('MoodPulseCtrl', function ($scope, moods, moodRecord) {
    var storedMoods = moods.$asArray();
    var records = moodRecord.$asArray();

    var getCounts = function (records) {
        var counts = [0, 0, 0];

        _.each(records, function (record) {
            counts[record.positivity + 1]++;
        });

        return counts;
    };

    $scope.runningPositivity = [];
    $scope.runningLabels = [];

    $scope.distributionColors = [
        Chart.defaults.global.colours[2],
        Chart.defaults.global.colours[1],
        Chart.defaults.global.colours[3]
    ];

    $scope.distributionLabels = ['negative', 'neutral', 'positive'];

    records.$loaded().then(function () {
        storedMoods.$loaded().then(function () {

            // if saved w/o a positivity value, update the mood
            // TODO this can be removed after all data has been updated
            _.each(records, function (record) {
                // find the associate mood
                var mood = _.find(storedMoods, { 'name': record.mood });
                if (_.isObject(mood) && !('positivity' in record)) {
                    record.positivity = mood.positive;;

                    records.$save(record);
                }
            });
        });

        var accumulator = 0;
        var currentMonth = 0;
        var currentYear = 0;
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var label = '';
        $scope.runningPositivity = _.map(records, function (record) {
            if (_.isObject(record) && 'positivity' in record) {
                // convert record time to a day
                var time = new Date(record.time);
                var recordMonth = time.getMonth();
                var recordYear = time.getFullYear();

                if (recordMonth > currentMonth || recordYear > currentYear) {
                    label = months[recordMonth];
                    if (recordYear > currentYear) {
                        label += ' ' + recordYear;
                        currentYear = recordYear;
                    }
                    $scope.runningLabels.push(label);
                    currentMonth = recordMonth;
                } else {
                    $scope.runningLabels.push('');
                }

                accumulator += record.positivity;

                return accumulator;
            }
        });

        // add to an array so that chart.js is happy
        $scope.runningPositivity = [$scope.runningPositivity];
        $scope.runningOptions = {
            pointDot: false,
            scaleShowGridLines: false,
            showTooltips: false,
            responsive: true
        };

        $scope.counts = getCounts(records);

        var today = new Date();
        var sevenDaysAgo = today.setDate(today.getDate() - 7);
        var lastSevenDays = _.filter(records, function (record) {
            return record.time > sevenDaysAgo;
        });

        $scope.countSeven = getCounts(lastSevenDays);
    });
});