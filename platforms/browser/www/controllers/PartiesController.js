angular.module('FindAParty')
  .controller('PartiesController', function($scope, $location, $routeParams, $http, $mdToast, $mdDialog, Party, User){
    //Fix Scroll to top
    document.getElementById('mdcontent').scrollTop = 0;
    
    //check if the user is logged in:
    User.verifyLogin($scope.storeUid);
    
    //Get new Party if in /Parties/new
    if($location.path() === '/Parties/new'){
      this.party = Party.new();
    }
    
    if($location.path().substring(0,16) === '/Parties/history'){
      this.parties = Party.findByUser($scope.uid);
      
      this.displayActiveParties = ($routeParams.isActive === 'true');
      this.now = Date.now();
    }
    
    if($routeParams.id !== undefined){
      this.party = Party.findById($routeParams.id);
      
      //register a listener to party invitation changes
      $scope.invitationStatus = 501; //not implemented
      this.setInvitationStatus = function(status){
        $scope.invitationStatus = status;
      };
      this.unlistenOnInvitation = Party.listenOnInvitation(this.party.$id,$scope.uid,this.setInvitationStatus);
      
      //asks for invitation
      this.inviteMe = function(){
        Party.createInvitation(this.party.$id,$scope.uid);
        $mdToast.show($mdToast.simple().textContent("Successfully Requested!").position('bottom end').hideDelay(3000));
      };
      
      var that = this;
      this.party.$loaded().then(function(data){
        //Enable the edit button:
        that.partyIsEditable = that.party.endsAt.timestamp > Date.now();
        //set the page's selected address:
        that.searchAddress();
        
        //If in /Parties/show, also loads the hoster information:
        if($location.path().substring(0,13) === '/Parties/show'){
          //Get Party's hoster info:
          that.party.hoster = User.findById(that.party.hoster);
          
          //Favorite Parties functions:
          that.favoriteParty = function(){
            if(!$scope.isFavorite){
              $mdToast.show($mdToast.simple().textContent("Added to Favorites").position('bottom end').hideDelay(3000));
            }else{
              $mdToast.show($mdToast.simple().textContent("Removed from Favorites").position('bottom end').hideDelay(3000));
            }
            User.favoriteParty($scope.uid,that.party.$id,!$scope.isFavorite);
          };
          
          that.setFavorite = function(value){
            if(value){
              $scope.isFavorite = true;
            }else{
              $scope.isFavorite = false;
            }
          };
          that.unlistenOnFavorite = User.listenOnFavorite($scope.uid,that.party.$id,that.setFavorite);

        }
        
        //If in /Parties/dashboard, load a list of invitiations
        if($location.path().substring(0,18) === '/Parties/dashboard'){
          that.party.invitations = Party.findInvitations(that.party.$id);
          
          that.confirmInvitation = function(invitation){
            Party.updateInvitation(that.party.$id,invitation.user.$id,true);
          };
          
          that.refuseInvitation = function(invitation){
            Party.updateInvitation(that.party.$id,invitation.user.$id,false);
          };
        }
      });
    }
    
    if($location.path() === '/Parties'){
      //Need to define parties in $scope in order to be readable at GeoFire callback:
      $scope.parties = [];
      
      //Define a callback function that will receive the keys
      //found by GeoFire and add to this.parties
      this.addParty = function(id){
        var party = Party.findById(id);
        party.$loaded().then(function(data){
          //Filtering...
          //Filter Date range:
          var from = $scope.partyFilters.dateRange.from.toTimestamp();
          var to = $scope.partyFilters.dateRange.to.toTimestamp();
          if( (party.startsAt.timestamp >= from) && (party.startsAt.timestamp <= to) ){
            //Filter parties that haven't finished yet:
            if( party.endsAt.timestamp > Date.now() ){
              //Filter 'type'
              if( ($scope.partyFilters.showPublic && party.type==='public') || ($scope.partyFilters.showPrivate && party.type==='private') ){
                $scope.parties.unshift(party);  
              }//type  
            }//endsAt  
          }//Date Range
          
          //Sort parties by timestamp, recent ones come 1st
          $scope.parties.sort(function(a,b){
            return a.startsAt.timestamp - b.startsAt.timestamp;
          });
        });
      };
      
      //Define a callback function that will receive keys
      //to be removed from parties' array
      this.deleteParty = function(id){
        for(var i=0; i < $scope.parties.length; i++){
          if($scope.parties[i].$id === id){
            $scope.parties.splice(i,1);
            break;
          }
        }
      };
      
      //Check if there's an address to filter
      if($scope.partyFilters.selectedAddress !== null){
        Party.findByLocation($scope.partyFilters.selectedAddress.geometry.location.lat, $scope.partyFilters.selectedAddress.geometry.location.lng, this.addParty, this.deleteParty);
      }else{
        //if there's not, load parties with the user's location:
        Party.findByLocation(findAParty.userLocation.lat, findAParty.userLocation.lng, this.addParty, this.deleteParty);
      }
      
      //[Bug-workaround]
      //The progress bar doesn't get hidden when changing from Home->index to Parties->index
      //set-up a 0.5s delay to force hidding it:
      setTimeout(function(){
        if(document.getElementById('parties-loading')){document.getElementById('parties-loading').style.display = 'none';}
      }, 500);
      
      this.clearSelectedAddress = function(){
        $scope.partyFilters.selectedAddress = null;
        //Reload parties:
        $scope.parties = [];
        Party.findByLocation(findAParty.userLocation.lat, findAParty.userLocation.lng, this.addParty, this.deleteParty);
      };
    }
    
    if($location.path() === '/Parties/favorite'){
      this.favorites = User.findFavoritesFrom($scope.uid);
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
        this.party.hoster = $scope.uid;
        
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
        $location.path('/Parties/history/true');
        //console.log(this.party);
      }else{
        //console.log(this.getPartyErrors());
        $mdToast.show($mdToast.simple().textContent("Please, fill all the fields correctly...").position('bottom end').hideDelay(3000));
      }
      
    };
    
    this.edit = function(){
      if(this.getPartyErrors().length === 0){
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
        
        //edit
        Party.update(this.party);
        $location.path('/Parties/dashboard/'+this.party.$id);
        //console.log(this.party);
      }else{
        //console.log(this.getPartyErrors());
        $mdToast.show($mdToast.simple().textContent("Please, fill all the fields correctly...").position('bottom end').hideDelay(3000));
      }
      
    };
    
    this.confirmRemove = function(ev,party,redirect){
      this.party = party;
      
      this.redirect = redirect;
      
      var that = this;
      $mdDialog.show({
        controller : function DialogController($mdDialog){
          this.close = function(ac){
            $mdDialog.hide(ac);
          };
        },
        controllerAs : 'DialogCtrl',
        templateUrl: 'templates/confirm-remove-party.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(ac){
        if(ac === 'delete'){
          that.remove();
        }
      }, function() {
        //clicked outside
      });
    };
    
    this.remove = function(){
      //console.log(this.parties);
      Party.delete(this.party, this.parties);
      if(this.redirect) $location.path(this.redirect);
    };
    
    this.searchAddressResults = [];
    this.selectedAddress = null;
    this.mapParams = {height:500};
    
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
        return $scope.getStaticMapUrl(this.selectedAddress.geometry.location.lat, this.selectedAddress.geometry.location.lng, this.mapParams);
      }
    };
    
    if($location.path().substring(0,15) === '/Parties/search'){
      //Redefine searchAddress to use in /Parties/search
      this.searchAddress = function(){
        this.searchAddressResults = [];
        this.selectedAddress = null;
        $scope.partyFilters.selectedAddress = null;
        
        if($scope.partyFilters.query){
          var encodedAddress = encodeURIComponent($scope.partyFilters.query);
          var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress +'&key=' + findAParty.googleMaps.geocodingApiKey;
          
          var that = this;
          $http({method: 'GET',url: url}).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(response.data.results.length === 1){
              that.selectedAddress = response.data.results[0];
              $scope.partyFilters.selectedAddress = response.data.results[0];
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
      
      //Redifine selectAddress to use in /Parties/search
      this.selectAddress = function(index){
        this.selectedAddress = this.searchAddressResults[index];
        $scope.partyFilters.selectedAddress = this.searchAddressResults[index];
        this.searchAddressResults = [];
      };
      
      this.mapParams.zoom = 12;
      
      //See if the user has passed a query param:
      if($routeParams.query !== undefined){
        this.searchAddress();
      }
    }
    
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