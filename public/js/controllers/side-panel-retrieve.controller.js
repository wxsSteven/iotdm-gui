(function(app) {
    'use strict';
    var ROOT_KEY = "Retrieve";

    function SidePanelRetrieveCtrl($scope, Topology, TopologyHelper, DataStore, CRUD, Onem2m) {
        var _this = this;

        _this.path = [];
        _this.root = {};
        _this.request = {};
        _this.mode = "Childrens";
        _this.modes = [
            "Childrens",
            "Descendants",
            "Custom"
        ];

        _this.ancestor = ancestor;
        _this.children = children;
        _this.parent = parent;
        _this.yourName = yourName;
        _this.yourself = yourself;
        _this.isValue = isValue;
        _this.isRoot = isRoot;
        _this.submit = submit;
        _this.inputDisabled = false;

        _this.isArray=isArray;
        _this.addOneItem=addOneItem;
        _this.removeOneItem=removeOneItem;

        init();

        function init() {
            reset();
            $scope.$watch(function() {
                return _this.mode;
            }, function(newMode) {
                if (newMode) {
                    _this.inputDisabled = true;
                    _this.request = newMode === _this.modes[2]?Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.retrieve):{};
                    _this.request.operation = Onem2m.operation.retrieve;
                    _this.request.from = Onem2m.assignFrom();
                    _this.request.requestIdentifier = Onem2m.assignRequestIdentifier();
                    _this.request.to = Onem2m.id(TopologyHelper.getSelectedNode());
                    if (newMode === _this.modes[0]) {
                        _this.request.resultContent = Onem2m.resultContent["attributes and child resources"];
                    } else if (newMode === _this.modes[1]) {
                        _this.request.filterCriteria = {};
                        _this.request.filterCriteria.filterUsage = Onem2m.filterUsage["Discovery Criteria"];
                    }
                    reset();
                }
            });
        }

        function reset() {
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
                DataStore.addNode(data);
                Topology.update();
                $scope.$emit("closeSidePanel");
            });
        }

        function isArray(value){
          return angular.isArray (value);
        }

        function addOneItem(){
          var place=yourself();
          var last=place[place.length-1];
          place.unshift(angular.copy(last));
        }

        function removeOneItem(index){
          var place=yourself();
          place.splice(index,1);
        }

    }

    SidePanelRetrieveCtrl.$inject = ['$scope', 'TopologyService', 'TopologyHelperService', 'DataStoreService', 'Onem2mCRUDService', 'Onem2mHelperService'];
    app.controller('SidePanelRetrieveCtrl', SidePanelRetrieveCtrl);
})(app);
