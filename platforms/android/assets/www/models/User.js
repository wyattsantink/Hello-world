angular.module('FindAParty')
  .factory('User', function UserFactory($location){
    return {
      verifyLogin : function(){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
          } else {
            // No user is signed in.
            $location.path('/Login');
          }
        });
      }
    };
  });