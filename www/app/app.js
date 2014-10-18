angular.module('moodTracker', ['ionic', 'firebase', 'ui.router'])
.constant('firebaseRoot', 'https://moodie.firebaseio.com/')
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/app/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('tabs', {
        url: '/',
        templateUrl: '/app/app.html',
        controller: 'TabsCtrl'
      })
      .state('tabs.record', {
        url: '/record',
        templateUrl: '/app/record/record.html',
        controller: 'RecordCtrl'
      })
      .state('tabs.log', {
        url: '/log',
        templateUrl: '/app/log/log.html',
        controller: 'MoodLogCtrl'
      })
      .state('tabs.pulse', {
        url: '/pulse',
        templateUrl: '/app/pulse/pulse.html',
        controller: 'MoodPulseCtrl'
      });

    $urlRouterProvider.otherwise('login');
})
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
.factory('moodRecord', function($firebase, $rootScope, firebaseRoot) {
    var ref = new Firebase(firebaseRoot + '/moodRecord/' + $rootScope.user.uid);

    return $firebase(ref);
})
.factory('moods', function($firebase, firebaseRoot, $rootScope) {
    var ref = new Firebase(firebaseRoot + '/moods');

    return $firebase(ref);
})
.controller('TabsCtrl', function($rootScope, $state) {
    if ($rootScope.user === null) {
        $state.go('login');
    }
})
.controller('MoodLogCtrl', function($scope, $firebase, moodRecord, $ionicPopup) {
    $scope.moods = moodRecord.$asArray();
});