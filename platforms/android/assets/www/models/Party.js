angular.module('FindAParty')
  .factory('Party', function PartyFactory(){
    return {
      new : function(){
        return {
          hoster : '',
          name : '',
          description : '',
          type : 'private',
          address : '',
          lat : 0, 
          lng : 0,
          date : moment().format("MM/DD/YYYY"),
          time : moment().format("HH:mm"),
          utcOffset : moment().format("ZZ"),
          timeZone : moment.tz.guess(),
          dateTimeString : '',
          timestamp : 0,
          hours : ''
        };
      },
      
      create : function(party){},
      
      findAll : function(){},
      
      find : function(id){}
    };
  });