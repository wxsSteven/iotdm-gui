'use strict';
var app = angular.module('app.iotdm-gui', ['ngMaterial','ngMaterialDatePicker','ngRoute','path']);
app.config(
    function($mdThemingProvider,$routeProvider,PathProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('light-blue');

        $routeProvider.when("/",{
          templateUrl:'template/iotdm-gui.tplt.html',
          controller:'IotdmGuiCtrl',
          controllerAs:"ctrl"
        });

        PathProvider.setBase("/");
    }
);
app.run(function(NxService,Path) {
    // register icons
    var icons = ["CSEBase", "AE", "container", "contentInstance", "group", "node", "accessControlPolicy", "observe", "unobserve", "subscription"];
    var location = "icon";
    var format = "svg";
    var width = 50;
    var height = 50;
    icons.forEach(function(icon) {
        var file = Path+ "icon/"+icon + "." + format;
        NxService.graphic.Icons.registerIcon(icon.toLowerCase(), file, width, height);
    });
    // end register icons
});
