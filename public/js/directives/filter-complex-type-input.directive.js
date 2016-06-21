(function(app) {
    'use strict';
    app.directive('filterComplexTypeInput', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {

                //format text going to user (model to view)
                ngModel.$formatters.push(function(value) {
                    return angular.isObject(value) ? null : value;
                });

                // format text from the user (view to model)
                ngModel.$parsers.push(function(value) {
                  return value===''||value===undefined?null:value;
                });
            }
        };
    });
})(app);
