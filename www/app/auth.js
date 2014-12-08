/*globals Firebase:false*/
angular.module('moodTracker')
.factory('auth', function ($q, $rootScope, store, firebaseAuth, $state, $window) {
    var user;

    var logoutUser = function () {
        var user = $window.sessionStorage.getItem('user');

        if (user && JSON.parse(user) !== 'guest') {
            firebaseAuth.$logout();
        }

        $window.sessionStorage.removeItem('user');

        if (_.isObject($state.current.data) && $state.current.data.authenticate) {
            $state.go('login');
        }
    };

    // $rootScope.$on('$firebaseSimpleLogin:logout', function () {
    //     logoutUser();
    // });

    $rootScope.$on('$firebaseSimpleLogin:login', function(event, firebaseUser) {
        $window.sessionStorage.setItem('user', JSON.stringify(firebaseUser));
        $state.go('tabs.views');
    });

    var loginWithFirebase = function (provider, creds) {
        var deferred = $q.defer();

        // Upon successful login, set the user object
        if (provider) {
            firebaseAuth.$login(provider, creds)
            .then(function (firebaseUser) {
                deferred.resolve(firebaseUser);
            }, function () {
                deferred.reject();
            });
        }

        return deferred.promise;
    };

    var loginAsGuest = function () {
        return $q.when('guest');
    };

    return {
        login: function (provider, creds) {
            var deferred = $q.defer();
            var login;

            if (provider == 'guest') {
                login = loginAsGuest();
            } else {
                login = loginWithFirebase(provider, creds);
            }

            login.then(function (loginUser) {
                $window.sessionStorage.setItem('user', JSON.stringify(loginUser));
                deferred.resolve(user);
            }, function () {
                deferred.reject();
            });

            // return login;

            return deferred.promise;
        },
        isLoggedIn: function () {
            return $window.sessionStorage.getItem('user') !== null;
        },
        getUser: function () {
            var user = $window.sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
            }
            return user;
        },
        logout: function () {
            logoutUser();
        }
    };
})
.factory('firebaseAuth', function ($firebaseSimpleLogin, firebaseRoot) {
    console.log('firebaseAuth');
    //Get a reference to the Firebase
    var firebaseRef = new Firebase(firebaseRoot);

    // Create a Firebase Simple Login object
    return $firebaseSimpleLogin(firebaseRef);
});