angular.module('moodTracker')
.controller('ProCtrl', function($scope, store) {
    $scope.subscribe = function () {
        store.subscribe();
        // on success, upgrade account
        // redirect to homescreen
        // on first login, offer to import data
    };
});