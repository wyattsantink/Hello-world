angular.module('FindAParty')
  .controller('HomeController', function($location, $scope, Party, User){
    //check if the user is logged in:
    User.verifyLogin($scope.storeUid);
    
    //send page view to GA:
    if(window.ga){
      window.ga.trackView('Home');
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
    
    this.addPartiesMarkers = function(){
      this.addMarker = function(id){
        var party = Party.findById(id);
        party.$loaded().then(function(data){
          //Filtering...
          //Filter Date range:
          var from = parseInt(moment.utc(moment.utc(Date.now(),'x').format('MM/DD/YYYY'),'MM/DD/YYYY').format('x')); //today
          var to = from + (1000*60*60*24*30); //+1 month
          if( (party.startsAt.timestamp >= from) && (party.startsAt.timestamp <= to) ){
            //Filter parties that haven't finished yet:
            if( party.endsAt.timestamp > Date.now() ){
              //Filter 'type'
              if(party.type === 'public'){
                markParty(party);
              }//type  
            }//endsAt  
          }//Date Range
        });
      };
      
      this.deleteMarker = function(){};
      
      var mapCenter = map.getCenter();
      
      Party.findByLocation(mapCenter.lat(), mapCenter.lng(), this.addMarker, this.deleteMarker);
    };
    setTimeout(this.addPartiesMarkers, 3000);
    
    this.searchThisLocation = function(){
      document.getElementById('search-parties-box').style.display = "none";
      cleanMarkers();
      this.addPartiesMarkers();
      setCurrentMapCenter();
    };
    
  });