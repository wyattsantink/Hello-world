/**
 * NATIVE PAGE TRANSITIONS - config file
 * 
 * also don't forget to add: <preference name="CrosswalkAnimatable" value="true" />
 * when using it with crosswalk plugin
 * 
 * Docs @ http://plugins.telerik.com/cordova/plugin/native-page-transitions
 * 
 */


function nativeSlide(hrf) {
  var theOptions = {
    'duration' : 300,
    'href': hrf
  };
  
  window.plugins.nativepagetransitions.slide(
    theOptions,
    function () {
      console.log('slide transition finished');
    },
    function (msg) {
      console.log('error: ' + msg);
  });
}
