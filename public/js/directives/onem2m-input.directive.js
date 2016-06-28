(function(app) {
    'use strict';

    function onem2mInput(Onem2m) {
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


        return {
            restrict: 'A',
            scope: {
                name: "=onem2mInput"
            },
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                var name = scope.name;
                var isArrayItem = attrs.arrayItem !== undefined;
                //format text going to user (model to view)
                ngModel.$formatters.push(filterComplexType);
                ngModel.$formatters.push(toView(name, isArrayItem));
                // format text from the user (view to model)
                ngModel.$parsers.push(emptyStringAsNull);
                ngModel.$parsers.push(toModel(name,isArrayItem));
            }
        };
    }
    onem2mInput.$inject = ['Onem2mHelperService'];
    app.directive('onem2mInput', onem2mInput);
})(app);
