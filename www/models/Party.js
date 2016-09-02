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
        parties.$add(party);
      },
      
      findAll : function(){},
      
      find : function(id){}
    };
  });