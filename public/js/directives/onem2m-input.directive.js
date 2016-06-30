(function(app) {
    'use strict';

    function onem2mInput($compile, Onem2m) {

        var inputTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <input ng-disabled="isDisabled" ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '   <div class="input">' +
            '       <span class="material-icons icons-right" ng-hide="isValue(value)" ng-click="children(name)">chevron_right</span>' +
            '   </div>' +
            '</md-input-container>';

        // var textareaTemplate = '<textarea ng-disabled="{{!isEditable}}" ng-model="value"></textarea>';
        var optionTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <md-select ng-disabled="isDisabled" ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '       <md-option ng-value="k" ng-repeat="(k,v) in options">{{k}}</md-option>' +
            '   </md-select>' +
            '</md-input-container>';

        var booleanTemplate = '' +
            '<div layout="column" layout-align="center center" flex>' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <md-switch ng-disabled="isDisabled" ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">{{value}}</md-switch>' +
            '</div>';

        var timeTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <i class="icon material-icons">date_range</i>' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <input ng-model="value" mdc-datetime-picker format="YYYYMMDDTHHmmss" date="true" time="true"   ng-disabled="isDisabled" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '</md-input-container>';

        var complexTemplate = ''+
            '<md-input-container class="md-block">' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <input disabled>' +
            '   <div class="input">' +
            '       <span class="material-icons icons-right" ng-click="children(name)">chevron_right</span>' +
            '   </div>' +
            '</md-input-container>';

        return {
            restrict: 'E',
            scope: {
                value: "=",
                children: "="
            },
            link: function(scope, element, attrs) {
                scope.arrayName = attrs.arrayName;
                scope.name = attrs.name;
                scope.isDisabled = attrs.disabled !== undefined;

                var attrName = scope.arrayName ? scope.arrayName : scope.name;

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
                    } else if (attr.type === 'object' || attr.type === 'array') {
                        element.append($compile(complexTemplate)(scope));
                    } else if (attr.type === "number" || attr.type === 'string') {
                        element.append($compile(inputTemplate)(scope));
                    }
                }

                scope.isValue = function(value) {
                    return !angular.isObject(value);
                };

                scope.$watch('value',function(value){
                  console.log(value);
                })
            }
        };
    }
    onem2mInput.$inject = ['$compile', 'Onem2mHelperService'];
    app.directive('onem2mInput', onem2mInput);
})(app);
