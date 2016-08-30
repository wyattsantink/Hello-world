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
          dateTime : '',
          hours : ''
        };
      },
      
      create : function(party){},
      
      findAll : function(){},
      
      find : function(id){}
    };
  });