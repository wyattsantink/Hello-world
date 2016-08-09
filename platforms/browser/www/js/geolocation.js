//Map:
var map;
//User's location Marker:
var myLocationMarker;

//Parties Markers:
var partiesMarkers;

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
    zoom: 16
  });
  
  //Mark user's location:
  myLocationMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "You're Here!"
  });
 
  //Mark parties 
  var image = {
    url: 'img/markers/public-party.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16,16)
  };
  
  for(var i=0; i < partiesMarkers.length; i++){
    var marker = partiesMarkers[i];
    
    //Temporary here, should be able to receive only public parties data
    if(marker.type === 'public'){
      var mapMarker = new  google.maps.Marker({
        position: marker.location,
        map : map,
        icon : image,
        zIndex : (i+1)
      });  
    }
  }
  
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

//Add markers:
function setMarkers(markers){
  partiesMarkers = markers;
}