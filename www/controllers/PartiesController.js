angular.module('FindAParty')
  .controller('PartiesController', function($scope, $location, $routeParams, Party, User){
    //check if the user is logged in:
    User.verifyLogin($scope.storeUser);
    
    //Get new Party if in /Parties/new
    if($location.path() === '/Parties/new'){
      this.party = Party.new();
    }
    
  });