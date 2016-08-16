angular.module('FindAParty')
  .controller('LoginController', function($location,User){
    if(User.verifyLogin()){
      $location.path('/');
    }
  });