angular.module('moodTracker')
.controller('MoodLogCtrl', function($scope, $firebase, moodRecord, $ionicPopup) {
    $scope.moods = moodRecord.$asArray();

    $scope.showDelete = false;

    $scope.deleteMood = function (mood) {
        $scope.moods.$remove(mood);
    };
});