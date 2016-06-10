(function(app) {

    var ROOT_KEY = "Retrieve";
    var TREE = {};

    function SidePanelRetrieveCtrl($scope, Topology, DataStore,CRUD, Onem2m) {
        $scope.hide = false;
        $scope.path = [];
        $scope.request = {};
        $scope.selectedMode = null;
        $scope.modes = {
            0: "Childrens",
            1: "Descendants",
            2: "Custom"
        }

        $scope.ancestor = ancestor;
        $scope.children = children;
        $scope.parent = parent;
        $scope.yourName = yourName;
        $scope.yourself = yourself;
        $scope.isValue = isValue;
        $scope.isRoot = isRoot;
        $scope.submit = submit;
        $scope.inputDisabled = false;

        $scope.$watch('selectedMode', function(newMode) {
            if (newMode == 0) {
                $scope.inputDisabled = true;
                var request = {};
                request.from = $scope.request.from;
                request.requestIdentifier = $scope.request.requestIdentifier;
                request.to = $scope.request.to;
                request.operation = $scope.request.operation;
                request.resultContent = Onem2m.resultContent["attributes and child resources"];
                $scope.request = request;
            } else if (newMode == 1) {
                $scope.inputDisabled = true;
                var request = {};
                request.from = $scope.request.from;
                request.requestIdentifier = $scope.request.requestIdentifier;
                request.to = $scope.request.to;
                request.operation = $scope.request.operation;
                request.filterCriteria = {};
                request.filterCriteria.filterUsage = Onem2m.filterUsage["Discovery Criteria"];
                $scope.request = request;
            } else {
                $scope.inputDisabled = false;
                var request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.retrieve);
                request.from = $scope.request.from;
                request.requestIdentifier = $scope.request.requestIdentifier;
                request.to = $scope.request.to;
                $scope.request = request;
            }
            initTree($scope.request);
        });

        Topology.addSelectNodeListener(function(selectNode) {
            $scope.selectedMode = 0;

            $scope.request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.retrieve);
            $scope.request.from = Onem2m.assignFrom();
            $scope.request.requestIdentifier = Onem2m.assignRequestIdentifier();
            $scope.request.to = Onem2m.id(selectNode);
            $scope.request.resultContent = Onem2m.resultContent["attributes and child resources"];

            initTree($scope.request);
            $scope.$apply();
        })

        function initTree(request) {
            TREE = {};
            $scope.path = [];
            TREE[ROOT_KEY] = request;
            $scope.path.push(ROOT_KEY);
        };

        function ancestor(index) {
            $scope.path.splice(index + 1);
        };

        function children(name) {
            $scope.path.push(name);
        };

        function parent() {
            $scope.path.pop();
        };

        function yourName() {
            return $scope.path.slice(-1)[0];
        };

        function yourself() {
            var place = TREE;
            $scope.path.forEach(function(p) {
                place = place[p];
            });
            return place;
        };

        function isValue(value) {
            return !(angular.isObject(value));
        };

        function isRoot() {
            return $scope.path.length == 1;
        };

        function submit(request) {
            request = Onem2m.toOnem2mJson(request);
            if ($scope.selectedMode == 0) {
                CRUD.CRUD(request).then(function(datas) {
                    DataStore.addNode(datas);
                    Topology.update();
                    $scope.$emit("closeSidePanel");
                });
            } else if ($scope.selectedMode == 1) {
                CRUD.CRUD(request).then(function(datas) {
                    DataStore.addNode(datas);
                    Topology.update();
                    $scope.$emit("closeSidePanel");
                });
            } else if ($scope.selectedMode == 2) {
                CRUD.CRUD(request).then(function(data) {
                    DataStore.addNode(data);
                    Topology.update();
                    $scope.$emit("closeSidePanel");
                });
            }
            $scope.selectedMode=null;
        };
    }

    SidePanelRetrieveCtrl.$inject = ['$scope', 'TopologyService','DataStoreService', 'Onem2mCRUDService', 'Onem2mHelperService'];
    app.controller('SidePanelRetrieveCtrl', SidePanelRetrieveCtrl);
})(app);
