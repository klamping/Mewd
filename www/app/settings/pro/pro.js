angular.module('moodTracker')
.controller('ProCtrl', function($scope, store) {
    $scope.subscribe = function () {
        store.subscribe();
        // on success, upgrade account
    };
});