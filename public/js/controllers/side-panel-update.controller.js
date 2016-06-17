(function(app) {
    'use strict';
    var ROOT_KEY = "Request Primitive";

    function SidePanelUpdateCtrl($scope, Topology, TopologyHelper, DataStore, Onem2m, CRUD) {
        var _this = this;

        _this.path = [];
        _this.root = {};
        _this.root_copy = {};
        _this.request = {};
        _this.request_copy = {};

        _this.ancestor = ancestor;
        _this.children = children;
        _this.parent = parent;
        _this.yourName = yourName;
        _this.yourself = yourself;
        _this.copyYourself = copyYourself;
        _this.isValue = isValue;
        _this.isRoot = isRoot;
        _this.submit = submit;
        _this.isEdited = isEdited;

        _this.isArray=isArray;
        _this.addOneItem=addOneItem;
        _this.removeOneItem=removeOneItem;

        init();

        function init() {
            var node = TopologyHelper.getSelectedNode();
            _this.request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.update);
            _this.request.from = Onem2m.assignFrom();
            _this.request.requestIdentifier = Onem2m.assignRequestIdentifier();
            _this.request.to = Onem2m.id(node);

            var resourceType = Onem2m.readResourceType(node);
            var template = Onem2m.getResourceByResourceTypeAndOperation(resourceType, Onem2m.operation.update);

            if (template) {
                var key = node.key;
                readDataToTemplate(template[key], node.value);
                _this.request.primitiveContent = template;

                _this.root = {};
                _this.path = [];
                _this.root[ROOT_KEY] = _this.request;

                _this.root_copy = angular.copy(_this.root);
                _this.request_copy = _this.root_copy[ROOT_KEY];
                _this.path.push(ROOT_KEY, "primitiveContent", key);
            }
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

        function copyYourself() {
            var place = _this.root_copy;
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

        function readDataToTemplate(targetObject, srcObject) {
            for (var key in targetObject) {
                targetObject[key] = srcObject[key];
            }
        }

        function submit(request) {
            request.primitiveContent = diff(request.primitiveContent, _this.request_copy.primitiveContent);
            request = Onem2m.toOnem2mJson(request);
            CRUD.CRUD(request).then(function(data) {
                DataStore.updateNode(data);
                Topology.update();
                $scope.$emit("closeSidePanel");
            });
        }

        function diff(object, copy) {
            var key = Object.keys(object)[0];
            var difference = {};
            difference[key] = {};
            for (var k in object[key]) {
                if (!angular.equals(copy[key][k], object[key][k])) {
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

    SidePanelUpdateCtrl.$inject = ['$scope', 'TopologyService', 'TopologyHelperService', 'DataStoreService', 'Onem2mHelperService', 'Onem2mCRUDService'];
    app.controller('SidePanelUpdateCtrl', SidePanelUpdateCtrl);
})(app);
