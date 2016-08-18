angular.module('FindAParty')
  .factory('User', function UserFactory($location){
    return {
      verifyLogin : function(callback){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
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