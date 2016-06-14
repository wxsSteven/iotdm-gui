(function(app) {
    'use strict';

    function SidePanelInfoCtrl($scope, Topology, TopologyHelper, Onem2m) {
        var _this = this;

        _this.root = {};
        _this.path = [];

        _this.ancestor = ancestor;
        _this.children = children;
        _this.parent = parent;
        _this.yourName = yourName;
        _this.yourself = yourself;
        _this.isValue = isValue;
        _this.isRoot = isRoot;

        init();

        function init() {
            var key = Topology.addSelectNodeListener(function() {
                reset(TopologyHelper.getSelectedNode());
                $scope.$apply();
            });

            $scope.$on("$destory", function() {
                Topology.removeSelectNodeListener(key);
            });

            reset(TopologyHelper.getSelectedNode());
        }

        function reset(node) {
            _this.root = {};
            _this.path = [];
            _this.root[node.key] = node.value;
            _this.path.push(node.key);
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
            return !angular.isObject(value);
        }

        function isRoot() {
            return _this.path.length == 1;
        }
    }

    SidePanelInfoCtrl.$inject = ['$scope', 'TopologyService', 'TopologyHelperService', 'Onem2mHelperService'];
    app.controller('SidePanelInfoCtrl', SidePanelInfoCtrl);
})(app);
