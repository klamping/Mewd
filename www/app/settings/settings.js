angular.module('moodTracker')
.controller('SettingsCtrl', function($scope, $ionicPopup, $ionicPopover, $cordovaDatePicker,
    $cordovaLocalNotification, store, firebaseAuth) {
    // var firebaseAuth;

    // $scope.user = auth.getUser();

    // store.isSubscribed().then(function (subscribed) {
    //     $scope.subscribed = subscribed;
    // });

    // store.isStoreAvailable().then(function (storeAvailable) {
    //     $scope.storeAvailable = storeAvailable;
    // });

    // $ionicPopover.fromTemplateUrl('changePassword.html', {
    //     scope: $scope,
    // }).then(function (popover) {
    //     $scope.popover = popover;
    // });

    // $scope.logout = function() {
    //     auth.logout();
    // };

    // $scope.openPopover = function ($event) {
    //     $scope.popover.show($event);
    // };

    // $scope.changePassword = function (oldPw, newPw) {
    //     firebaseAuth.$changePassword($scope.user.email, oldPw, newPw)
    //     .then(function () {
    //         $scope.popover.hide();
    //         $ionicPopup.alert({
    //             title: 'Password Changed'
    //         });
    //     }, function (err) {
    //         $ionicPopup.alert({
    //             title: 'Error Changing Password',
    //             template: err
    //         });
    //     });
    // };

    // $scope.deleteAccount = function() {
    //     $scope.errMsg = '';

    //     $ionicPopup.prompt({
    //         title: 'Delete Your Account',
    //         subTitle: 'Type your account password',
    //         inputType: 'password',
    //         inputPlaceholder: 'Enter Password',
    //         okText: 'Delete',
    //         okType: 'button-assertive'
    //     }).then(function (res) {
    //         if (typeof res === 'undefined') {
    //             return false;
    //         }
    //         firebaseAuth.$removeUser($scope.user.email, res)
    //         .then(function () {
    //             $scope.logout();
    //             $ionicPopup.alert({
    //                 title: 'Account Deleted',
    //                 template: 'Thanks for trying Mewd out!'
    //             });
    //         }, function (err) {
    //             $scope.errMsg = err.message;
    //         });
    //     });
    // };

    // reminders (move to external factory or something)
    if (window.plugin) {
        // $scope.hasReminders = true;

        // $scope.fetchReminders = function () {
        //     $cordovaLocalNotification.getScheduledIds().then(function (scheduledIds) {
        //         $scope.reminders = scheduledIds;
        //     });
        // };

        // $scope.fetchReminders();

        // $scope.reminder = {
        //     time: new Date()
        // };

        // $scope.standardFrequencies = [{
        //         text: 'Never',
        //         value: ''
        //     }, {
        //         text: 'Every Minute',
        //         value: 'minutely'
        //     }, {
        //         text: 'Every Hour',
        //         value: 'hourly'
        //     }, {
        //         text: 'Every Day',
        //         value: 'daily'
        //     }, {
        //         text: 'Every Week',
        //         value: 'weekly'
        //     }
        // ];

        // $scope.reminder.repeat = '';

        // $scope.customFrequencies = [{
        //         text: 'minute(s)',
        //         value: 1
        //     }, {
        //         text: 'hour(s)',
        //         value: 60
        //     }, {
        //         text: 'day(s)',
        //         value: 1440
        //     }, {
        //         text: 'week(s)',
        //         value: 10080
        //     }
        // ];

        // $scope.reminder.type = 'standard';

        // $scope.repeat = {
        //     type: $scope.customFrequencies[0]
        // };

        // $scope.selectTime = function () {
        //     var options = {
        //         date: new Date(),
        //         mode: 'time'
        //     };

        //     $cordovaDatePicker.show(options).then(function(time){
        //         if (time.getTime() > 0) {
        //             $scope.reminder.time = new Date(time);
        //         }
        //     });
        // };

        // $cordovaLocalNotification.setDefaults({
        //     title: 'How are you feeling?',
        //     message: 'Remember to log your mood',
        //     autoCancel: true
        // });

        // $scope.addReminder = function () {
        //     var reminderId, reminderDate;

        //     if ($scope.reminder.type == 'standard') {
        //         reminderDate = $scope.reminder.time;
        //         reminderId = reminderDate.getTime();
        //     } else if ($scope.reminder.type == 'custom') {
        //         reminderId = 'Every ' + $scope.repeat.interval + ' ' + $scope.repeat.type.text;

        //         var interval = $scope.repeat.interval * $scope.repeat.type.value;

        //         // set start time
        //         reminderDate = new Date(Date.now() + (interval  * 60000));

        //         $scope.reminder.repeat = interval;
        //     }

        //     var reminderOpts = {
        //         id: reminderId,
        //         date: reminderDate
        //     };

        //     if ($scope.reminder.repeat) {
        //         reminderOpts.repeat = $scope.reminder.repeat;
        //     }

        //     if ($scope.reminder.silent) {
        //         reminderOpts.sound = null;
        //     }

        //     $cordovaLocalNotification.add(reminderOpts);
        // };

        // $scope.deleteReminder = function (id) {
        //     $cordovaLocalNotification.cancel(id);
        // };

        // window.plugin.notification.local.oncancel = function () {
        //     $scope.fetchReminders();
        // };

        // window.plugin.notification.local.onadd = function () {
        //     $ionicPopup.alert({
        //         title: 'Reminder Added'
        //     });

        //     $scope.fetchReminders();
        // };

        // window.plugin.notification.local.ontrigger = function (id, state, json) {
        //     $scope.fetchReminders();
        // };

        // window.plugin.notification.local.onclick = function (id, state, json) {
        //     // create a new reminder based on rules
        //     // console.log('clicked', id);
        // };
    }
});