angular.module('moodTracker')
.controller('RecordCtrl', function($scope, $firebase, moods, moodRecord, $ionicPopup) {
    var saveMood = function (mood) {
        moodRecord.$asArray().$add({
            mood: mood.name,
            note: mood.note,
            positivity: mood.positive,
            time: Date.now()
        });
    };

    $scope.setMood = function (mood) {
        $ionicPopup.prompt({
            title: 'Feeling ' + mood.name + '?',
            okText: 'Yep',
            cancelText: 'Nope',
            inputType: 'text',
            inputPlaceholder: 'Add an Optional Note'
        }).then(function (note) {
            if (typeof note !== 'undefined') {
                mood.note = note;

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