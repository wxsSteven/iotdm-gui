(function(app) {
    'use strict';

    function onem2mInput($compile, Onem2m) {
        //format text going to user (model to view)
        function filterComplexType(value) {
            return angular.isObject(value) ? null : value;
        }

        function toView(name, isArrayItem) {
            var toViewHandler = Onem2m.attributeViewHandler(name, isArrayItem);
            return function(value) {
                return toViewHandler(value);
            };
        }

        // format text from the user (view to model)
        function emptyStringAsNull(value) {
            return value === '' || value === undefined ? null : value;
        }

        function toModel(name, isArrayItem) {
            var toModelHandler = Onem2m.attributeModelHandler(name, isArrayItem);
            return function(value) {
                return toModelHandler(value);
            };
        }

        var inputTemplate = '<md-input-container class="md-block">' +
            '<label>{{name|shortToLong}}</label>' +
            '<input ng-disabled="isDisabled" ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '<div class="input">' +
            '<span class="material-icons icons-right" ng-hide="isValue(value)" ng-click="children(name)">chevron_right</span>' +
            '</div>' +
            '</md-input-container>';

        // var textareaTemplate = '<textarea ng-disabled="{{!isEditable}}" ng-model="value"></textarea>';
        var optionTemplate = '<md-input-container class="md-block">' +
            '<label>{{name|shortToLong}}</label>' +
            '<md-select ng-disabled="isDisabled" ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '<md-option ng-value="k" ng-repeat="(k,v) in options">{{k}}</md-option>' +
            '</md-select>' +
            '<div class="input">' +
            '<span class="material-icons icons-right" ng-hide="isValue(value)" ng-click="children(name)">chevron_right</span>' +
            '</div>' +
            '</md-input-container>';


        var booleanTemplate = '<md-switch ng-disabled="isDisabled" ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">{{value}}</md-switch>';
        var timeTemplate = '<md-datepicker ng-disabled="isDisabled" ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">{{value}}></md-datepicker>';

        return {
            restrict: 'E',
            scope: {
                name: "=",
                value: "=",
                children: "="
            },
            link: function(scope, element, attrs) {
                scope.isDisabled = attrs.disabled !== undefined;
                scope.arrayName = attrs.arrayName;

                var attrName = attrs.arrayName ? attrs.arrayName : scope.name;

                var attr = Onem2m.attribute(attrName);

                if (scope.isDisabled) {
                    element.append($compile(inputTemplate)(scope));
                } else {
                    if (attr.type === 'enum') {
                        scope.options = attr.handler.options;
                        element.append($compile(optionTemplate)(scope));
                    } else if (attr.type === 'boolean') {
                        element.append($compile(booleanTemplate)(scope));
                    } else if (attr.type === 'time') {
                        element.append($compile(timeTemplate)(scope));
                    } else {
                        element.append($compile(inputTemplate)(scope));
                    }
                }

                scope.isValue = function(value) {
                    return !angular.isObject(value);
                };

                scope.clear = function() {
                    scope.value = null;
                };
            }
        };
    }
    onem2mInput.$inject = ['$compile', 'Onem2mHelperService'];
    app.directive('onem2mInput', onem2mInput);
})(app);
