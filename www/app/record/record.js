angular.module('moodTracker')
.controller("RecordCtrl", function($scope, $firebase, moods, moodRecord, $ionicPopup, $rootScope) {
  $scope.setMood = function (mood) {
    var name = mood.name;
    $ionicPopup.confirm({
      title: 'Feeling ' + name + '?',
      okText: 'Yep',
      cancelText: 'Nope'
    }).then(function (hasConfirmed) {
      if (hasConfirmed) {
        moodRecord.$asArray().$add({
          mood: name,
          time: Date.now()
        });
      }
    });
  };

  $scope.moods = moods.$asArray();
});