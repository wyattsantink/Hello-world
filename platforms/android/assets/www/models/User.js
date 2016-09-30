angular.module('FindAParty')
  .factory('User', function UserFactory($location, $firebaseObject, $firebaseArray, $mdToast){
    return {
      verifyLogin : function(callback){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in!
            //Log User:
            //Log user at database only in 1st access after signing in:
            if(findAParty.firstAccessFlag){
              //change the flag:
              findAParty.firstAccessFlag = false;
              firebase.database().ref(findAParty.firebase.environment+'/users/' + user.uid).once('value').then(function(snapshot) {
                //Check if user exists in database:
                if(snapshot.val() === null){
                  //If it doesn't exist, make an insert:
                  firebase.database().ref(findAParty.firebase.environment+'/users/' + user.uid).set({
                    photoUrl : user.photoURL,
                    displayName : user.displayName,
                    email : user.email,
                    bio : '',
                    lastLogin : Date.now()
                  });
                }else{
                  //The user already exists:
                  var currentUser = snapshot.val();
                  currentUser.photoUrl = user.photoURL;
                  currentUser.displayName = user.displayName;
                  currentUser.email = user.email;
                  currentUser.lastLogin = Date.now();
                  firebase.database().ref(findAParty.firebase.environment+'/users/' + user.uid).set(currentUser);
                }
              });
              //Exec callback that stores user ID at $scope:
              callback();
            }//first access
          } else {
            // No user is signed in.
            $location.path('/Users/login');
          }
        }); 
      },
      
      signout : function(){
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          findAParty.firstAccessFlag = true;
        }, function(error) {
          // An error happened.
        });
      },
      
      findById : function(id){
        var ref = firebase.database().ref(findAParty.firebase.environment+'/users/' + id);
        return $firebaseObject(ref);
      },
      
      update : function(user){
        user.$save().then(function(){
          $mdToast.show($mdToast.simple().textContent('Data Saved!').hideDelay(3000));
        });
      },
      
      favoriteParty : function(userId,partyId,favorite){
        var ref = firebase.database().ref(findAParty.firebase.environment+'/users-favorite/'+userId+'/'+partyId);
        var isFavorite = $firebaseObject(ref);
        if(favorite){
          isFavorite.favorite = true;
          isFavorite.$save();
        }else{
          isFavorite.$remove();
        }
      },
      
      findFavoritesFrom : function(userId){
        //Displays the loading bar:
        if(document.getElementById('parties-loading')){document.getElementById('parties-loading').style.display = 'block';}
        
        var ref = firebase.database().ref(findAParty.firebase.environment + '/users-favorite/' + userId);
        var favorites = $firebaseArray(ref);
        
        favorites.$watch(function(ev){
          var partyRef = firebase.database().ref(findAParty.firebase.environment + '/parties/' + ev.key);
          var party = $firebaseObject(partyRef);
          
          favorites[favorites.$indexFor(ev.key)].party = party;
        });
        
        favorites.$loaded().then(function(){
          //Hides the loading bar:
          if(document.getElementById('parties-loading')){document.getElementById('parties-loading').style.display = 'none';}
        });
        
        return favorites;
      },
      
      listenOnFavorite : function(userId,partyId,callback){
        var ref = firebase.database().ref(findAParty.firebase.environment+'/users-favorite/'+userId+'/'+partyId);
        var usersFavorite = $firebaseObject(ref);
        usersFavorite.$watch(function(){
          callback(usersFavorite.favorite);
        });
        return usersFavorite;
      }
    };
  });