angular.module('moodTracker')
.controller('LoginCtrl', function($scope, $rootScope, $state, $ionicPopup) {
    if ($rootScope.user !== null) {
        $state.go('tabs.views');
    }

    $scope.creds = {};

    // Logs a user in with inputted provider
    $scope.login = function(provider, creds) {
        $scope.isLoggingIn = true;
        $rootScope.auth.$login(provider, creds)
        .finally(function () {
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
            $rootScope.auth.$sendPasswordResetEmail(res)
                .then(function () {
                    $ionicPopup.alert({
                        title: 'Password Reset Sent',
                        template: 'Please check your email and try logging in again'
                    });
                });
        });
    };

    // Log any login-related errors to the console
    $rootScope.$on('$firebaseSimpleLogin:error', function(event, error) {
        $scope.loginError = error.message;
    });
});