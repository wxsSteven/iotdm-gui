'use strict';
var modules = [
    'angular',
    'ngRoute',
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngMaterial',
    'moment',
    'material-datetimepicker',
    'd3',
    'next',

    'js/controllers/iotdm-gui.controller',
    'js/controllers/side-panel-crud.controller',
    'js/controllers/side-panel-info.controller',
    'js/controllers/side-panel-retrieve-cse.controller',

    'js/directives/onem2m-input-component-custom.directive',
    'js/directives/onem2m-input.directive',
    'js/directives/side-panel-crud.directive',
    'js/directives/slider.directive',

    'js/filters/short-to-long.filter',

    'js/providers/nx.provider',
    'js/providers/path.provider',

    'js/services/alert.service',
    'js/services/datastore-onem2m-data-adaptor.service',
    'js/services/datastore.service',
    'js/services/onem2m-crud.service',
    'js/services/onem2m-description.service',
    'js/services/onem2m-helper.service',
    'js/services/onem2m-input-component.service',
    'js/services/topology-helper.service',
    'js/services/topology.service',
    'js/services/tree-layout.service'
];



define(modules, function(ng) {
    var angular_modules = [
        'ngMaterialDatePicker',
        'ngMaterial',
        'ngRoute',
        'app.iotdm-gui.controllers',
        'app.iotdm-gui.providers',
        'app.iotdm-gui.directives',
        'app.iotdm-gui.filters',
        'app.iotdm-gui.services'
    ];

    var app = ng.module('app.iotdm-gui', angular_modules);

    app.config(
        function($mdThemingProvider, $routeProvider, PathProvider, NxProvider) {
            PathProvider.setBase("/");

            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('light-blue');

            $routeProvider.when("/", {
                templateUrl: PathProvider.base() + 'template/iotdm-gui.tplt.html',
                controller: 'IotdmGuiCtrl',
                controllerAs: "ctrl"
            });

            NxProvider.icons({
                icons: ["CSEBase", "AE", "container", "contentInstance", "group", "node", "accessControlPolicy", "observe", "unobserve", "subscription"],
                location: PathProvider.base() + "icon",
                format: "svg",
                width: 50,
                height: 50
            });
        }
    );
});
