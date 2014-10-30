angular.module('moodTracker', ['ionic', 'firebase', 'ui.router'])
.constant('firebaseRoot', 'https://moodie.firebaseio.com/')
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/login/register.html',
        controller: 'RegisterCtrl'
      })
      .state('privacy', {
        url: '/privacy',
        templateUrl: 'app/privacy.html'
      })
      .state('tabs', {
        abstract: true,
        url: '/',
        templateUrl: 'app/app.html',
        data: {
            authenticate: true
        }
      })
      .state('tabs.views', {
        url: '',
        views: {
            'record@tabs': {
                templateUrl: 'app/record/record.html',
                controller: 'RecordCtrl'
            },
            'log@tabs': {
                templateUrl: 'app/log/log.html',
                controller: 'MoodLogCtrl'
            },
            'pulse@tabs': {
                templateUrl: 'app/pulse/pulse.html',
                controller: 'MoodPulseCtrl'
            },
            'settings@tabs': {
                templateUrl: 'app/settings/settings.html',
                controller: 'SettingsCtrl'
            }
        }
      });

    $urlRouterProvider.otherwise('/');
})
.run(function($ionicPlatform, $rootScope, $state, firebaseRoot, $firebaseSimpleLogin) {
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

    // Get a reference to the Firebase
    var firebaseRef = new Firebase(firebaseRoot);

    // Create a Firebase Simple Login object
    $rootScope.auth = $firebaseSimpleLogin(firebaseRef);

    // Upon successful login, set the user object
    $rootScope.$on('$firebaseSimpleLogin:login', function(event, user) {
        $rootScope.user = user;
    });

    // Upon successful logout, reset the user object
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
        $rootScope.user = null;
        if (window.cookies) {
            window.cookies.clear();
        }

        if ($state.current.data && $state.current.data.authenticate) {
            $state.go('login');
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
.controller('MoodLogCtrl', function($scope, $firebase, moodRecord, $ionicPopup) {
    $scope.moods = moodRecord.$asArray();
});