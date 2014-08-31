angular.module('moodTracker', ['ionic', 'firebase'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.factory("moodRecord", function($firebase, $rootScope) {
   var ref = new Firebase("https://moodie.firebaseio.com/moods");

   return $firebase(ref).$asArray();
})
.controller("RecordCtrl", function($scope, $firebase, moodRecord, $ionicPopup) {
  $scope.setMood = function (mood) {
    $ionicPopup.confirm({
      title: 'Feeling ' + mood + '?',
      okText: 'Yep',
      cancelText: 'Nope'
    }).then(function (hasConfirmed) {
      if (hasConfirmed) {
        moodRecord.$add({
          mood: mood,
          time: Date.now()
        });
      }
    });
  };

  $scope.moods = ['Accepted', 'Accomplished', 'Aggravated', 'Alone', 'Amused', 'Angry', 'Annoyed', 'Anxious', 'Apathetic', 'Ashamed', 'Bewildered', 'Bitchy', 'Bittersweet', 'Blah', 'Blissful', 'Bored', 'Bouncy', 'Bummed', 'Calm', 'Cheerful', 'Complacent', 'Confused', 'Content', 'Cranky', 'Crappy', 'Crazy', 'Crushed', 'Curious', 'Cynical', 'Depressed', 'Determined', 'Dirty', 'Disappointed', 'Discontent', 'Dorky', 'Drained', 'Drunk', 'Ecstatic', 'Energetic', 'Enraged', 'Enthralled', 'Envious', 'Excited', 'Exhausted', 'Flirty', 'Frustrated', 'Geeky', 'Giddy', 'Gloomy', 'Good', 'Grateful', 'Groggy', 'Grumpy', 'Guilty', 'Happy', 'High', 'Hopeful', 'Hungry', 'Hyper', 'Impressed', 'Indifferent', 'Infuriated', 'Irate', 'Irritated', 'Jealous', 'Jubilant', 'Lazy', 'Lethargic', 'Lonely', 'Loved', 'Mad', 'Melancholy', 'Mellow', 'Mischievous', 'Moody', 'Naughty', 'Numb', 'Okay', 'Optimistic', 'Peaceful', 'Pessimistic', 'Pissed off', 'Pleased', 'Refreshed', 'Rejected', 'Rejuvenated', 'Relaxed', 'Relieved', 'Restless', 'Rushed', 'Sad', 'Satisfied', 'Shocked', 'Sick', 'Silly', 'Sleepy', 'Smart', 'Stressed', 'Surprised', 'Sympathetic', 'Thankful', 'Tired', 'Touched', 'Uncomfortable', 'Weird'];
});