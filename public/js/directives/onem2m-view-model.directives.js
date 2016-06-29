(function(app) {
    'use strict';

    function onem2mViewModel($compile,Onem2m) {
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
            require:'ngModel',
            link: function(scope, element, attrs,ngModel) {
                //format text going to user (model to view)
                var isArrayItem=attrs.arrayName!==undefined&&attrs.arrayName!==null&&attrs.arrayName!=="";
                var name=attrs.arrayName?attrs.arrayName:attrs.name;
                ngModel.$formatters.push(filterComplexType);
                ngModel.$formatters.push(toView(name, isArrayItem));
                // format text from the user (view to model)
                ngModel.$parsers.push(emptyStringAsNull);
                ngModel.$parsers.push(toModel(name, isArrayItem));
            }
        };
    }
    onem2mViewModel.$inject = ['$compile','Onem2mHelperService'];
    app.directive('onem2mViewModel', onem2mViewModel);
})(app);
