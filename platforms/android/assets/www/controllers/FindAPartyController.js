angular.module('FindAParty')
  .controller('FindAPartyController', function($scope, $mdSidenav){
    //Sidenav open function:
    $scope.toggleLeft = function(){
      $mdSidenav('left').toggle();
    };
    
    //Sidenav close function:
    $scope.closeLeft = function(){
      $mdSidenav('left').close();
    };
    
    //Helper function to render stars with ng-repeat:
    $scope.range = function(min, max, step) {
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) {
          input.push(i);
      }
      return input;
    };
  });