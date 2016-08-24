angular.module('FindAParty')
  .controller('FindAPartyController', function($scope, $mdSidenav){
  
    console.log("\n");
    console.log("%c  You're in: '" + findAParty.channel.toUpperCase() + "' channel  ", "padding: 10px; background-color: #E8F5E9; border: 1px solid #C8E6C9; color: #388E3C");
    console.log("\n");
    
    //Flag to control First Access:
    $scope.firstAccess = true;
    
    //Define callback to store user information:
    $scope.storeUser = function(){
       //$scope.currentUser = firebase.auth().currentUser;
       //console.log(firebase.auth().currentUser);
       $scope.currentUser = {
         uid : '',
         photoURL : '',
         displayName : '',
         email : ''
       };
       
       $scope.currentUser.uid = firebase.auth().currentUser.uid;
       $scope.currentUser.photoURL = firebase.auth().currentUser.photoURL;
       $scope.currentUser.displayName = firebase.auth().currentUser.displayName;
       $scope.currentUser.email = firebase.auth().currentUser.email;
       
       //Log user at database only in 1st access:
       if($scope.firstAccess){
         //change the flag:
         $scope.firstAccess = false;
         firebase.database().ref(findAParty.firebase.environment+'/users/' + $scope.currentUser.uid).once('value').then(function(snapshot) {
          //Check if user exists in database:
          if(snapshot.val() === null){
            //If it doesn't exist, make an insert:
            firebase.database().ref(findAParty.firebase.environment+'/users/' + $scope.currentUser.uid).set({
              photoUrl : $scope.currentUser.photoURL,
              displayName : $scope.currentUser.displayName,
              email : $scope.currentUser.email,
              bio : '',
              lastLogin : Date.now()
            });
          }else{
            //The user already exists:
            var user = snapshot.val();
            user.photoUrl = $scope.currentUser.photoURL;
            user.displayName = $scope.currentUser.displayName;
            user.email = $scope.currentUser.email;
            user.lastLogin = Date.now();
            firebase.database().ref(findAParty.firebase.environment+'/users/' + $scope.currentUser.uid).set(user);
          }
        });
       }//first access
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