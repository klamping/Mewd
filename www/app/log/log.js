angular.module('moodTracker')
.controller('MoodLogCtrl', function($scope, $firebase, moodRecord, $ionicPopup, $filter) {
    $scope.moods = moodRecord.$asArray();

    $scope.showDelete = false;

    $scope.deleteMood = function (mood) {
        $scope.moods.$remove(mood);
    };

    $scope.showDetails = function (mood) {
        $ionicPopup.alert({
            title: mood.mood,
            subTitle: $filter('date')(mood.time, 'medium'),
            template: mood.note
        });
    }
});