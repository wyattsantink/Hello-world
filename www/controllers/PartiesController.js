angular.module('FindAParty')
  .controller('PartiesController', function($scope, Party){
    $scope.partyType = "public";
    
    $scope.parties = Party.findAll();
  });