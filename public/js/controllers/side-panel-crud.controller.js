(function(app) {
    'use strict';

    var ROOT_KEY = "Request Primitive";

    function SidePanelCRUDCtrl($scope, Topology, TopologyHelper, DataStore, Onem2m, CRUD) {
        var _this = this;

        _this.operation = $scope.operation;

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

        _this.isArray = isArray;
        _this.addOneItem = addOneItem;
        _this.removeOneItem = removeOneItem;

        init();

        function init() {
            var reset = null;
            if (_this.operation === Onem2m.operation.create) {
                reset = function() {
                    var node = TopologyHelper.getSelectedNode();
                    _this.request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.create);
                    _this.request.from = Onem2m.assignFrom();
                    _this.request.requestIdentifier = Onem2m.assignRequestIdentifier();
                    _this.request.to = Onem2m.id(node);
                    _this.root = {};
                    _this.path = [];
                    _this.root[ROOT_KEY] = _this.request;
                    _this.path.push(ROOT_KEY);
                };
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
                            _this.request.primitiveContent = null;
                        }
                    });
                reset();
            } else if (_this.operation === Onem2m.operation.retrieve) {
                _this.advancedMode = false;
                _this.mode = "Childrens";
                _this.modes = [
                    "Childrens",
                    "Descendants",
                    "Custom"
                ];
                _this.hasMultipleModes = true;
                reset = function() {
                    _this.root = {};
                    _this.path = [];
                    _this.root[ROOT_KEY] = _this.request;
                    _this.path.push(ROOT_KEY);
                };
                _this.twoModes = true;
                reset();
                $scope.$watch(function() {
                    return _this.mode;
                }, function(newMode) {
                    if (newMode) {
                        _this.inputDisabled = true;
                        _this.request = newMode === _this.modes[2] ? Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.retrieve) : {};
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
            } else if (_this.operation === Onem2m.operation.update) {
                _this.showChange = true;
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
            } else if (_this.operation === Onem2m.operation.delete) {
                _this.hasTwoModes = true;
                reset = function() {
                    _this.request.operation = Onem2m.operation.delete;
                    _this.request.from = Onem2m.assignFrom();
                    _this.request.requestIdentifier = Onem2m.assignRequestIdentifier();
                    _this.request.to = Onem2m.id(TopologyHelper.getSelectedNode());

                    _this.root = {};
                    _this.path = [];
                    _this.root[ROOT_KEY] = _this.request;
                    _this.path.push(ROOT_KEY);
                };
                $scope.$watch(function() {
                    return _this.advancedMode;
                }, function(advancedMode) {
                    var request = {};
                    if (advancedMode) {
                        _this.request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.delete);
                    } else {
                        _this.request = {};
                    }
                    reset();
                });
                reset();
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

        function readDataToTemplate(targetObject, srcObject) {
            var src = {};
            for (var key in targetObject) {
                src[key] = srcObject[key];
            }

            var sQ = [src],
                tQ = [targetObject];

            while (sQ.length > 0) {
                var s = sQ.shift();
                var t = tQ.shift();
                for (var k in s) {
                    if (angular.isArray(s[k])) {
                        var i = s[k].length - 1;
                        var template = angular.copy(t[k][0]);
                        while (i > -1) {
                            var item = s[k][i--];
                            if (angular.isObject(item)) {
                                t[k].unshift(template);
                                sQ.push(item);
                                tQ.push(template);
                            } else {
                                t[k].unshift(item);
                            }
                        }
                    } else if (angular.isObject(s[k])) {
                        sQ.push(s[k]);
                        tQ.push(t[k]);
                    } else if (s[k] !== null && s[k] !== undefined) {
                        t[k] = s[k];
                    }
                }
            }
        }

        function isValue(value) {
            return !(angular.isObject(value));
        }

        function isRoot() {
            return _this.path.length == 1;
        }

        function submit(request) {
            if(_this.operation===Onem2m.operation.update){
              request.primitiveContent = diff(request.primitiveContent, _this.request_copy.primitiveContent);
            }
            request = Onem2m.toOnem2mJson(request);
            CRUD.CRUD(request).then(function(data) {
                if (_this.operation === Onem2m.operation.delete) {
                    DataStore.removeNode(data);
                } else {
                    DataStore.addNode(data);
                }
                Topology.update();
                $scope.$emit("closeSidePanel");
            });
        }

        function isArray(value) {
            return angular.isArray(value);
        }

        function addOneItem() {
            var place = yourself();
            var last = place[place.length - 1];
            place.unshift(angular.copy(last));
        }

        function removeOneItem(index) {
            var place = yourself();
            place.splice(index, 1);
        }
    }
    SidePanelCRUDCtrl.$inject = ['$scope', 'TopologyService', 'TopologyHelperService', 'DataStoreService', 'Onem2mHelperService', 'Onem2mCRUDService'];
    app.controller("SidePanelCRUDCtrl", SidePanelCRUDCtrl);
})(app);
