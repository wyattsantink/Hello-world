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
      }
    };
  });