(function (app) {
    function MainCtrl($scope,Topology,DataStore,TreeLayout) {
        Topology.initTopology('topology');
        // Topology.layout(TreeLayout.init());
        Topology.drew(DataStore.topologyData());
    }

    MainCtrl.$inject = ['$scope','TopologyService','DataStoreService','TreeLayoutService'];
    app.controller('MainCtrl', MainCtrl);
})(app);