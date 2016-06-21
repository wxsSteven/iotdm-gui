(function(app) {
    'use strict';

    function sidePanelCrud() {
        return {
            restrict: "E",
            scope: {
                operation: "="
            },
            templateUrl: "template/side-panel-crud.tplt.html"
        };
    }

    app.directive("sidePanelCrud", sidePanelCrud);
})(app);
