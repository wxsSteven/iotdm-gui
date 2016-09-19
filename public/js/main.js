(function() {
    'use strict';
    var baseUrl = "/";

    function dir(name) {
        return baseUrl + name;
    }

    requirejs.config({
        paths: {
            "moment": dir("vendor/moment/moment"),
            "material-datetimepicker": dir("custom_vendor/material-datetimepicker/angular-material-datetimepicker"),
            "next": dir("vendor/next-bower/js/next"),
            //Start comment below for DLUX
            "d3": dir("vendor/d3/d3"),
            "angular": dir("vendor/angular/angular"),
            "ngRoute": dir("vendor/angular-route/angular-route"),
            "ngUIRoute": dir("vendor/angular-ui-router/release/angular-ui-router"),
            "ngAnimate": dir("vendor/angular-animate/angular-animate"),
            "ngAria": dir("vendor/angular-aria/angular-aria"),
            "ngMessages": dir("vendor/angular-messages/angular-messages.min"),
            "ngMaterial": dir("vendor/angular-material/angular-material.min"),
            //End comment

            "app.iotdm-gui.module":dir("js/app.iotdm-gui.module"),
            "iotdm-gui.controllers.module":dir("js/controllers/iotdm-gui.controllers.module"),
            "iotdm-gui.directives.module":dir('js/directives/iotdm-gui.directives.module'),
            "iotdm-gui.filters.module":dir('js/filters/iotdm-gui.filters.module'),
            "iotdm-gui.providers.module":dir('js/providers/iotdm-gui.providers.module'),
            "iotdm-gui.services.module":dir('js/services/iotdm-gui.services.module'),

            'iotdm-gui.controller':dir('js/controllers/iotdm-gui.controller'),
            'side-panel-crud.controller':dir('js/controllers/side-panel-crud.controller'),
            'side-panel-info.controller':dir('js/controllers/side-panel-info.controller'),
            'side-panel-retrieve-cse.controller':dir('js/controllers/side-panel-retrieve-cse.controller'),

            'onem2m-input-component-custom.directive':dir('js/directives/onem2m-input-component-custom.directive'),
            'onem2m-input.directive':dir('js/directives/onem2m-input.directive'),
            'onem2m-slider.directive':dir('js/directives/onem2m-slider.directive'),

            'short-to-long.filter':dir('js/filters/short-to-long.filter'),

            'nx.provider':dir('js/providers/nx.provider'),
            'path.provider':dir('js/providers/path.provider'),

            'alert.service':dir('js/services/alert.service'),
            'datastore-onem2m-data-adaptor.service':dir('js/services/datastore-onem2m-data-adaptor.service'),
            'datastore.service':dir('js/services/datastore.service'),
            'onem2m-crud.service':dir('js/services/onem2m-crud.service'),
            'onem2m-description.service':dir('js/services/onem2m-description.service'),
            'onem2m-helper.service':dir('js/services/onem2m-helper.service'),
            'onem2m-input-component.service':dir('js/services/onem2m-input-component.service'),
            'topology-helper.service':dir('js/services/topology-helper.service'),
            'topology.service':dir('js/services/topology.service'),
            'tree-layout.service':dir('js/services/tree-layout.service')
        },
        shim: {
            "angular": {
                exports: 'angular'
            },
            "d3": {
                exports: "d3"
            },
            "next": {
                exports: "nx"
            },
            "moment": {
                exports: "moment"
            },
            "material-datetimepicker": ['moment', 'ngMaterial'],
            //Start comment below for ODL
            "ngRoute": ['angular'],
            "ngUIRoute": ['angular'],
            "ngAnimate": ['angular'],
            "ngAria": ['angular'],
            "ngMessages": ['angular'],
            "ngMaterial": ['ngAnimate', 'ngAria', 'ngMessages'],
            //End comment
        },
        config:{
          "app.iotdm-gui.module":{
            baseUrl:baseUrl
          }
        }
    });
    define(['app.iotdm-gui.module']);
})();
