angular.module('FindAParty')
  .controller('PartiesController', function($scope, $location, $routeParams, Party, User){
    //check if the user is logged in:
    User.verifyLogin($scope.storeUser);
    
    //Get new Party if in /Parties/new
    if($location.path() === '/Parties/new'){
      this.party = Party.new();
      this.party.date = moment().format("MM/DD/YYYY");
    }
    
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'mm/dd/yyyy'
    });
    
  });