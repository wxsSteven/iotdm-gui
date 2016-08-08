'use strict';
var modules = [
    'module',
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

    'iotdm-gui.controller',
    'side-panel-crud.controller',
    'side-panel-info.controller',
    'side-panel-retrieve-cse.controller',

    'onem2m-input-component-custom.directive',
    'onem2m-input.directive',
    'side-panel-crud.directive',
    'slider.directive',

    'short-to-long.filter',

    'nx.provider',
    'path.provider',

    'alert.service',
    'datastore-onem2m-data-adaptor.service',
    'datastore.service',
    'onem2m-crud.service',
    'onem2m-description.service',
    'onem2m-helper.service',
    'onem2m-input-component.service',
    'topology-helper.service',
    'topology.service',
    'tree-layout.service'
];



define(modules, function(module, ng) {
    var baseUrl = module.config().baseUrl;
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
            PathProvider.setBase(baseUrl);

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
    ng.element(document).ready(function() {
        ng.bootstrap(document, ['app.iotdm-gui']);
    });

});
