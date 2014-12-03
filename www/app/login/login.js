angular.module('moodTracker')
.controller('LoginCtrl', function($scope, $rootScope, $state, $ionicPopup, auth, store, firebaseAuth) {
    $scope.creds = {};

    store.isSubscribed().then(function (subscribed) {
        $scope.subscribed = subscribed;
    });

    store.isStoreAvailable().then(function (storeAvailable) {
        $scope.storeAvailable = storeAvailable;
    });

    // Logs a user in with inputted provider
    $scope.login = function(provider, creds) {
        $scope.isLoggingIn = true;

        console.log('logging in', provider, creds);

        auth.login(provider, creds)
        .then(function () {
            console.log('going to tabs');
            $state.go('tabs.views');
        })
        .catch(function () {
            console.log('failed to login');
            $scope.isLoggingIn = false;
        });
    };

    $scope.resetPassword = function () {
        $ionicPopup.prompt({
            title: 'Reset Your Password',
            inputType: 'email',
            inputPlaceholder: 'Email address',
            okText: 'Reset',
            okType: 'button-assertive'
        }).then(function (res) {
            if (typeof res === 'undefined') {
                return false;
            }

            $scope.creds.email = res;
            auth.getAuth().$sendPasswordResetEmail(res)
                .then(function () {
                    $ionicPopup.alert({
                        title: 'Password Reset Sent',
                        template: 'Please check your email and try logging in again'
                    });
                });
        });
    };

    // Log any login-related errors to the console
    $rootScope.$on('$firebaseSimpleLogin:error', function (event, error) {
        console.log('error', error.message);
        $scope.loginError = error.message;
    });
});