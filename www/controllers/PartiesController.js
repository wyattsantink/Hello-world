angular.module('FindAParty')
  .controller('PartiesController', function($scope, $location, $routeParams, $http, $mdToast, Party, User){
    //check if the user is logged in:
    User.verifyLogin($scope.storeUser);
    
    //Get new Party if in /Parties/new
    if($location.path() === '/Parties/new'){
      this.party = Party.new();
    }
    
    this.getPartyErrors = function(){
      var partyErrors = [];
      
      //Party's name mustn't be blank or contain only white spaces
      if(this.party.name.length === 0 || !this.party.name.trim()){
        partyErrors.push({
          field: 'Name',
          msg : "Field Can't be blank"
        });
      }
      
      //Party's details mustn't be blank or contain only white spaces
      if(this.party.details.length === 0 || !this.party.details.trim()){
        partyErrors.push({
          field: 'Details',
          msg : "Field Can't be blank"
        });
      }
      
      //Party must contain a valid date time:
      if(this.party.startsAt.date.length === 0 || !this.party.startsAt.date.trim() || this.party.startsAt.time.length === 0 || !this.party.startsAt.time.trim()){
        partyErrors.push({
          field: 'Date/Time',
          msg : "Invalid"
        });
      }
      
      //Party must contain a valid address:
      if(!this.selectedAddress){
        partyErrors.push({
          field: 'Address',
          msg : "None Selected"
        });
      }
      
      return partyErrors;
    };
        
    this.save = function(){
      if(this.getPartyErrors().length === 0){
        //set Hoster:
        this.party.hoster = $scope.currentUser.uid;
        
        //set startsAt:
        //join date+time+offset
        this.party.startsAt.dateTimeString = this.party.startsAt.date + ' ' + this.party.startsAt.time + ' ' + this.party.startsAt.utcOffset;
        //create timestamp
        this.party.startsAt.timestamp = parseInt(moment.utc(this.party.startsAt.dateTimeString, "MM/DD/YYYY HH:mm ZZ").format('x'));
        
        //set endsAt:
        var endsAt = moment.utc(this.party.startsAt.timestamp + (1000*60*60*this.party.hours)).utcOffset(this.party.startsAt.utcOffset);
        //set party.endsAt:
        this.party.endsAt.date = endsAt.format('MM/DD/YYYY');
        this.party.endsAt.time = endsAt.format('HH:mm');
        this.party.endsAt.utcOffset = endsAt.format('ZZ');
        this.party.endsAt.dateTimeString = endsAt.format('MM/DD/YYYY HH:mm ZZ');
        this.party.endsAt.timestamp = parseInt(endsAt.format('x'));
        
        //set Party's location:
        this.party.location.address = this.selectedAddress.formatted_address;
        this.party.location.lat = this.selectedAddress.geometry.location.lat;
        this.party.location.lng = this.selectedAddress.geometry.location.lng;
        this.party.location.placeId = this.selectedAddress.place_id;
        
        //save
        Party.create(this.party);
        $location.path('/Parties/host');
        //console.log(this.party);
      }else{
        //console.log(this.getPartyErrors());
        $mdToast.show($mdToast.simple().textContent("Please, fill all the fields correctly...").position('bottom end').hideDelay(3000));
      }
      
    };
    
    this.searchAddressResults = [];
    this.selectedAddress = null;
    
    this.searchAddress = function(){
      this.searchAddressResults = [];
      this.selectedAddress = null;
      if(this.party.location.address){
        var encodedAddress = encodeURIComponent(this.party.location.address);
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress +'&key=' + findAParty.googleMaps.geocodingApiKey;
        
        var that = this;
        $http({method: 'GET',url: url}).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if(response.data.results.length === 1){
            that.selectedAddress = response.data.results[0];
          }else{
            that.searchAddressResults = response.data.results;  
          }
        }, 
        function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(response);
        });  
      }
    };
    
    this.selectAddress = function(index){
      this.selectedAddress = this.searchAddressResults[index];
      this.searchAddressResults = [];
    };
    
    this.getMap = function(){
      if(this.selectedAddress !== null){
        var mapParams = {height:500};
        return $scope.getStaticMapUrl(this.selectedAddress.geometry.location.lat, this.selectedAddress.geometry.location.lng, mapParams);
      }
    };
    
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      close: 'Done',
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
    
    var dayInRJ = moment.utc("08/31/2016 18:00 -0300", "MM/DD/YYYY HH:mm ZZ");
    var dayInCH = moment.utc("08/31/2016 16:00 -0500", "MM/DD/YYYY HH:mm ZZ");
    
    console.log(dayInRJ.format('x'));
    console.log(dayInCH.format('x'));
    */
  });