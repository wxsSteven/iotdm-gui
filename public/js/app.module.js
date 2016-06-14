'use strict';
var app = angular.module('iotdmApp', ['ngMaterial']);
app.config(
    function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('light-blue');
    }
);
app.run(function(NxService) {
    // register icons
    var icons = ["CSEBase", "AE", "container", "contentInstance", "group", "node", "accessControlPolicy", "observe", "unobserve", "subscription"];
    var location = "icon";
    var format = "svg";
    var width = 50;
    var height = 50;
    icons.forEach(function(icon) {
        var file = location + "/" + icon + "." + format;
        NxService.graphic.Icons.registerIcon(icon.toLowerCase(), file, width, height);
    });
    // end register icons
});
