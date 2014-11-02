angular.module('moodTracker')
.controller('RecordCtrl', function($scope, $firebase, moods, moodRecord, $ionicPopup) {
    var saveMood = function (mood) {
        moodRecord.$asArray().$add({
            mood: mood.name,
            positivity: mood.positive,
            time: Date.now()
        });
    };

    $scope.setMood = function (mood) {
        var name = mood.name;
        $ionicPopup.confirm({
            title: 'Feeling ' + name + '?',
            okText: 'Yep',
            cancelText: 'Nope'
        }).then(function (hasConfirmed) {
            if (hasConfirmed) {
                saveMood(mood);
            }
        });
    };

    $scope.moods = moods.$asArray();

    $scope.moodFilter = {};

    $scope.filterMood = function (positivity) {
        $scope.moodFilter.positive = positivity;
    };
});