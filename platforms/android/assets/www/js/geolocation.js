//Home screen's map:
var map; 

//Use fine tuning response:
var geoOptions = {
  enableHighAccuracy : true, 
  maximumAge : 0, 
  timeout : 60000
};

//User's location marker
var myLocationMarker;

//Callback after append g-maps script:
function initMap(){
  navigator.geolocation.getCurrentPosition(
    function(pos){
      //success callback:
      //Get location:
      var myLatLng = {
        lat : pos.coords.latitude,
        lng : pos.coords.longitude
      };
      //Create a new Map:
      map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        streetViewControl: false,
        zoomControl : false,
        mapTypeControl : false,
        zoom: 16
      });
      //Mark the user's location:
      myLocationMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "You're Here!"
      });
      //Stop spinning wheel after creating map:
      google.maps.event.addListenerOnce(map, 'tilesloaded',function(){
        document.getElementById("load-spinner").style.display = 'none';
      });
    },
    function(err){
      //error callback:
    },
    geoOptions
  );
}

//Center the Map with updated location:
function centerMap(){
  //Start spinning wheel:
  document.getElementById("load-spinner").style.display = 'flex';
  navigator.geolocation.getCurrentPosition(
    function(pos){
      //success callback:
      //Get location:
      var myLatLng = {
        lat : pos.coords.latitude,
        lng : pos.coords.longitude
      };
      //Stop spinning wheel:
      google.maps.event.addListener(map, 'center_changed', function(){
        document.getElementById("load-spinner").style.display = 'none';
      });
      //Set the new center:
      map.setCenter(myLatLng);
      //Update the user's location marker:
      myLocationMarker.setPosition(myLatLng);
    },
    function(err){
      //error callback:
      document.getElementById("load-spinner").style.display = 'none';
    },
    geoOptions
  );  
}
