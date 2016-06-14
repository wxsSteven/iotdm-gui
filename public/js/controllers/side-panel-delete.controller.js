(function(app) {
    'use strict';
    var ROOT_KEY = "Request Primitive";

    function SidePanelDeleteCtrl($scope, Topology, TopologyHelper, DataStore, Onem2m, CRUD) {
        var _this = this;
        _this.hide = false;
        _this.root = {};
        _this.path = [];
        _this.request = {};
        _this.advancedMode = false;
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
                return _this.advancedMode;
            }, function(advancedMode) {
                var request = {};
                if (advancedMode) {
                    _this.request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.delete);
                } else {
                    _this.request={};
                }
                reset();
            });
            reset();
        }

        function reset() {
            _this.request.operation = Onem2m.operation.delete;
            _this.request.from = Onem2m.assignFrom();
            _this.request.requestIdentifier = Onem2m.assignRequestIdentifier();
            _this.request.to = Onem2m.id(TopologyHelper.getSelectedNode());

            _this.root = {};
            _this.path = [];
            _this.root[ROOT_KEY] = _this.request;
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
            var place = _this.root;
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
                DataStore.removeNode(data);
                Topology.update();
                $scope.$emit("closeSidePanel");
            });
        }
    }

    SidePanelDeleteCtrl.$inject = ['$scope', 'TopologyService', 'TopologyHelperService', 'DataStoreService', 'Onem2mHelperService', 'Onem2mCRUDService'];
    app.controller('SidePanelDeleteCtrl', SidePanelDeleteCtrl);
})(app);
