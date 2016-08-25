angular.module('FindAParty')
  .controller('UsersController', function($scope, $location, $routeParams, $mdToast, User){
    //check if the user is logged in:
    if($location.path().substring(0,12) !== '/Users/login'){
      User.verifyLogin($scope.storeUser);
    }
    
    this.user = User.findUserById($scope.currentUser.uid);
    
    //Google Signin btn label
    this.btnGoogleSigninLabel = "Sign in with Google";
    
    //Define 'this.callGoogle':
    //Diferent logins modes when running on cordova and debbuging in browser:
    if(window.location.protocol === 'http:'){
      //running on browser
      this.callGoogle = function(){
        this.btnGoogleSigninLabel = "Please wait...";
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
        this.btnGoogleSigninLabel = "Please wait...";
        callGoogle();
      };
    }
    
    this.signout = function(){
      User.signout();
      $location.path('/Users/login/You signed out...');
    };
    
    if($routeParams.msg !== undefined){
      $mdToast.show($mdToast.simple().textContent($routeParams.msg).hideDelay(3000));
    }
    
    //Read Last login
    this.lastLogin = function(){
      var timestamp = moment($scope.currentUser.lastLogin);
      //this.lastLogin = timestamp.format("MM/DD/YYYY HH:mm");
      return timestamp.fromNow();  
    };
  });