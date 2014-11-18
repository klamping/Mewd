angular.module('moodTracker')
.controller('RemindersCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaLocalNotification) {
    $ionicPlatform.ready(function() {
        $cordovaLocalNotification.getScheduledIds().then(function (scheduledIds) {
            console.log(scheduledIds);
        });
    });

    $scope.addNotification = function () {
        var date = Date.now();
        $cordovaLocalNotification.add({
            id: 'some_notification_id',
            date: date,
            title: 'Remember to log your mood',
            repeat: 'daily'
        }).then(function () {
            console.log('callback for adding background notification');
        });;
    }
});