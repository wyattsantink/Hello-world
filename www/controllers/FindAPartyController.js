angular.module('FindAParty')
  .controller('FindAPartyController', function($scope,$mdSidenav){
    $scope.toggleLeft = function(){
      $mdSidenav('left').toggle();
    };
    
    $scope.closeLeft = function(){
      $mdSidenav('left').close();
    };
  });