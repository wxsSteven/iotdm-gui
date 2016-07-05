(function(app) {
    'use strict';

    function onem2mInput($compile, Onem2m) {

        var inputDisabledTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <input disabled ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '</md-input-container>';

        var inputTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <input ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '   <div class="icons-right">' +
            '       <span class="material-icons clear" ng-click="clear()">clear</span>' +
            '   </div>' +
            '   <sup class="edited-text" ng-show="isEdited()">Edited</sup>' +
            '</md-input-container>';
        var textareaTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <textarea ng-model="value" onem2m-view-model name="{{name}}"></textarea>' +
            '   <div class="icons-right">' +
            '       <span class="material-icons clear" ng-click="clear()">clear</span>' +
            '   </div>' +
            '   <sup class="edited-text" ng-show="isEdited()">Edited</sup>' +
            '</md-input-container>';
        var optionTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <md-select ng-model="value" onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '       <md-option ng-value="k" ng-repeat="(k,v) in options">{{k}}</md-option>' +
            '   </md-select>' +
            '   <div class="icons-right-top">' +
            '       <span class="material-icons clear" ng-click="clear()">clear</span>' +
            '   </div>' +
            '   <sup class="edited-text" ng-show="isEdited()">Edited</sup>' +
            '</md-input-container>';

        var booleanTemplate = optionTemplate;

        var timeTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <div class="icons-right">' +
            '       <span class="material-icons clear" ng-click="clear()" >clear</span>' +
            '       <span class="material-icons">date_range</span>' +
            '   </div>' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <input ng-model="value" mdc-datetime-picker format="YYYYMMDDTHHmmss" date="true" time="true"  onem2m-view-model name="{{name}}" array-name="{{arrayName}}">' +
            '   <sup class="edited-text" ng-show="isEdited()">Edited</sup>' +
            '</md-input-container>';

        var complexTemplate = '' +
            '<md-input-container class="md-block">' +
            '   <label>{{name|shortToLong}}</label>' +
            '   <input disabled>' +
            '</md-input-container>';

        return {
            restrict: 'E',
            scope: {
                value: "="
            },
            link: function(scope, element, attrs) {
                scope.name = attrs.name;
                scope.arrayName = attrs.arrayName;
                var isArrayItem = attrs.arrayName !== null && attrs.arrayName !== undefined;
                var isDisabled = attrs.disabled !== undefined;

                var _value = angular.copy(scope.value);

                if (isDisabled) {
                    element.append($compile(inputDisabledTemplate)(scope));
                } else {
                    var name = null;
                    var attr = null;
                    var type = null;

                    if (isArrayItem) {
                        name = attrs.arrayName;
                        attr = Onem2m.attribute(name);
                        type = attr.itemType;
                    } else {
                        name = attrs.name;
                        attr = Onem2m.attribute(name);
                        type = attr.type;
                    }

                    if (type === 'enum') {
                        scope.options = attr.handler.options;
                        element.append($compile(optionTemplate)(scope));
                    } else if (type === 'boolean') {
                        scope.options = {
                            "True": true,
                            "False": false
                        };
                        element.append($compile(booleanTemplate)(scope));
                    } else if (type === 'time') {
                        element.append($compile(timeTemplate)(scope));
                    } else if (type === 'object' || type === 'array') {
                        element.append($compile(complexTemplate)(scope));
                    } else if (type === "number" || type === 'string') {
                        element.append($compile(inputTemplate)(scope));
                    }else if(attrs.name==='con'){
                        element.append($compile(textareaTemplate)(scope));
                    }else{
                      element.append($compile(inputTemplate)(scope));
                    }
                }

                scope.clear = function() {
                    scope.value = null;
                };

                scope.isEdited = function() {
                    return !(scope.value === null && _value === undefined || scope.value === undefined && _value === null || angular.equals(scope.value, _value));
                };
            }
        };
    }
    onem2mInput.$inject = ['$compile', 'Onem2mHelperService'];
    app.directive('onem2mInput', onem2mInput);
})(app);
