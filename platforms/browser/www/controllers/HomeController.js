angular.module('FindAParty')
  .controller('HomeController', function($location, $scope, User){
    //check if the user is logged in:
    User.verifyLogin($scope.storeUid);
    
    //Log an event using Analytics:
    if(window.FirebasePlugin){
      window.FirebasePlugin.logEvent("page_view", {page: $location.path()});
    }
    
    
    this.centerMap = function(){
      centerMap();
    };
    
    this.watchMap = function(){
      if(document.getElementById('g-maps') === null){
        //Load API for the 1st time:
        var script = document.createElement('script');
        script.id = 'g-maps';
        script.src = 'https://maps.googleapis.com/maps/api/js?key='+findAParty.googleMaps.javascriptApiKey+'&callback=initMap';
        document.body.appendChild(script);
      }else{
        initMap();
      } 
    };
    this.watchMap();
  });