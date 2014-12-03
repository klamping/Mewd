angular.module('moodTracker')
.controller('RegisterCtrl', function($scope, $rootScope, $state, $ionicPopup, auth) {
    auth.getAuth();

    $scope.register = function(creds) {
        $scope.isRegistering = true;

        var firebaseAuth = auth.getAuth();

        firebaseAuth.$createUser(creds.email, creds.password)
            .then(function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Account Created',
                    template: 'Your account has been created. You will now be logged in.'
                });
                alertPopup.then(function () {
                    auth.login('password', creds)
                    .then(function () {
                        $state.go('tabs.views');
                    });
                });

            }, function (err) {
                $scope.registerError = err.message;
            })
            .finally(function () {
                $scope.isRegistering = false;
            });
    };

    // Log any login-related errors to the console
    $rootScope.$on('$firebaseSimpleLogin:error', function(event, error) {
        $scope.loginError = error.message;
    });
});