/**
 * PARTY DATA-MODEL
 * 
 * Parties 
 * 
 * "parties" : {
      
    }
 * 
 * 
 */
angular.module('FindAParty')
  .factory('Party', function PartyFactory(){
    return {
      new : function(){
        return {
          hoster : '',
          name : '',
          description : '',
          address : '',
          coordinates : {lat : 0, lng : 0},
          dateTime : '',
          duration : ''
        };
      },
      
      create : function(party){
        //Add party to database
        
        //Add party to users-party
        
        //Add party to public-parties/private-parties
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