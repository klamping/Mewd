angular.module('moodTracker')
.controller('RegisterCtrl', function($scope, $rootScope, $state, $ionicPopup) {
    if ($rootScope.user !== null) {
        $state.go('tabs.views');
    }

    $scope.register = function(creds) {
        $scope.isRegistering = true;
        $rootScope.auth.$createUser(creds.email, creds.password)
            .then(function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Account Created',
                    template: 'Your account has been created. You will now be logged in.'
                });
                alertPopup.then(function () {
                    $rootScope.auth.$login('password', creds);
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