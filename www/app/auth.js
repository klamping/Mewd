/*globals Firebase:false*/
angular.module('moodTracker')
.factory('auth', function ($q, $rootScope, store, firebaseRoot, $firebaseSimpleLogin, $state) {
    var user;

    // Upon successful logout, reset the user object
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
        user = null;

        if (window.cookies) {
            window.cookies.clear();
        }

        if ($state.current.data && $state.current.data.authenticate) {
            $state.go('login');
        }
    });

    var loginWithFirebase = function () {
        var deferred = $q.defer();

        //Get a reference to the Firebase
        var firebaseRef = new Firebase(firebaseRoot);

        // Create a Firebase Simple Login object
        $rootScope.auth = $firebaseSimpleLogin(firebaseRef);

        // Upon successful login, set the user object
        $rootScope.$on('$firebaseSimpleLogin:login', function(event, firebaseUser) {
            deferred.resolve(firebaseUser);
        });

        return deferred.promise;
    };

    var loginAsGuest = function () {
        var deferred = $q.defer();
        deferred.resolve('guest');
        return deferred.promise;
    };

    return {
        login: function () {
            var deferred = $q.defer();

            store.isSubscribed().then(function (subscribed) {
                var login;

                if (subscribed) {
                    login = loginWithFirebase();
                } else {
                    login = loginAsGuest();
                }

                login.then(function (user) {
                    deferred.resolve(user);
                });

                return login;
            });

            return deferred.promise;
        },
        getUser: function () {
            var deferred = $q.defer();

            if (!user) {
                this.login().then(function (loginUser) {
                    user = loginUser;
                    deferred.resolve(loginUser);
                });
            } else {
                deferred.resolve(user);
            }

            return deferred.promise;
        }
    };
});