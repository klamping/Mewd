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
   var ref = new Firebase("https://moodie.firebaseio.com/moods");

   return $firebase(ref);
})
// .factory("moods", function($firebase, $rootScope) {
//    var ref = new Firebase("https://moodie.firebaseio.com/moods");

//    return $firebase(ref);
// })
.controller("HistoryCtrl", function($scope, $firebase, moodRecord, $ionicPopup) {
  $scope.moods = moodRecord.$asObject();
});