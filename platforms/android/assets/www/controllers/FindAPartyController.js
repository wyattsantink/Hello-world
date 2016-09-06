angular.module('FindAParty')
  .controller('FindAPartyController', function($scope, $mdSidenav){
  
    console.log("\n");
    console.log("%c  You're in: '" + findAParty.channel.toUpperCase() + "' channel  ", "padding: 10px; background-color: #E8F5E9; border: 1px solid #C8E6C9; color: #388E3C");
    console.log("\n");
    
    //Define currentUser:
    $scope.currentUser = {
      uid : '',
      photoURL : '',
      displayName : '',
      email : '',
      lastLogin : ''
    };
    
    //Define callback to store user information:
    $scope.storeUser = function(){
      
      //Store currentUser:
      $scope.currentUser.uid = firebase.auth().currentUser.uid;
      $scope.currentUser.photoURL = firebase.auth().currentUser.photoURL;
      $scope.currentUser.displayName = firebase.auth().currentUser.displayName;
      $scope.currentUser.email = firebase.auth().currentUser.email;
      $scope.currentUser.lastLogin = Date.now();
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
    
    //get a static map URL:
    $scope.getStaticMapUrl = function(lat,lng,mapParams){
      var url = "https://maps.googleapis.com/maps/api/staticmap";
      
      var zoom = mapParams.zoom || 16;
      var width = mapParams.width || 500;
      var height = mapParams.height || 125;
      var scale = mapParams.scale || 2;
      
      url += "?center=" + lat + "," + lng;
      url += "&zoom=" + zoom;
      url += "&size=" + width + "x" + height;
      url += "&scale=" + scale;
      url += "&markers=" + lat + "," + lng;
      url += "&key=" + findAParty.googleMaps.javascriptApiKey;
      
      return url;
    };
    
    this.timestampToCalendar = function(timestamp,utcOffset){
      return moment.utc(timestamp,"x").utcOffset(utcOffset).calendar(null,{sameElse : 'MM/DD/YYYY HH:mm'});
    };
    
    this.timestampToFormated = function(timestamp,utcOffset){
      return moment.utc(timestamp,"x").utcOffset(utcOffset).format('MM/DD/YYYY HH:mm');
    };
    
  });