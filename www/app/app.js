/*globals Firebase:false, cordova:false, StatusBar:false*/
angular.module('moodTracker', ['ionic', 'firebase', 'ui.router', 'chart.js', 'ngCordova'])
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
        .state('pro', {
            url: '/pro',
            templateUrl: 'app/settings/pro/pro.html',
            controller: 'ProCtrl'
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
            resolve: {
                records: function (moodRecord) {
                    return moodRecord.then(function (records) {
                        return records.$loaded();
                    });
                }
            },
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
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.factory('moodRecord', function($firebase, firebaseRoot, $localStorage, LocalRecords, auth, $q) {
    var deferred = $q.defer();

    auth.getUser().then(function (user) {
        if (_.isObject(user)) {
            var ref = new Firebase(firebaseRoot + '/moodRecord/' + user.uid);
            deferred.resolve($firebase(ref).$asArray());
        } else {
            var records = $localStorage.getObject('moodRecord');
            deferred.resolve(new LocalRecords(records));
        }
    });

    return deferred.promise;
})
.factory('moods', function($firebase, firebaseRoot) {
    var ref = new Firebase(firebaseRoot + '/moods');

    return $firebase(ref).$asArray();
});