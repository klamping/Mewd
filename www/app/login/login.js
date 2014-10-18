angular.module('moodTracker')
.controller('LoginCtrl', function($scope, $rootScope, $firebase, $firebaseSimpleLogin, firebaseRoot, $state) {
  // Get a reference to the Firebase
  var firebaseRef = new Firebase(firebaseRoot);
  // Create a Firebase Simple Login object
  $scope.auth = $firebaseSimpleLogin(firebaseRef);
  // Initially set no user to be logged in
  $rootScope.user = null;
  // Logs a user in with inputted provider
  $scope.login = function(provider) {
    $scope.auth.$login(provider);
  };
  // Logs a user out
  $scope.logout = function() {
    $scope.auth.$logout();
  };
  // Upon successful login, set the user object
  $rootScope.$on('$firebaseSimpleLogin:login', function(event, user) {
    $rootScope.user = user;
    $state.go('tabs');
  });
  // Upon successful logout, reset the user object
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.user = null;
  });
  // Log any login-related errors to the console
  $rootScope.$on('$firebaseSimpleLogin:error', function(event, error) {
    console.log('Error logging user in: ', error);
  });

  // Upon successful logout, reset the user object and clear cookies
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.user = null;
    if (window.cookies) {
      window.cookies.clear();
    }
  });
});