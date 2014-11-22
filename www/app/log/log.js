angular.module('moodTracker')
.controller('MoodLogCtrl', function($scope, $firebase, records, $ionicPopup, $filter) {
    $scope.records = records;

    $scope.showDelete = false;

    $scope.deleteMood = function (mood) {
        $scope.records.$remove(mood);
    };

    $scope.showDetails = function (mood) {
        $ionicPopup.alert({
            title: mood.mood,
            subTitle: $filter('date')(mood.time, 'medium'),
            template: mood.note
        });
    };
});