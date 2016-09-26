/** 
 * GLOBAL DATA FOR THE APP
 * API KEYS
 * 
 */

var findAParty = {
  
  version : '0.0.0',
  channel : 'dev', // channels : ['dev', 'alpha', 'beta', 'master']
  buildHash : 'e8bb438',
  phonegapDebugMode : true,
  
  firstAccessFlag : true,
  
  userLocation : {lat:0, lng:0},
  
  googleAnalytics : {
    trackId : 'UA-84588202-1'
  },
  
  googleOAuth : {
    clientId : '99044897016-uep6je443errrns1udl8gapq8325tfpo.apps.googleusercontent.com',
    clientSecret : '2hH4EccQKJURgMk0re5AWRx-',
    redirectUri : 'http://iltons.io'
  },
  
  firebase : {
    environment : '/dev', // environments : ['dev', 'test', 'production']
    apiKey: "AIzaSyBAMh_WI06U6L94xZ9SMQI3LDSt9ShDMQI",
    authDomain: "find-a-party.firebaseapp.com",
    databaseURL: "https://find-a-party.firebaseio.com",
    storageBucket: "find-a-party.appspot.com",
  },
  
  googleMaps : {
    javascriptApiKey : 'AIzaSyCqWrMqngMfbrwJ18PZffg10wcyQj6w4S4',
    geocodingApiKey :'AIzaSyAxmxCN2xvh-LdA7Lj7QeKkKG4ecwVzAZA'
  }
};