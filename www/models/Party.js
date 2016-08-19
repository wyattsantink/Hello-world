angular.module('FindAParty')
  .factory('Party', function PartyFactory(){
    return {
      new : function(){
        return {};
      },
      
      findAll : function(){
        return {};
      },
      
      find : function(id){
        var parties = [];
        var party;
        
        for(i=0; i < parties.length; i++){
          if(parties[i].id === id){
            party = parties[i];
            break;
          }
        }
        
        return party;
      }
    };
  });