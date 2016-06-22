(function(app) {
    'use strict';

    function onem2mInput(Onem2m) {
        //format text going to user (model to view)
        function filterComplexType(value) {
            return angular.isObject(value) ? null : value;
        }

        function enumValueToEnumName(name){
          return function(value){

          };
        }

        // format text from the user (view to model)
        function emptyStringAsNull(value) {
            return value === '' || value === undefined ? null : value;
        }

        function enumNameToEnumValue(name){
          return function(value){

          };
        }

        function stringToOnem2mType(name){
          return function(value){

          };
        }

        return {
            restrict: 'A',
            scope: {
                name: "=onem2mInputName",
                value: "=onem2mInputValue"
            },
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                var name = scope.name;
                var value = scope.value;
                //format text going to user (model to view)
                ngModel.$formatters.push(filterComplexType);
                ngModel.$formatters.push(filterComplexType);
                // format text from the user (view to model)
                ngModel.$parsers.push(emptyStringAsNull);
            }
        };
    }
    onem2mInput.$inject = ['Onem2mHelperService'];
    app.directive('onem2mInput', onem2mInput);
})(app);
