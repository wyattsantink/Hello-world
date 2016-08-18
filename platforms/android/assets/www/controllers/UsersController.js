angular.module('FindAParty')
  .controller('UsersController', function($scope, $location, User){
    //check if the user is logged in:
    User.verifyLogin(function(){
      $scope.currentUser = firebase.auth().currentUser;
    });
    
    this.logout = function(){
      User.logout();
      $location.path('/Login/You logged out...');
    };
  });