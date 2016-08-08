angular.module('FindAParty')
  .controller('HomeController', function(){
    this.setMarkersCallback = function(){
      //Actually load from Party service:
      var publicParties = [
        {
          name : 'Awesome Party',
          type : 'public',
          lat : -22.8433045,
          long : -43.2628136,
          zIndex : 1
        },
        {
          name : 'Nice Party',
          type : 'public',
          lat : -22.84481,
          long : -43.2620348,
          zIndex : 2
        }
      ];
      setMarkers(publicParties);
    };
    
    this.loadMapsApi = function(callback){
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCqWrMqngMfbrwJ18PZffg10wcyQj6w4S4&callback=initMap';
      script.addEventListener('load', callback);
      document.body.appendChild(script);
      
    };
    this.loadMapsApi(this.setMarkersCallback);
    
    this.centerMap = function(){
      updateMap();
    };
  });