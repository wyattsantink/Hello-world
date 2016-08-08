angular.module('FindAParty')
  .factory('Party', function PartyFactory(){
    return {
      new : function(){
        return {
          id : 0,
          owner : '',
          admins : [],
          name : '',
          description : '',
          startingTime : '',
          endingTime : '',
          type : '',
          address : '',
          location : {lat : 0, lng : 0},
          legalAgeOnly : false
        };
      },
      
      findAll : function(){
        return [
          {
            id : 0,
            owner : '',
            admins : [],
            name : 'Awesome Party!',
            description : 'Here is some awesome description...',
            startingTime : '',
            endingTime : '',
            type : 'public',
            address : 'Rua Angélica Mota',
            location : {lat : -22.8433045, lng : -43.2628136},
            legalAgeOnly : false
          },
          {
            id : 0,
            owner : '',
            admins : [],
            name : 'Nice Party',
            description : 'Here is some nice description...',
            startingTime : '',
            endingTime : '',
            type : 'public',
            address : 'Rua Noêmia Nunes',
            location : {lat : -22.84481, lng : -43.2620348},
            legalAgeOnly : false
          }
        ];
      }
    };
  });