angular.module('moodTracker', ['ionic', 'firebase'])
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.factory("moodRecord", function($firebase, $rootScope) {
    var ref = new Firebase("https://moodie.firebaseio.com/moodRecord/" + $rootScope.user.uid);

    return $firebase(ref);
})
.factory("moods", function($firebase, $rootScope) {
    var ref = new Firebase("https://moodie.firebaseio.com/moods");

    return $firebase(ref);
})
.controller("MoodLogCtrl", function($scope, $firebase, moodRecord, $ionicPopup) {
    $scope.moods = moodRecord.$asArray();
})
.controller("MoodPulseCtrl", function($scope, moods, moodRecord) {
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