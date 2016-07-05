(function(app) {
    'use strict';

    function onem2mInput($compile, Onem2mInputComponent) {

        return {
            restrict: 'E',
            scope: {
                value: "="
            },
            link: function(scope, element, attrs) {
                scope.labelName = attrs.labelName;
                scope.name = attrs.name;
                var _value = angular.copy(scope.value);

                var componentScope = Onem2mInputComponent.scope(scope.name );
                var componentTemplate = Onem2mInputComponent.template(scope.name);

                angular.extend(scope, componentScope);
                element.append($compile(componentTemplate)(scope));

                scope.$watch(function() {
                    return !angular.equals(scope.value, _value);
                }, function(value) {
                    scope.edited = value;
                });
            }
        };
    }
    onem2mInput.$inject = ['$compile', 'Onem2mInputComponentService'];
    app.directive('onem2mInput', onem2mInput);
})(app);
