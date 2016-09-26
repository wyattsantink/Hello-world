angular.module('FindAParty')
  .factory('Party', function PartyFactory($firebaseObject, $firebaseArray){
    return {
      new : function(){
        return {
          hoster : '',
          name : '',
          details : '',
          type : 'private',
          location : {
            address : '',
            lat : 0, 
            lng : 0,
            placeId : ''
          },
          startsAt : {
            date : moment().format("MM/DD/YYYY"),
            time : moment().format("HH:mm"),
            utcOffset : moment().format("ZZ"),
            timeZone : moment.tz.guess(),
            dateTimeString : '',
            timestamp : 0,
          },
          hours : 6,
          endsAt : {
            date : '',
            time : '',
            utcOffset : '',
            timeZone : moment.tz.guess(),
            dateTimeString : '',
            timestamp : 0,
          }
        };
      },
      
      create : function(party){
        var ref = firebase.database().ref(findAParty.firebase.environment+'/parties/');
        var parties = $firebaseArray(ref);
        parties.$add(party).then(function(data){
          var geoRef = firebase.database().ref(findAParty.firebase.environment+'/parties-location/');
          var geoFire = new GeoFire(geoRef);
          geoFire.set(data.key, [parties[parties.$indexFor(data.key)].location.lat,parties[parties.$indexFor(data.key)].location.lng]);
        });
      },
      
      update : function(party){
        party.$save().then(function(data){
          var geoRef = firebase.database().ref(findAParty.firebase.environment+'/parties-location/');
          var geoFire = new GeoFire(geoRef);
          geoFire.set(data.key,[party.location.lat,party.location.lng]);
        });
      },
      
      findByUser : function(id){
        var ref = firebase.database().ref(findAParty.firebase.environment+'/parties/').orderByChild('hoster').equalTo(id);
        var parties = $firebaseArray(ref);
        parties.$loaded().then(function(data){
          //Recent timestamps come first
          parties.sort(function(a,b){
            return b.startsAt.timestamp - a.startsAt.timestamp;
          });
          
          parties.$watch(function(ev) {
            parties.sort(function(a,b){
              return b.startsAt.timestamp - a.startsAt.timestamp;
            });
          });
          
        });
        
        return parties;
      },
      
      findById : function(id){
        var ref = firebase.database().ref(findAParty.firebase.environment+'/parties/'+id);
        return $firebaseObject(ref);
      },
      
      findByLocation : function(lat,lng,addCallback, deleteCallback){
        //Displays the loading bar:
        if(document.getElementById('parties-loading')){document.getElementById('parties-loading').style.display = 'block';}

        var geoRef = firebase.database().ref(findAParty.firebase.environment+'/parties-location/');
        var geoFire = new GeoFire(geoRef);
        var geoQuery = geoFire.query({
          center: [lat,lng],
          radius: 30
        });
        
        geoQuery.on("key_entered", function(key, location){
          addCallback(key);
        });
        
        geoQuery.on("key_exited", function(key, location){
          deleteCallback(key);
        });
        
        geoQuery.on("ready", function(){
          //Hides the loading bar:
          if(document.getElementById('parties-loading')){document.getElementById('parties-loading').style.display = 'none';}
        });
      },
      
      delete : function(party, parties){
        if(parties){
          parties.$remove(party).then(function(data){
            var geoRef = firebase.database().ref(findAParty.firebase.environment+'/parties-location/');
            var geoFire = new GeoFire(geoRef);
            geoFire.remove(data.key);
          });
        }else{
         party.$remove().then(function(data){
            var geoRef = firebase.database().ref(findAParty.firebase.environment+'/parties-location/');
            var geoFire = new GeoFire(geoRef);
            geoFire.remove(data.key);
         }); 
        }
      },
      
      listenOnInvitation : function(partyId, userId, callback){
        var ref = firebase.database().ref(findAParty.firebase.environment+'/parties-invitation/'+partyId+'/'+userId);
        var invitation = $firebaseObject(ref);
        invitation.$watch(function(){
          if(invitation.isInvited === undefined){
            callback(404); //not found
          }else{
            if(invitation.isInvited){
              callback(200);//OK
            }else{
              callback(403);//forbidden
            }
          }
        });
      },
      
      createInvitation : function(partyId, userId){
        var ref = firebase.database().ref(findAParty.firebase.environment+'/parties-invitation/'+partyId+'/'+userId);
        var invitation = $firebaseObject(ref);
        invitation.isInvited = false;
        invitation.$save();
      },
      
      updateInvitation : function(partyId, userId, value){},
      
      isInvited : function(partyId, userId){}
    };
  });