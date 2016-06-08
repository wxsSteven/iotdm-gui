(function(app) {
    function SidePanelRetrieveCSECtrl($scope, DataStore,Topology) {
        $scope.submit = submit;
        $scope.host="localhost";
        $scope.port="8282";
        $scope.CSEName="InCSE1";

        function submit(host,port,cseBase) {
            DataStore.rebuild(host,port,cseBase).then(function(){
              Topology.initTopology('topology');
              Topology.drew(DataStore.topologyData());
              $scope.$emit("closeSidePanel");
            });
        }
    }

    SidePanelRetrieveCSECtrl.$inject = ['$scope', 'DataStoreService','TopologyService'];
    app.controller('SidePanelRetrieveCSECtrl', SidePanelRetrieveCSECtrl);
})(app)
