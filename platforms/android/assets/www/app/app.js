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

   return $firebase(ref);
})
.controller("HistoryCtrl", function($scope, $firebase, moodRecord, $ionicPopup) {
  $scope.moods = moodRecord.$asObject();
})
.controller("RecordCtrl", function($scope, $firebase, moodRecord, $ionicPopup) {
  $scope.setMood = function (mood) {
    var name = mood.name;
    $ionicPopup.confirm({
      title: 'Feeling ' + name + '?',
      okText: 'Yep',
      cancelText: 'Nope'
    }).then(function (hasConfirmed) {
      if (hasConfirmed) {
        console.log(name);
        moodRecord.$asArray().$add({
          mood: name,
          time: Date.now()
        });
      }
    });
  };

  $scope.moods = [{
        positive: true,
        name: 'Accepted'
    }, {
        positive: true,
        name: 'Accomplished'
    }, {
        positive: false,
        name: 'Aggravated'
    }, {
        positive: false,
        name: 'Alone'
    }, {
        positive: true,
        name: 'Amused'
    }, {
        positive: false,
        name: 'Angry'
    }, {
        positive: false,
        name: 'Annoyed'
    }, {
        positive: false,
        name: 'Anxious'
    }, {
        positive: false,
        name: 'Apathetic'
    }, {
        positive: false,
        name: 'Ashamed'
    }, {
        positive: false,
        name: 'Bewildered'
    }, {
        positive: false,
        name: 'Bitchy'
    }, {
        positive: true,
        name: 'Bittersweet'
    }, {
        positive: false,
        name: 'Blah'
    }, {
        positive: true,
        name: 'Blissful'
    }, {
        positive: false,
        name: 'Bored'
    }, {
        positive: true,
        name: 'Bouncy'
    }, {
        positive: false,
        name: 'Bummed'
    }, {
        positive: true,
        name: 'Calm'
    }, {
        positive: true,
        name: 'Cheerful'
    }, {
        positive: true,
        name: 'Complacent'
    }, {
        positive: false,
        name: 'Confused'
    }, {
        positive: true,
        name: 'Content'
    }, {
        positive: false,
        name: 'Cranky'
    }, {
        positive: false,
        name: 'Crappy'
    }, {
        positive: false,
        name: 'Crazy'
    }, {
        positive: false,
        name: 'Crushed'
    }, {
        positive: true,
        name: 'Curious'
    }, {
        positive: false,
        name: 'Cynical'
    }, {
        positive: false,
        name: 'Depressed'
    }, {
        positive: true,
        name: 'Determined'
    }, {
        positive: false,
        name: 'Dirty'
    }, {
        positive: false,
        name: 'Disappointed'
    }, {
        positive: false,
        name: 'Discontent'
    }, {
        positive: true,
        name: 'Dorky'
    }, {
        positive: false,
        name: 'Drained'
    }, {
        positive: true,
        name: 'Drunk'
    }, {
        positive: true,
        name: 'Ecstatic'
    }, {
        positive: true,
        name: 'Energetic'
    }, {
        positive: false,
        name: 'Enraged'
    }, {
        positive: true,
        name: 'Enthralled'
    }, {
        positive: false,
        name: 'Envious'
    }, {
        positive: true,
        name: 'Excited'
    }, {
        positive: false,
        name: 'Exhausted'
    }, {
        positive: true,
        name: 'Flirty'
    }, {
        positive: false,
        name: 'Frustrated'
    }, {
        positive: true,
        name: 'Geeky'
    }, {
        positive: true,
        name: 'Giddy'
    }, {
        positive: false,
        name: 'Gloomy'
    }, {
        positive: true,
        name: 'Good'
    }, {
        positive: true,
        name: 'Grateful'
    }, {
        positive: false,
        name: 'Groggy'
    }, {
        positive: false,
        name: 'Grumpy'
    }, {
        positive: false,
        name: 'Guilty'
    }, {
        positive: true,
        name: 'Happy'
    }, {
        positive: true,
        name: 'High'
    }, {
        positive: true,
        name: 'Hopeful'
    }, {
        positive: false,
        name: 'Hungry'
    }, {
        positive: true,
        name: 'Hyper'
    }, {
        positive: false,
        name: 'Impatient'
    }, {
        positive: true,
        name: 'Impressed'
    }, {
        positive: false,
        name: 'Indifferent'
    }, {
        positive: false,
        name: 'Infuriated'
    }, {
        positive: false,
        name: 'Irate'
    }, {
        positive: false,
        name: 'Irritated'
    }, {
        positive: false,
        name: 'Jealous'
    }, {
        positive: true,
        name: 'Jubilant'
    }, {
        positive: false,
        name: 'Lazy'
    }, {
        positive: true,
        name: 'Loved'
    }, {
        positive: false,
        name: 'Mad'
    }, {
        positive: false,
        name: 'Mellow'
    }, {
        positive: true,
        name: 'Mischievous'
    }, {
        positive: false,
        name: 'Moody'
    }, {
        positive: true,
        name: 'Naughty'
    }, {
        positive: false,
        name: 'Numb'
    }, {
        positive: true,
        name: 'Okay'
    }, {
        positive: true,
        name: 'Optimistic'
    }, {
        positive: true,
        name: 'Peaceful'
    }, {
        positive: false,
        name: 'Pessimistic'
    }, {
        positive: false,
        name: 'Pissed off'
    }, {
        positive: true,
        name: 'Pleased'
    }, {
        positive: true,
        name: 'Refreshed'
    }, {
        positive: false,
        name: 'Rejected'
    }, {
        positive: true,
        name: 'Rejuvenated'
    }, {
        positive: true,
        name: 'Relaxed'
    }, {
        positive: true,
        name: 'Relieved'
    }, {
        positive: false,
        name: 'Restless'
    }, {
        positive: false,
        name: 'Rushed'
    }, {
        positive: false,
        name: 'Sad'
    }, {
        positive: true,
        name: 'Satisfied'
    }, {
        positive: false,
        name: 'Shocked'
    }, {
        positive: false,
        name: 'Sick'
    }, {
        positive: true,
        name: 'Silly'
    }, {
        positive: true,
        name: 'Sleepy'
    }, {
        positive: true,
        name: 'Smart'
    }, {
        positive: false,
        name: 'Stressed'
    }, {
        positive: true,
        name: 'Surprised'
    }, {
        positive: true,
        name: 'Sympathetic'
    }, {
        positive: true,
        name: 'Thankful'
    }, {
        positive: false,
        name: 'Tired'
    }, {
        positive: true,
        name: 'Touched'
    }, {
        positive: false,
        name: 'Uncomfortable'
    }, {
        positive: false,
        name: 'Weird'
    }];
})
// .controller("loginCtrl", function($scope, $rootScope, $firebase, $firebaseSimpleLogin) {
//   // Get a reference to the Firebase
//   // TODO: Replace "ionic-demo" below with the name of your own Firebase
//   var firebaseRef = new Firebase("https://ionic-demo.firebaseio.com/");
//   // Create a Firebase Simple Login object
//   $scope.auth = $firebaseSimpleLogin(firebaseRef);
//   // Initially set no user to be logged in
//   $scope.user = null;
//   // Logs a user in with inputted provider
//   $scope.login = function(provider) {
//     $scope.auth.$login(provider);
//   };
//   // Logs a user out
//   $scope.logout = function() {
//     $scope.auth.$logout();
//   };
//   // Upon successful login, set the user object
//   $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
//     $scope.user = user;
//   });
//   // Upon successful logout, reset the user object
//   $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
//     $scope.user = null;
//   });
//   // Log any login-related errors to the console
//   $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
//     console.log("Error logging user in: ", error);
//   });
// });