(function(app) {
    function SidePanelRetrieveCSECtrl($scope, DataStore,Topology) {
        $scope.submit = submit;
        $scope.host="localhost";
        $scope.port="8282";
        $scope.CSEName="InCSE1";
        $scope.allDescendant=false;

        function submit(host,port,cseBase) {
            var retrieveFn=$scope.allDescendant?DataStore.syncAllData:DataStore.rebuild;
            retrieveFn(host,port,cseBase).then(function(){
              Topology.update();
              $scope.$emit("closeSidePanel");
            });
        }
    }

    SidePanelRetrieveCSECtrl.$inject = ['$scope', 'DataStoreService','TopologyService'];
    app.controller('SidePanelRetrieveCSECtrl', SidePanelRetrieveCSECtrl);
})(app)
