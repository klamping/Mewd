angular.module('moodTracker')
.controller('ProCtrl', function($scope, store, $state, $ionicPopup) {
    $scope.subscribe = function () {
        store.subscribe().then(function (product) {
            product.on('approved', function () {
                $ionicPopup.alert({
                    title: 'Thank you for your purchase. Pro features unlocked!'
                });

                // redirect to homescreen
                $state.go('login');

                // on first login, offer to import data

            });
        });
    };
});