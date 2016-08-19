angular.module('FindAParty')
  .controller('FindAPartyController', function($scope, $mdSidenav){
    //Define callback to store user information:
    $scope.storeUser = function(){
       //$scope.currentUser = firebase.auth().currentUser;
       $scope.currentUser = {
         photoURL : '',
         displayName : '',
         email : ''
       };
       
       $scope.currentUser.photoURL = firebase.auth().currentUser.photoURL;
       $scope.currentUser.displayName = firebase.auth().currentUser.displayName;
       $scope.currentUser.email = firebase.auth().currentUser.email;
    };
    
    //Sidenav open function:
    $scope.toggleLeft = function(){
      $mdSidenav('left').toggle();
    };
    
    //Sidenav close function:
    $scope.closeLeft = function(){
      $mdSidenav('left').close();
    };
    
    //Helper function to render stars with ng-repeat:
    $scope.range = function(min, max, step) {
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) {
          input.push(i);
      }
      return input;
    };
  });