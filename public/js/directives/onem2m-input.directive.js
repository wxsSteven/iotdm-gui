(function(app){
  'use strict';
  function onem2mInputFn(){
    return {
      restrict:'E',
      scope:{
        key:"=",
        value:"="
      },
      controller:function(){

      },
      template:"<div ng-include='template'></div>"
    };
  }

  onem2mInputFn.$inject=[];
  app.directive("onem2mInput",onem2mInputFn);
})(app);
