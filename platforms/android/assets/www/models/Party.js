angular.module('FindAParty')
  .factory('Party', function PartyFactory(){
    return {
      new : function(){
        return {
          hoster : '',
          name : '',
          description : '',
          type : '',
          address : '',
          lat : 0, 
          lng : 0,
          date : '',
          time : '',
          hours : ''
        };
      },
      
      create : function(party){},
      
      findAll : function(){},
      
      find : function(id){}
    };
  });