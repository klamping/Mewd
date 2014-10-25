angular.module('moodTracker')
.controller('SettingsCtrl', function($scope, $rootScope,  $ionicPopup, $state) {
    // Logs a user out
    $scope.logout = function() {
        $rootScope.auth.$logout();
    };

    console.log($rootScope.user.email);

    $scope.deleteAccount = function() {
        $ionicPopup.prompt({
            title: 'Delete Your Account',
            subTitle: 'Type your account password',
            inputType: 'password',
            okText: 'Delete',
            okType: 'button-assertive'
        }).then(function (res) {
            if (typeof res === 'undefined') {
                return false;
            }
            $rootScope.auth.$removeUser($rootScope.user.email, res)
            .then(function () {
                $scope.logout();
                $ionicPopup.alert({
                    title: 'Account Deleted',
                    template: 'Thanks for trying Mewd out!'
                });
            }, function (err) {
                $scope.deleteError = err.message;
            });
        });
    };
});