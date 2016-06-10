(function(app) {
    var ROOT_KEY = "Request Primitive";
    var TREE = {};
    var COPY_TREE = {};
    var COPY_REQUEST = {};

    function SidePanelUpdateCtrl($scope, Topology, DataStore, Onem2m, CRUD) {
        $scope.hide = false;
        $scope.path = [];
        $scope.request = {};


        Topology.addSelectNodeListener(function(selectNode) {
            $scope.request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.update);
            $scope.request.from = Onem2m.assignFrom();
            $scope.request.requestIdentifier = Onem2m.assignRequestIdentifier();
            $scope.request.to = Onem2m.id(selectNode);

            var resourceType = Onem2m.readResourceType(selectNode);
            var template = Onem2m.getResourceByResourceTypeAndOperation(resourceType, Onem2m.operation.update);

            if (template) {
                var key = selectNode.key;
                readDataToTemplate(template[key], selectNode.value);
                $scope.request.primitiveContent = template;

                TREE = {};
                $scope.path = [];
                TREE[ROOT_KEY] = $scope.request;

                COPY_TREE = angular.copy(TREE);
                COPY_REQUEST = COPY_TREE[ROOT_KEY];
                $scope.path.push(ROOT_KEY, "primitiveContent", key);
                $scope.$apply();
            }
        })

        $scope.ancestor = ancestor;
        $scope.children = children;
        $scope.parent = parent;
        $scope.yourName = yourName;
        $scope.yourself = yourself;
        $scope.copyYourself = copyYourself;
        $scope.isValue = isValue;
        $scope.isRoot = isRoot;
        $scope.submit = submit;
        $scope.isEdited = isEdited;

        function initTree(request) {

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

        function copyYourself() {
            var place = COPY_TREE;
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

        function readDataToTemplate(targetObject, srcObject) {
            for (var key in targetObject) {
                targetObject[key] = srcObject[key];
            }
        }

        function submit(request) {
            request.primitiveContent = diff(request.primitiveContent, COPY_REQUEST.primitiveContent);
            request = Onem2m.toOnem2mJson(request);
            CRUD.CRUD(request).then(function(data) {
                DataStore.updateNode(data);
                Topology.update();
                $scope.$emit("closeSidePanel");
            });
        };

        function diff(object, copy) {
            var key = Object.keys(object)[0];
            var difference = {};
            difference[key] = {};
            for (var k in object[key]) {
                if (!angular.equals(copy[key][k],object[key][k])) {
                    difference[key][k] = object[key][k];
                }
            }
            return difference;
        }

        function isEdited(name) {
            var you = yourself();
            var copy = copyYourself();
            return angular.equals(you[name], copy[name]);
        }
    }

    SidePanelUpdateCtrl.$inject = ['$scope', 'TopologyService', 'DataStoreService', 'Onem2mHelperService', 'Onem2mCRUDService'];
    app.controller('SidePanelUpdateCtrl', SidePanelUpdateCtrl);
})(app);
