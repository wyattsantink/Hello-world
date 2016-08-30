angular.module('FindAParty')
  .controller('PartiesController', function($scope, $location, $routeParams, Party, User){
    //check if the user is logged in:
    User.verifyLogin($scope.storeUser);
    
    //Get new Party if in /Parties/new
    if($location.path() === '/Parties/new'){
      this.party = Party.new();
    }
    
    this.save = function(){
      //set Hoster:
      this.party.hoster = $scope.currentUser.uid;
      //set dateTime
      //join date+time+offset
      this.party.dateTimeString = this.party.date + ' ' + this.party.time + ' ' + this.party.utcOffset;
      //create timestamp
      this.party.timestamp = parseInt(moment.utc(this.party.dateTimeString, "MM/DD/YYYY HH:mm ZZ").format('x'));
      
      //save
      console.log(this.party);
    };
    
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'mm/dd/yyyy'
    });
    
    $('.timepicker').pickatime({
      autoclose: false,
      twelvehour: false
    });
    
    /*
    //var day = moment.utc("08/30/2016 20:00 -0500", "MM/DD/YYYY HH:mm ZZ");
    //var zone =  moment.tz.zone("America/Toronto");
    //var packZone = moment.tz.pack(zone);
    //var timestamp = parseInt(day.format('x'));
    
    //var unpackZone = moment.tz.unpack(packZone);
    //var load = moment(timestamp);
    //load.utcOffset("-0300");
    
    //console.log(zone);
    //console.log(unpackZone);
    //console.log(load.format("MM/DD/YYYY HH:mm"));
    
    var day = moment.utc("08/30/2016 20:00 -0500", "MM/DD/YYYY HH:mm ZZ");
    var timestamp = parseInt(day.format('x'));
    var readDay = moment(timestamp);
    readDay.utcOffset("-0500");
    console.log(readDay.format("MM/DD/YYYY HH:mm"));
    */
  });