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
      
      // Create an array of styles:
      var styles = [
        {
          featureType: "all",
          stylers: [
            { "saturation": -100 }
          ]
        }
      ];
      
      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
      
      //Create a new Map:
      map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        streetViewControl: false,
        zoomControl : false,
        mapTypeControl : false,
        zoom: 12,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      });
      
      //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');
  
      //User's location marker image:
      var image = 'img/markers/user-location.png';
      
      //Mark the user's location:
      myLocationMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon : image,
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
