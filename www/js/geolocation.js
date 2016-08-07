//Map
var map;

//User fine tuning response
var geoOptions = {
  enableHighAccuracy : true, 
  maximumAge : 30000, 
  timeout : Infinity
};

//Position Id:
var wpid;

//Success Calback
function setCurrentLocation(position){
  //User's position:
  var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
  
  //Create Map:  
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    scrollwheel: false,
    streetViewControl: false,
    zoomControl : false,
    mapTypeControl : false,
    zoom: 16
  });
  
  //Mark user's location:
  var myLocationMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "You're Here!"
  });
  
  navigator.geolocation.clearWatch(wpid);
}

//Error callback
function setNoLocation(){
  //handle error...  
}

//Callback for loading Google Maps API
function initMap(){
  wpid = navigator.geolocation.watchPosition(setCurrentLocation, setNoLocation, geoOptions);
}

