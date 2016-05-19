'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', ['ngMaterial']);

app.config(function ($mdThemingProvider) {
    // $mdThemingProvider.definePalette('white', {
    //     '50': 'ffffff',
    //     '100': 'ffffff',
    //     '200': 'ffffff',
    //     '300': 'ffffff',
    //     '400': 'ffffff',
    //     '500': 'ffffff',
    //     '600': 'ffffff',
    //     '700': 'ffffff',
    //     '800': 'ffffff',
    //     '900': 'ffffff',
    //     'A100': 'ffffff',
    //     'A200': 'ffffff',
    //     'A400': 'ffffff',
    //     'A700': 'ffffff',
    //     'contrastDefaultColor': 'dark'
    // });
    //
    // $mdThemingProvider.theme('default').primaryPalette('white').accentPalette('grey');
});

app.controller("ctrl", function ($scope) {

    $scope.side = {
        show: true,
        icon: "chevron_right",
        stairs: ["m2m:cb"],
        data: {
            "m2m:cb": {
                "ct": "20160518T150520",
                "srt": [5, 2, 3, 4, 23, 9, 14, 1],
                "ch": [{
                    "m2m:ae": {
                        "rr": true,
                        "ct": "20160518T150526",
                        "or": "iphone",
                        "aei": "AE",
                        "ty": 2,
                        "ri": "4",
                        "lt": "20160518T150526",
                        "pi": "/InCSE1/2",
                        "api": "1234",
                        "rn": "AE",
                        "et": "FOREVER"
                    }
                }, {
                    "m2m:acp": {
                        "ct": "20160518T150520",
                        "ty": 1,
                        "pv": {"acr": [{"acor": ["*"], "acop": 63}]},
                        "ri": "3",
                        "lt": "20160518T150520",
                        "pi": "/InCSE1/2",
                        "pvs": {"acr": [{"acor": ["admin"], "acop": 63}]},
                        "rn": "_defaultACP",
                        "et": "FOREVER"
                    }
                }],
                "cst": "IN-CSE",
                "ty": 5,
                "ri": "2",
                "csi": "InCSE1",
                "lt": "20160518T150526",
                "rn": "InCSE1"
            }
        }

    };


    $scope.toggleSide = function () {
        var chevrons = ["chevron_right", "chevron_left"];
        return function () {
            $scope.side.show = !$scope.side.show;
            if ($scope.side.show) {
                $scope.side.icon = chevrons[0];
            } else {
                $scope.side.icon = chevrons[1];
            }
        }
    }();

    $scope.goToStair = function (index) {
        $scope.side.stairs.splice(index + 1);
    };

    $scope.currentStair = function () {
        var data = $scope.side.data;

        $scope.side.stairs.forEach(function (name) {
                data = data[name];
            }
        );
        return data;
    };

    $scope.upperStair = function () {
        $scope.side.stairs.splice($scope.side.stairs.length - 1);
    };

    $scope.downStair = function (name) {
        var currentNode = $scope.side.data;
        $scope.side.stairs.push(name);

        $scope.side.stairs.forEach(function (name) {
                currentNode = currentNode[name];
            }
        );
        return currentNode;
    };

    $scope.currentStairName=function(){
        return $scope.side.stairs[$scope.side.stairs.length-1];
    };

    $scope.isTopStair=function(){
      return $scope.side.stairs.length<=1;
    };

    $scope.isComplex=function(value){
        return angular.isObject(value);
    }
});