(function(app) {
    'use strict';

    function SidePanelRetrieveCSECtrl($scope, DataStore, Topology) {
        var _this=this;

        _this.submit = submit;
        _this.host = "localhost";
        _this.port = "8282";
        _this.CSEName = "InCSE1";
        _this.allDescendant = false;

        function submit(host, port, cseBase) {
            var retrieveFn = _this.allDescendant ? DataStore.syncAllData : DataStore.rebuild;
            retrieveFn(host, port, cseBase).then(function() {
                Topology.update();
                $scope.$emit("closeSidePanel");
            });
        }
    }

    SidePanelRetrieveCSECtrl.$inject = ['$scope', 'DataStoreService', 'TopologyService'];
    app.controller('SidePanelRetrieveCSECtrl', SidePanelRetrieveCSECtrl);
  })(app);
