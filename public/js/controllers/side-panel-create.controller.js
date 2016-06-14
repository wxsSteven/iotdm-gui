(function(app) {
    'use strict';
    var ROOT_KEY = "Request Primitive";

    function SidePanelCreateCtrl($scope, Topology, TopologyHelper, DataStore, Onem2m, CRUD) {
        var _this = this;

        _this.hide = false;
        _this.path = [];
        _this.tree = {};
        _this.request = {};
        _this.ancestor = ancestor;
        _this.children = children;
        _this.parent = parent;
        _this.yourName = yourName;
        _this.yourself = yourself;
        _this.isValue = isValue;
        _this.isRoot = isRoot;
        _this.submit = submit;

        init();

        function init() {
            $scope.$watch(function() {
                    return _this.request.resourceType;
                },
                function(newValue, oldValue) {
                    if (newValue && newValue != oldValue) {
                        var resource = Onem2m.getResourceByResourceTypeAndOperation(newValue, Onem2m.operation.create);
                        _this.request.primitiveContent = resource;
                        _this.request.resourceType = newValue;
                        _this.path.push("primitiveContent");
                        Object.keys(resource).forEach(function(key) {
                            _this.path.push(key);
                        });
                    } else {
                        _this.request.primitveContent = null;
                    }
                });
            reset();
        }

        function reset() {
            var node = TopologyHelper.getSelectedNode();
            _this.request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.create);
            _this.request.from = Onem2m.assignFrom();
            _this.request.requestIdentifier = Onem2m.assignRequestIdentifier();
            _this.request.to = Onem2m.id(node);
            _this.tree = {};
            _this.path = [];
            _this.tree[ROOT_KEY] = _this.request;
            _this.path.push(ROOT_KEY);
        }

        function ancestor(index) {
            _this.path.splice(index + 1);
        }

        function children(name) {
            _this.path.push(name);
        }

        function parent() {
            _this.path.pop();
        }

        function yourName() {
            return _this.path.slice(-1)[0];
        }

        function yourself() {
            var place = _this.tree;
            _this.path.forEach(function(p) {
                place = place[p];
            });
            return place;
        }

        function isValue(value) {
            return !(angular.isObject(value));
        }

        function isRoot() {
            return _this.path.length == 1;
        }

        function submit(request) {
            request = Onem2m.toOnem2mJson(request);
            CRUD.CRUD(request).then(function(data) {
                DataStore.addNode(data);
                Topology.update();
                $scope.$emit("closeSidePanel");
            });
        }
    }

    SidePanelCreateCtrl.$inject = ['$scope', 'TopologyService', 'TopologyHelperService', 'DataStoreService', 'Onem2mHelperService', 'Onem2mCRUDService'];
    app.controller('SidePanelCreateCtrl', SidePanelCreateCtrl);
})(app);
