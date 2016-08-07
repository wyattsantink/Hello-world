//Map:
var map;
//User's location Marker:
var myLocationMarker;

//User fine tuning response
var geoOptions = {
  enableHighAccuracy : true, 
  maximumAge : 0, 
  timeout : 60000
};

//Callback when map loaded:
function hideSpinner(){
  document.getElementById("load-spinner").style.display = 'none';
}

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
    zoom: 18
  });
  
  //Mark user's location:
  myLocationMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "You're Here!"
  });
  
  google.maps.event.addListenerOnce(map, 'tilesloaded', hideSpinner);
}

//Error callback
function setNoLocation(err){
  //handle error...  
  console.error('ERROR(' + err.code + '): ' + err.message);
}

//Success callback for centering the map
function setMapAtCenter(position){
  google.maps.event.addListener(map, 'center_changed', hideSpinner);
  var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
  myLocationMarker.setPosition(myLatLng);
  map.setCenter(myLatLng);
}

//Callback for loading Google Maps API
function initMap(){
  navigator.geolocation.getCurrentPosition(setCurrentLocation, setNoLocation, geoOptions);
}

//Update location
function updateMap(){
  document.getElementById("load-spinner").style.display = 'flex';
  navigator.geolocation.getCurrentPosition(setMapAtCenter, setNoLocation, geoOptions);
}