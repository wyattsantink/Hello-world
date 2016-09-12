/**
 * NATIVE PAGE TRANSITIONS - config file
 * 
 * also don't forget to add: <preference name="CrosswalkAnimatable" value="true" />
 * when using it with crosswalk plugin
 * 
 * Docs @ http://plugins.telerik.com/cordova/plugin/native-page-transitions
 * 
 */


function nativeSlide(hrf,direction) {
  var slideOptions = {
    'duration' : 300,
    'href': hrf,
    'direction' : direction,
    'slowdownfactor' : 20,
    'androiddelay' : -1 //Wait the timeout function execute slide
  };
  
  window.plugins.nativepagetransitions.slide(
    slideOptions,
    function () {
      console.log('slide transition finished');
    },
    function (msg) {
      console.log('error: ' + msg);
  });
  
  //wait .25s to load the view and do the slide, 
  setTimeout(function(){
    window.plugins.nativepagetransitions.executePendingTransition(
      function (msg) {console.log("success: " + msg);}, // called when the animation has finished
      function (msg) {alert("error: " + msg);} // called in case you pass in weird values
    );
  }, 250);
  
}

//Record the user page history, to controll the back destinaion
var historyChannel = [];

document.addEventListener("backbutton", function(ev){
  if(findAParty.phonegapDebugMode){
    window.history.back();
  }else{
    var last = historyChannel.pop();
    if(historyChannel.length > 0){
      if(last === '/Users/menu'){
        nativeSlide('#' + historyChannel[historyChannel.length-1], 'left');    
      }else{
        nativeSlide('#' + historyChannel[historyChannel.length-1], 'right');  
      }
    }
  }
    
}, false);