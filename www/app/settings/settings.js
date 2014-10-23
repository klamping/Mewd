angular.module('moodTracker')
.controller('SettingsCtrl', function($scope, $rootScope) {
    // Logs a user out
    $scope.logout = function() {
        $rootScope.auth.$logout();
    };
});