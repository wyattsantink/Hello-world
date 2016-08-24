angular.module('FindAParty')
  .controller('FindAPartyController', function($scope, $mdSidenav){
  
    console.log("\n");
    console.log("%c  You're in: '" + findAParty.channel.toUpperCase() + "' channel  ", "padding: 10px; background-color: #E8F5E9; border: 1px solid #C8E6C9; color: #388E3C");
    console.log("\n");
    
    //Define callback to store user information:
    $scope.storeUser = function(){
      //Define currentUser:
      $scope.currentUser = {
        uid : '',
        photoURL : '',
        displayName : '',
        email : ''
      };
       
      //Store currentUser:
      $scope.currentUser.uid = firebase.auth().currentUser.uid;
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