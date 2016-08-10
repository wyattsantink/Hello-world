angular.module('FindAParty')
  .controller('PartiesController', function($scope, $routeParams, Party){
    $scope.partyType = "public";
    
    $scope.parties = Party.findAll();
    
    if($routeParams.id !== undefined){
      
      $scope.party = Party.find(parseInt($routeParams.id));
    }
    
  });