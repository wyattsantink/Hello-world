angular.module('FindAParty')
  .controller('HomeController', function(Party){
    this.setMarkersCallback = function(){
      //Actually load from Party service:
      var publicParties = Party.findAll();
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