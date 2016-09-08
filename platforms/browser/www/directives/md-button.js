angular.module('FindAParty')
  .directive('md-button', function(){
    return {
      restrict : 'E',
      link: function(scope, elem, attrs) {
        //Don't use native slide when debugging on browser
        if(window.location.protocol !== 'http:'){
          if(attrs.ngHref ){
            elem.on('click', function(e){  
              e.preventDefault();
              nativeSlide(attrs.ngHref);
            });
          }
        }
      }
    };
  });