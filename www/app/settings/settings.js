angular.module('moodTracker')
.controller('SettingsCtrl', function($scope, $rootScope, $ionicPopup, $ionicPopover, $cordovaDatePicker, $cordovaLocalNotification) {

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

    $scope.fetchReminders = function () {
        $cordovaLocalNotification.getScheduledIds().then(function (scheduledIds) {
            $scope.reminders = scheduledIds;
        });
    }
    $scope.fetchReminders();

    $scope.reminder = {
        time: new Date()
    };

    $scope.frequencies = [
        { text: 'Never', value: '' },
        { text: 'Every Hour', value: 'hourly' },
        { text: 'Every Day', value: 'daily' },
        { text: 'Every Week', value: 'weekly' }
    ];

    $scope.selectTime = function () {
        var options = {
            date: new Date(),
            mode: 'time'
        };

        $cordovaDatePicker.show(options).then(function(time){
            if (time.getTime() > 0) {
                $scope.reminder.time = new Date(time);
            }
        });
    };

    $cordovaLocalNotification.setDefaults({
        title: 'How are you feeling?',
        message: 'Remember to log your mood',
        autoCancel: true
    });

    $scope.addReminder = function () {
        var reminderTime = $scope.reminder.time.getTime();

        var reminderOpts = {
            id: reminderTime,
            date: $scope.reminder.time
        };

        if ($scope.reminder.repeat) {
            reminderOpts.repeat = $scope.reminder.repeat;
        };
        if ($scope.reminder.silent) {
            reminderOpts.sound = null;
        }

        $cordovaLocalNotification.add(reminderOpts);
    };

    $scope.deleteReminder = function (id) {
        $cordovaLocalNotification.cancel(id);
    };

    window.plugin.notification.local.oncancel = function () {
        $scope.fetchReminders();
    };

    window.plugin.notification.local.onadd = function () {
        $scope.reminder = {
            time: new Date()
        };
        $scope.fetchReminders();

        $ionicPopup.alert({
            title: 'Reminder Added'
        });
    };

    window.plugin.notification.local.ontrigger = function (id, state, json) {
        $scope.fetchReminders();
    };

    window.plugin.notification.local.onclick = function (id, state, json) {
        // create a new reminder based on rules
        // console.log('clicked', id);
    };
});