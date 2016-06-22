(function(app){
  'use strict';
  function AlertService($mdToast){
    return function(message,style){
      $mdToast.show($mdToast.simple().textContent(message).theme(style));
    };
  }
  AlertService.$inject=['$mdToast'];
  app.service("AlertService",AlertService);
})(app);
