/*globals Firebase:false, cordova:false, StatusBar:false*/
angular.module('moodTracker', ['ionic', 'firebase', 'chart.js', 'ngCordova'])
.constant('firebaseRoot', 'https://moodie.firebaseio.com/')
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        // .state('login', {
        //     url: '/login',
        //     templateUrl: 'app/login/login.html',
        //     controller: 'LoginCtrl'
        // })
        // .state('register', {
        //     url: '/register',
        //     templateUrl: 'app/login/register.html',
        //     controller: 'RegisterCtrl'
        // })
        .state('privacy', {
            url: '/privacy',
            templateUrl: 'app/privacy.html'
        })
        // .state('pro', {
        //     url: '/pro',
        //     templateUrl: 'app/settings/pro/pro.html',
        //     controller: 'ProCtrl'
        // })
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
                // user: function ($q, auth) {
                //     var userInfo = auth.getUser();

                //     if (userInfo) {
                //         return $q.when(userInfo);
                //     } else {
                //         return $q.reject({ authenticated: false });
                //     }
                // },
                records: function (moodRecord) {
                    return new moodRecord();
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
.run(function($ionicPlatform, $rootScope, $state) {
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

    // $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    //     if (error && error.authenticated === false) {
    //         $state.go('login');
    //     }
    // });
})
.factory('moodRecord', function($firebase, firebaseRoot, $localStorage, LocalRecords, $q, $rootScope) {
    return function () {
    //     if (_.isObject(user)) {
    //         var ref = $firebase(new Firebase(firebaseRoot + '/moodRecord/' + user.uid));

    //         // $rootScope.$on('$firebaseSimpleLogin:logout', function () {
    //         //     console.log('$off');
    //         //     console.log(ref.off);
    //         //     ref.off();
    //         // });

    //         return ref.$asArray().$loaded();
    //     } else if (user === 'guest') {
            var records = $localStorage.getObject('moodRecord');
            return new LocalRecords(records);
        // }
    }

})
.factory('moods', function($firebase, firebaseRoot) {
    // TODO convert to using user data for pro members
    var ref = new Firebase(firebaseRoot + '/moods');

    return $firebase(ref).$asArray();
});