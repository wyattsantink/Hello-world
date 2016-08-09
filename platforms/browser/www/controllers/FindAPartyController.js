angular.module('FindAParty')
  .controller('FindAPartyController', function($scope,$mdSidenav){
    $scope.toggleLeft = function(){
      $mdSidenav('left').toggle();
    };
    
    $scope.closeLeft = function(){
      $mdSidenav('left').close();
    };
    
    $scope.range = function(min, max, step) {
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) {
          input.push(i);
      }
      return input;
    };
  });