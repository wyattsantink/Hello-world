angular.module('FindAParty')
  .factory('User', function UserFactory($location){
    return {
      verifyLogin : function(callback){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in!
            //Exec callback that stores user at $scope:
            callback();
          } else {
            // No user is signed in.
            $location.path('/Login');
          }
        }); 
      },
      logout : function(){
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }, function(error) {
          // An error happened.
        });
      }
    };
  });