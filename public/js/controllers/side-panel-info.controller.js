(function(app) {
    function SidePanelInfoCtrl($scope, DataStore, Topology, Onem2m) {
        $scope.hide = false;
        $scope.path = [];
        var tree = {};

        $scope.ancestor = function(index) {
            $scope.path.splice(index + 1);
        };

        $scope.children = function(name) {
            $scope.path.push(name);
        };

        $scope.parent = function() {
            $scope.path.pop();
        };

        $scope.yourName = function() {
            return $scope.path.slice(-1)[0];
        };

        $scope.yourself = function() {
            var place = tree;
            $scope.path.forEach(function(p) {
                place = place[p];
            });
            return place;
        };

        $scope.isValue = function(value) {
            return !angular.isObject(value);
        };

        $scope.isRoot = function() {
            return $scope.path.length == 1;
        };

        DataStore.addSelectNodeListener(function(selectNode){
          tree = {};
          $scope.path = [];
          var node = selectNode;
          tree[node.key] = node.value;
          $scope.path.push(node.key);
          $scope.$apply();
        })
    }

    SidePanelInfoCtrl.$inject = ['$scope', 'DataStoreService', 'TopologyService', 'Onem2mHelperService'];
    app.controller('SidePanelInfoCtrl', SidePanelInfoCtrl);
})(app);
