'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', ['ngMaterial', 'onem2m']);

app.controller("ctrl", function ($scope,Onem2mDataStore) {
    $scope.data = Onem2mDataStore.root;
    $scope.node = null;

    $scope.$watch('node', function (node) {
        $scope.node = node;
    });
}).directive("side", function () {
    return {
        restrict: 'E',
        templateUrl: "./template/side.html",
        scope: {
            node: "="
        },
        controller: function ($scope) {

            $scope.side = {
                show: null,
                icon: null,
                stairs: [],
                data: {}
            };


            $scope.toggleSide = function () {
                var chevrons = ["chevron_right", "chevron_left"];
                return function () {
                    if ($scope.node) {
                        $scope.side.show = !$scope.side.show;
                        if ($scope.side.show) {
                            $scope.side.icon = chevrons[0];
                        } else {
                            $scope.side.icon = chevrons[1];
                        }
                    }
                };
            }();

            $scope.goToStair = function (index) {
                $scope.side.stairs.splice(index + 1);
            };

            $scope.currentStair = function () {
                var data = $scope.side.data;

                $scope.side.stairs.forEach(function (name) {
                        data = data[name];
                    }
                );
                return data;
            };

            $scope.upperStair = function () {
                $scope.side.stairs.splice($scope.side.stairs.length - 1);
            };

            $scope.downStair = function (name) {
                var currentNode = $scope.side.data;
                $scope.side.stairs.push(name);

                $scope.side.stairs.forEach(function (name) {
                        currentNode = currentNode[name];
                    }
                );
                return currentNode;
            };

            $scope.currentStairName = function () {
                return $scope.side.stairs[$scope.side.stairs.length - 1];
            };

            $scope.isTopStair = function () {
                return $scope.side.stairs.length <= 1;
            };

            $scope.isLastStair = function (stair) {
                return !angular.isObject(stair) && !angular.isArray(stair);
            };

            //todo:  key and $scope.side.data[key] = n.value; are too coupled
            $scope.$watch('node', function (n) {
                if (n) {
                    var key = n.key;
                    $scope.side.show = true;
                    $scope.side.icon = "chevron_right";
                    $scope.side.stairs = [key];
                    $scope.side.data[key] = n.value;
                } else {
                    $scope.side.show = false;
                    $scope.side.stairs = [];
                    $scope.side.data = {};
                    $scope.side.icon = "chevron_left";
                }
            });
            this.downStair = $scope.downStair;
        }
    }
}).service('nx', function () {
    if (!nx) {
        throw('nx is not available');
    }
    return nx;
}).service('d3', function () {
    if (!d3)
        throw('d3 is not available');
    return d3
}).service("InterpretName", function () {
    return function (key) {
        key = key.toString();
        var array = key.split("|||");

        var mandatoryAttr = ['name', 'description'];
        var optionAttr = ['mandatory', 'disabled'];

        var name = {};
        name.name = array.shift();
        name.description = array.shift();
        array.forEach(function (key) {
            name[key] = optionAttr.indexOf(key) > -1;
        });
        return name;
    }
}).service("Onem2mValueHandler", function ($filter) {
    var numberHandler = function (str) {
        return Number(str);
    };
    var stringHandler = function (str) {
        return str.toString();
    };
    var booleanHandler = function (str) {
        return str === 'true';
    };

    var dateHandler = function (str) {
        var date = Date.parse(str);
        return $filter('date')(date, "yyyyMMddTHHmmss");
    };

    var enumHandler = function () {

    }
}).constant('TopologyConfig', {
    icons: {
        value: ["CSEBase", "AE", "container", "contentInstance", "group", "node", "accessControlPolicy", "observe", "unobserve", "subscription"],
        location: "icon",
        format: "svg",
        width: 50,
        height: 50
    }
}).directive("onem2mTopology", function (nx, d3, TopologyConfig, Onem2m) {
    function registerIcon() {
        TopologyConfig.icons.value.forEach(function (icon) {
            var location = TopologyConfig.icons.location;
            var format = TopologyConfig.icons.format;
            var width = TopologyConfig.icons.width;
            var height = TopologyConfig.icons.height;
            var file = location + "/" + icon + "." + format;
            nx.graphic.Icons.registerIcon(icon.toLowerCase(), file, width, height);
        });
    }


    function onem2mChildren(node) {
        return node.value.ch;
    }

    function onem2mId(node) {
        if (!node)
            return "value.ri";
        return node.value.ri;
    }

    function onem2mLabel(node) {
        if (!node)
            return "value.rn";
        return node.value.rn;
    }

    function onem2mIcon(node) {
        if (!node)
            return "value.ty";
        return node.value.ty;
    }

    function treeDataProcessor(data) {
        var tree = d3.layout.tree();
        tree.children(function (d) {
            return onem2mChildren(d);
        });

        var nodes = tree.nodes(data);
        nodes.forEach(function (node) {
            var y = node.y;
            node.y = 50 * node.x;
            node.x = 50 * y;
        });

        var links = tree.links(nodes);
        var nextLinks = [];

        links.forEach(function (link) {
            nextLinks.push({
                source: onem2mId(link.source),
                target: onem2mId(link.target)
            });
        });

        return {
            nodes: nodes,
            links: nextLinks
        };
    }


    return {
        restrict: 'E',
        scope: {
            data: "=",
            node: "="
        },
        link: function (scope, element, attr) {
            registerIcon();
            var data = treeDataProcessor(scope.data);

            function findNodeById(id) {
                var result = null;
                data.nodes.forEach(function (node) {
                    if (onem2mId(node) == id)
                        result = node;
                });
                return result;
            }


            nx.define("nx.tree", nx.ui.Component, {
                properties: {
                    icon: {
                        value: function () {
                            return function (vertex) {
                                var resourceTypeValue = vertex.get(onem2mIcon());
                                var resourceTypeName = Onem2m.resourceTypeName(resourceTypeValue);
                                return resourceTypeName.toLowerCase();
                            }
                        }
                    }
                },
                view: {
                    content: {
                        type: 'nx.graphic.Topology',
                        props: {
                            adaptive: true,
                            nodeConfig: {
                                label: function (vertex) {
                                    return vertex.get(onem2mLabel());
                                },
                                iconType: '{#icon}'
                            },
                            showIcon: true,
                            data: data,
                            identityKey: onem2mId()
                        },
                        events: {
                            'topologyGenerated': '{#_main}'
                        }
                    }
                },
                methods: {
                    _main: function (sender, events) {
                        var topo = sender;
                        topo.eachNode(function (node) {
                            node.onselectNode(function (sender, events) {
                                    if (events) {
                                        var nodeId = sender.id();
                                        scope.node = findNodeById(nodeId);
                                    } else {
                                        scope.node = null;
                                    }
                                    scope.$apply();
                                }
                            );
                        });
                    }
                }
            });

            var app = nx.define(nx.ui.Application, {
                methods: {
                    start: function () {
                        var tree = new nx.tree();
                        tree.attach(this);
                    }
                }
            });

            app = new app();
            app.container(document.getElementById('main'));
            app.start();
        }
    };
});
