angular.module('FindAParty')
  .controller('LoginController', function($location,User){
    //Define 'this.callGoogle':
    //Diferent logins modes when running on cordova and debbuging in browser:
    if(window.location.protocol === 'http:'){
      //running on browser
      this.callGoogle = function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          //Redirects to Home
          window.location = '#/';
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      };
    }else{
      //running on cordova cli, should use google-oAuth.js
      this.callGoogle = function(){
        callGoogle();
      };
    }
  });