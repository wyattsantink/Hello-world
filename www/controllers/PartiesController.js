angular.module('FindAParty')
  .controller('PartiesController', function($scope, $routeParams, Party){
    window.scroll(0,1);
    
    $scope.partyType = "public";
    
    $scope.parties = Party.findAll();
    
    if($routeParams.id !== undefined){
      
      $scope.party = Party.find(parseInt($routeParams.id));
    }
    
    $scope.date = new Date();
    
    $scope.getStaticMapUrl = function(location){
      var url = "https://maps.googleapis.com/maps/api/staticmap?";
      
      url += "center="+location.lat+","+location.lng+"&";
      url += "zoom=16&";
      url += "size=500x125&";
      url += "scale=2&";
      url += "markers="+location.lat+","+location.lng;
      url += "&key=AIzaSyCqWrMqngMfbrwJ18PZffg10wcyQj6w4S4";
      
      return url;
    };
    
  });