angular.module('moodTracker')
.controller('MoodPulseCtrl', function ($scope, moods, moodRecord) {
    var storedMoods = moods.$asArray();
    var records = moodRecord.$asArray();

    var getCounts = function (records) {
        var counts = [0, 0, 0];

        _.each(records, function (record) {
            counts[record.positive + 1]++;
        });

        return counts;
    };

    storedMoods.$loaded().then(function () {
        records.$loaded().then(function () {
            _.each(records, function (record) {
                // find the associate mood
                var mood = _.find(storedMoods, { 'name': record.mood });

                if (_.isObject(mood)) {
                    record.positive = mood.positive;
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