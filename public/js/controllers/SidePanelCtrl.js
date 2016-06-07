(function (app) {
    function SidePanelCtrl($scope, DataStore, Topology) {
        $scope.hide = true;
        $scope.path = [];
        var tree = {};

        $scope.toggle = function () {
            $scope.hide = !$scope.hide;

            //todo how to avoid this hard code
            window.setTimeout(function () {
                Topology.drew(DataStore.topologyData())
            }, 500);
        };

        $scope.ancestor = function (index) {
            $scope.path.splice(index + 1);
        };

        $scope.children = function (name) {
            $scope.path.push(name);
        };

        $scope.parent = function () {
            $scope.path.pop();
        };

        $scope.yourName = function () {
            return $scope.path.slice(-1)[0];
        };

        $scope.yourself = function () {
            var place = tree;
            $scope.path.forEach(function (p) {
                place = place[p];
            });
            return place;
        };

        $scope.isValue = function (value) {
            return !angular.isObject(value);
        };

        $scope.isRoot = function () {
            return $scope.path.length == 1;
        };


        $scope.$on("select:node", function (event, nodeId) {
            tree = {};
            $scope.path = [];
            var node = DataStore.retrieveNode(nodeId);
            tree[node.key] = node.value;
            $scope.path.push(node.key);
            $scope.$apply();
        });
    }

    SidePanelCtrl.$inject = ['$scope', 'DataStoreService', 'TopologyService'];
    app.controller('SidePanelCtrl', SidePanelCtrl);
})(app);