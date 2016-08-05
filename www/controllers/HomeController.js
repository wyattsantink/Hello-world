angular.module('FindAParty')
  .controller('HomeController', function(){
    this.loadMapsApi = function(){
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCqWrMqngMfbrwJ18PZffg10wcyQj6w4S4&callback=initMap';
      document.body.appendChild(script);
    };
    this.loadMapsApi();
  });