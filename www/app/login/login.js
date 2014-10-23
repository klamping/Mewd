angular.module('moodTracker')
.controller('LoginCtrl', function($scope, $rootScope, $state) {
  if ($rootScope.user !== null) {
      $state.go('tabs.views');
  }

  // Logs a user in with inputted provider
  $scope.login = function(provider) {
      $rootScope.auth.$login(provider);
  };

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