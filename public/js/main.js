(function() {
    'use strict';
    requirejs.config({
        baseUrl: "/",
        paths: {
            "moment": "vendor/moment/moment",
            "d3": "vendor/d3/d3",
            "next": "vendor/next-bower/js/next",
            "angular": "vendor/angular/angular",
            "ngRoute": "vendor/angular-route/angular-route",
            "ngAnimate": "vendor/angular-animate/angular-animate",
            "ngAria": "vendor/angular-aria/angular-aria",
            "ngMessages": "vendor/angular-messages/angular-messages.min",
            "ngMaterial": "vendor/angular-material/angular-material.min",
            "material-datetimepicker": "custom_vendor/material-datetimepicker/angular-material-datetimepicker"
        },
        shim: {
            "angular": {
                exports: 'angular'
            },
            "d3":{
              exports:"d3"
            },
            "next":{
              exports:"nx"
            },
            "moment":{
              exports:"moment"
            },
            "ngRoute": ['angular'],
            "ngAnimate": ['angular'],
            "ngAria": ['angular'],
            "ngMessages": ['angular'],
            "ngMaterial": ['ngAnimate', 'ngAria', 'ngMessages'],
            "material-datetimepicker":['moment', 'ngMaterial']
        }
    });
    define(['js/app.iotdm-gui.module']);
})();
