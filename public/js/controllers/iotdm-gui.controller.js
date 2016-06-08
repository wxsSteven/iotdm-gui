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

        DataStore.addSelectNodeListener(function(selectNode) {
            $scope.isSelect = true;
            openSidePanel('info');
            $scope.$apply();
        })

        DataStore.addUnSelectNodeListener(function(selectNode) {
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
    }

    IotdmGuiCtrl.$inject = ['$scope', 'TopologyService', 'DataStoreService', 'TreeLayoutService'];
    app.controller('IotdmGuiCtrl', IotdmGuiCtrl);
})(app);
