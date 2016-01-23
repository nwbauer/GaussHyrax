angular.module('gaussHyrax.login', ['LoginServices'])

.controller('loginController', ['$scope', '$location','$window','UserFactory', 
  function($scope, $location, $window, UserFactory) {

  $scope.showLoginError = false;
  //login page is loading
  //delete the token if exists
  $window.localStorage.removeItem('com.hyrax');

  $scope.saveUser = function() {
    
    $scope.showLoginError = false;

    if(!$scope.user || !$scope.user.userName || !$scope.user.password){
      $scope.showLoginError = true;
      $scope.errorMessage = "Please provide a username and password."
      return;
    }

    UserFactory.saveUser($scope.user).then(function(res){
      console.log(res);
      $window.localStorage.setItem('com.hyrax',res.data['_id']);
      $location.path('/dashboard');
    },function(err){
      $scope.showLoginError = true;
      $scope.errorMessage = "Cannot create. This user already exists."
      console.log('user create failed',err);
    });
    
  }

  $scope.verifyUser = function () {
    $scope.showLoginError = false;
    if(!$scope.user || !$scope.user.userName || !$scope.user.password){
      $scope.showLoginError = true;
      $scope.errorMessage = "Please provide a username and password."
      return;
    }
    UserFactory.verifyUser($scope.user).then(function(res){
      console.log(res);
      //save user id in local storage
      $window.localStorage.setItem('com.hyrax',res.data);
      
      if(res.data.length){
        //a user profile was returned, so forward them to their dashboard
        $location.path('/dashboard');
      }
      //else no user object was returned, so keep here

    },function(err){
      $scope.showLoginError = true;
      $scope.errorMessage = "Login failed!"
      console.log('login failed',err);
    });
  }

}]);

