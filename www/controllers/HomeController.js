angular.module('FindAParty')
  .controller('HomeController', function(Party){
    this.centerMap = function(){
      centerMap();
    };
    
    this.watchMap = function(){
      if(document.getElementById('g-maps') === null){
        //Load API for the 1st time:
        var script = document.createElement('script');
        script.id = 'g-maps';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCqWrMqngMfbrwJ18PZffg10wcyQj6w4S4&callback=initMap';
        document.body.appendChild(script);
      }else{
        initMap();
      } 
    };
    this.watchMap();
  });