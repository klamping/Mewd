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
.controller("MoodPulseCtrl", function($scope, moods) {
    $scope.moods = moods.$asObject();

    $scope.moods.$loaded().then(function() {
        $scope.counts = _.groupBy($scope.moods, function (mood) {
            if (_.isObject(mood) && 'positive' in mood) {
                return mood.positive.toString();
            } else {
                return 'invalid';
            }
        });
    });
});