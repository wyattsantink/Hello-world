angular.module('FindAParty')
  .factory('Party', function PartyFactory(){
    return {
      new : function(){
        return {
          id : 0,
          hoster : '',
          admins : [],
          name : '',
          description : '',
          startingTime : '',
          endingTime : '',
          type : '',
          address : '',
          location : {lat : 0, lng : 0},
          legalAgeOnly : false,
          rating : 0
        };
      },
      
      findAll : function(){
        return [
          {
            id : 1,
            hoster : 'Ilton Sequeira',
            admins : [],
            name : 'Awesome Party!',
            description : 'Here is some awesome description...',
            startingTime : '',
            endingTime : '',
            type : 'public',
            address : 'Rua Angelica Mota 45, Rio de Janeiro, RJ',
            location : {lat : -22.8433045, lng : -43.2628136},
            legalAgeOnly : false,
            rating : 5,
            reviews : [
              {
                userName : 'John Doe',
                rating : 5,
                comment : "I'm enjoying this party!"
              },
              {
                userName : 'Jane Roe',
                rating : 5,
                comment : "Hey there! Nice party here!"
              }
            ]
            
          },
          {
            id : 2,
            hoster : 'Ilton Sequeira',
            admins : [],
            name : 'Nice Party',
            description : 'Here is some nice description...',
            startingTime : '',
            endingTime : '',
            type : 'public',
            address : 'Rua Noemia Nunes 231, Rio de Janeiro, RJ',
            location : {lat : -22.84481, lng : -43.2620348},
            legalAgeOnly : false,
            rating : 3,
            reviews : [
              {
                userName : 'John Doe',
                rating : 3,
                comment : "I'm enjoying this party!"
              },
              {
                userName : 'Jane Roe',
                rating : 3,
                comment : "Hey there! Nice party here!"
              }
            ]
          },
          {
            id : 3,
            hoster : 'Wyatt Santink',
            admins : [],
            name : 'Party at the Pub',
            description : 'Here is some nice description...',
            startingTime : '',
            endingTime : '',
            type : 'public',
            address : '79 Little Bridge Street, Almonte, Ontario, K0A 1A0',
            location : {lat : 45.226070, lng : -76.195679},
            legalAgeOnly : true,
            rating : 4,
            reviews : [
              {
                userName : 'John Doe',
                rating : 4,
                comment : "I'm enjoying this party!"
              },
              {
                userName : 'Jane Roe',
                rating : 4,
                comment : "Hey there! Nice party here!"
              }
            ]
          },
          {
            id : 4,
            hoster : 'Wyatt Santink',
            admins : [],
            name : 'Private Members Party',
            description : 'Here is some nice description for private members only...',
            startingTime : '',
            endingTime : '',
            type : 'private',
            address : '1060 Bank Street, Ottawa, Ontario, K1S 3W9',
            location : {lat : 45.394932, lng : -75.683794},
            legalAgeOnly : false,
            rating : 5,
            reviews : [
              {
                userName : 'John Doe',
                rating : 5,
                comment : "I'm enjoying this party!"
              },
              {
                userName : 'Jane Roe',
                rating : 5,
                comment : "Hey there! Nice party here!"
              }
            ]
          },
        ];
      },
      
      find : function(id){
        var parties = [
          {
            id : 1,
            hoster : 'Ilton Sequeira',
            admins : [],
            name : 'Awesome Party!',
            description : 'Here is some awesome description...',
            startingTime : '',
            endingTime : '',
            type : 'public',
            address : 'Rua Angelica Mota 45, Rio de Janeiro, RJ',
            location : {lat : -22.8433045, lng : -43.2628136},
            legalAgeOnly : false,
            rating : 5,
            reviews : [
              {
                userName : 'John Doe',
                rating : 5,
                comment : "I'm enjoying this party!"
              },
              {
                userName : 'Jane Roe',
                rating : 5,
                comment : "Hey there! Nice party here!"
              }
            ]
            
          },
          {
            id : 2,
            hoster : 'Ilton Sequeira',
            admins : [],
            name : 'Nice Party',
            description : 'Here is some nice description...',
            startingTime : '',
            endingTime : '',
            type : 'public',
            address : 'Rua Noemia Nunes 231, Rio de Janeiro, RJ',
            location : {lat : -22.84481, lng : -43.2620348},
            legalAgeOnly : false,
            rating : 3,
            reviews : [
              {
                userName : 'John Doe',
                rating : 3,
                comment : "I'm enjoying this party!"
              },
              {
                userName : 'Jane Roe',
                rating : 3,
                comment : "Hey there! Nice party here!"
              }
            ]
          },
          {
            id : 3,
            hoster : 'Wyatt Santink',
            admins : [],
            name : 'Party at the Pub',
            description : 'Here is some nice description...',
            startingTime : '',
            endingTime : '',
            type : 'public',
            address : '79 Little Bridge Street, Almonte, Ontario, K0A 1A0',
            location : {lat : 45.226070, lng : -76.195679},
            legalAgeOnly : true,
            rating : 4,
            reviews : [
              {
                userName : 'John Doe',
                rating : 4,
                comment : "I'm enjoying this party!"
              },
              {
                userName : 'Jane Roe',
                rating : 4,
                comment : "Hey there! Nice party here!"
              }
            ]
          },
          {
            id : 4,
            hoster : 'Wyatt Santink',
            admins : [],
            name : 'Private Members Party',
            description : 'Here is some nice description for private members only...',
            startingTime : '',
            endingTime : '',
            type : 'private',
            address : '1060 Bank Street, Ottawa, Ontario, K1S 3W9',
            location : {lat : 45.394932, lng : -75.683794},
            legalAgeOnly : false,
            rating : 5,
            reviews : [
              {
                userName : 'John Doe',
                rating : 5,
                comment : "I'm enjoying this party!"
              },
              {
                userName : 'Jane Roe',
                rating : 5,
                comment : "Hey there! Nice party here!"
              }
            ]
          },
        ];
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