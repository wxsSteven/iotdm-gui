(function(app) {
    function IotdmGuiCtrl($scope, Topology, DataStore, TreeLayout) {
        $scope.isSelect = false;
        $scope.sidePanel = {
            hide: true
        };

        $scope.openSidePanel = openSidePanel;
        $scope.closeSidePanel = closeSidePanel;
        $scope.$on('closeSidePanel', function() {
            closeSidePanel();
        });

        Topology.addSelectNodeListener(function(selectNode) {
            $scope.isSelect = true;
            openSidePanel('info');
            $scope.$apply();
        })

        Topology.addUnSelectNodeListener(function() {
            $scope.isSelect = false;
            closeSidePanel();
            $scope.$apply();
        })

        function openSidePanel(mode) {
            $scope.sidePanel.mode = mode;
            $scope.sidePanel.hide = false;
        }

        function closeSidePanel() {
            $scope.sidePanel.hide = true;
        }

        function init(){
          Topology.initTopology('topology');
          Topology.setDataStoreAccessKey(DataStore.getAccessKey());
        }
        init();
    }

    IotdmGuiCtrl.$inject = ['$scope', 'TopologyService', 'DataStoreService', 'TreeLayoutService'];
    app.controller('IotdmGuiCtrl', IotdmGuiCtrl);
})(app);
