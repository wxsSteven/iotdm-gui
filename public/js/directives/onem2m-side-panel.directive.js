(function(app) {
    'use strict';

    function onem2mSidePanel() {
        return {
            restrict: "E",
            scope: {
                operation: "="
            },
            templateUrl: "template/onem2m-side-panel.tplt.html"
        };
    }

    app.directive("onem2mSidePanel", onem2mSidePanel);
})(app);
