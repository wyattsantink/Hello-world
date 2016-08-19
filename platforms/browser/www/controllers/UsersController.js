angular.module('FindAParty')
  .controller('UsersController', function($scope, $location, User){
    //check if the user is logged in:
    User.verifyLogin($scope.storeUser);
    
    this.logout = function(){
      User.logout();
      $location.path('/Login/You signed out...');
    };
  });