angular.module('FindAParty')
  .controller('FindAPartyController', function($scope, $rootScope, $mdSidenav){
  
    console.log("\n");
    console.log("%c  You're in: '" + findAParty.channel.toUpperCase() + "' channel  ", "padding: 10px; background-color: #E8F5E9; border: 1px solid #C8E6C9; color: #388E3C");
    console.log("\n");
    
    //Define User ID:
    $scope.uid = null;
    
    //Define callback to store user information:
    $scope.storeUid = function(){
      //Store User ID:
      $scope.uid = firebase.auth().currentUser.uid;
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
    
    //Add an event listener to record the user history
    $rootScope.$on('$locationChangeStart', function(ev,n,o){
      if(n.split('#')[1] !== historyChannel[historyChannel.length-1]){
        historyChannel.push(n.split('#')[1]);
      }
    });
    
    //Define default filters for Parties search:
    $scope.partyFilters = {
      showPublic : true,
      showPrivate : false,
      dateRange : {
        from : new function(){
          this.date = moment.utc(Date.now(),'x').format('MM/DD/YYYY');
          this.toTimestamp = function(){
            return  parseInt(moment.utc(this.date,'MM/DD/YYYY').format('x'));
          }; 
        },
        to : new function(){
          this.date = moment.utc(Date.now() + 1000*60*60*24*7,'x').format('MM/DD/YYYY');
          this.toTimestamp = function(){
            return  parseInt(moment.utc(this.date,'MM/DD/YYYY').format('x')) + 1000*60*60*24 //Add 24hrs;
          }; 
        }
      }
    };
    
  });