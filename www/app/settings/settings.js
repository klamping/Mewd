angular.module('moodTracker')
.controller('SettingsCtrl', function($scope, $rootScope, $ionicPopup, $ionicPopover) {
    // Logs a user out
    $scope.logout = function() {
        $rootScope.auth.$logout();
    };

    $ionicPopover.fromTemplateUrl('changePassword.html', {
        scope: $scope,
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };

    $scope.changePassword = function (oldPw, newPw) {
        $rootScope.auth.$changePassword($rootScope.user.email, oldPw, newPw)
        .then(function () {
            $scope.popover.hide();
            $ionicPopup.alert({
                title: 'Password Changed'
            });
        }, function (err) {
            $ionicPopup.alert({
                title: 'Error Changing Password',
                template: err
            });
        });
    };

    $scope.deleteAccount = function() {
        $scope.errMsg = '';

        $ionicPopup.prompt({
            title: 'Delete Your Account',
            subTitle: 'Type your account password',
            inputType: 'password',
            inputPlaceholder: 'Enter Password',
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
                $scope.errMsg = err.message;
            });
        });
    };
});