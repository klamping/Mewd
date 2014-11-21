angular.module('moodTracker')
.controller('MoodPulseCtrl', function ($scope, moods, moodRecord, $ionicPopup) {
    var storedMoods = moods;
    var records = moodRecord;

    $scope.distributionColors = [
        Chart.defaults.global.colours[2],
        Chart.defaults.global.colours[1],
        Chart.defaults.global.colours[3]
    ];

    $scope.distributionLabels = ['negative', 'neutral', 'positive'];

    $scope.runningOptions = {
        pointDot: false,
        scaleShowGridLines: false,
        showTooltips: false,
        responsive: true,
        animation: false
    };

    $scope.distributionOptions = {
        animation: false
    };

    //
    $scope.runningPositivity = [];
    $scope.runningLabels = [];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function getStartOfYear (date) {
        date = getStartOfMonth(date);

        date.setMonth(0);

        return date;
    }

    function getStartOfMonth (date) {
        date = new Date(date);

        date.setDate(0);

        return date;
    }

    function getStartOfWeek (date) {
        date = new Date(date);

        var diff = date.getDate() - date.getDay();

        date.setDate(diff);

        return date;
    }

    var today = new Date();
    var startOfToday = today.setHours(0, 0, 0, 0);
    var endOfToday = today.setHours(23, 59, 59, 999);

    $scope.timeframes = [
        {
            label: 'Today',
            startDate: startOfToday,
            endDate: endOfToday
        },
        {
            label: 'This Week',
            startDate: getStartOfWeek(startOfToday),
            endDate: endOfToday
        },
        {
            label: 'This Month',
            startDate: getStartOfMonth(startOfToday),
            endDate: endOfToday
        },
        {
            label: 'This Year',
            startDate: getStartOfYear(startOfToday),
            endDate: endOfToday
        },
        {
            label: 'Last X Days',
            value: 'last',
            endDate: endOfToday
        }
    ];

    $scope.setTimeframe = function (timeframe) {
        if (timeframe.value == 'last') {
            $ionicPopup.prompt({
                title: 'Last X Days',
                inputType: 'number',
                inputPlaceholder: '# of days to look back'
            }).then(function (daysAgo) {
                if (typeof daysAgo !== 'undefined') {
                    var start = new Date();
                    start.setDate(start.getDate() - daysAgo);

                    timeframe.startDate = start;

                    getTimeframeDetails(timeframe);
                }
            });
        } else {
            getTimeframeDetails(timeframe);
        }

    };

    var getTimeframeDetails = function (timeframe) {
        var startDate = timeframe.startDate;
        var endDate = timeframe.endDate;

        $scope.timeframeRecords = _.filter(records, function (record) {
            return startDate < record.time && record.time < endDate;
        });

        if ($scope.timeframeRecords.length === 0) {
            return false;
        }

        var accumulator = 0;
        $scope.runningPositivity = _.map($scope.timeframeRecords, function (record) {
            if (_.isObject(record) && 'positivity' in record) {
                accumulator += record.positivity;

                return accumulator;
            }
        });

        $scope.runningLabels = getLabels($scope.timeframeRecords);

        var counts = getCounts($scope.timeframeRecords);

        $scope.polarCounts = [
            counts[-1],
            counts[0],
            counts[1]
        ];

        $scope.overallPositivity = counts[1] - counts[-1];
    };

    var getCounts = function (records) {
        var counts = _.countBy(records, 'positivity');

        counts[-1] = counts[-1] || 0;
        counts[0] = counts[0] || 0;
        counts[1] = counts[1] || 0;

        return counts;
    };

    var getLabels = function (records) {
        var currentMonth = 0;
        var currentYear = 0;

        return _.map(records, function (mood) {
            var label = '';

            var time = new Date(mood.time);

            var nextMonth = time.getMonth();
            var nextYear = time.getFullYear();

            if (nextMonth > currentMonth || nextYear > currentYear) {
                label = months[nextMonth];
                if (nextYear > currentYear) {
                    label += ' ' + nextYear;
                    currentYear = nextYear;
                }
                currentMonth = nextMonth;
            }

            return label;
        });
    };

    records.$loaded().then(function () {
        // default to 'This Week'
        $scope.timeframe = $scope.timeframes[1];
        $scope.setTimeframe($scope.timeframe);

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
    });
});