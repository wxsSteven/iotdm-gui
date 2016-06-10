(function(app, d3) {
    function TreeLayoutService(Onem2m) {
        if (!d3)
            throw "ThreeLayoutService dependent on d3, which is not exist";

        this.init = init;

        function init(hGap, vGap) {
            var _hGap = hGap ? hGap : 50;
            var _vGap = vGap ? vGap : 50;
            return function(data) {
                var tree = d3.layout.tree();

                var root=toTreeStructure(data.nodes);
                var nodes = tree.nodes(root);
                nodes.forEach(function(node) {
                    var y = node.y;
                    node.y = _hGap * node.x;
                    node.x = _vGap * y;
                    // delete node["children"];
                    delete node["parent"];
                    delete node["depth"];
                });
                return data;
            }
        }

        function toTreeStructure(nodes) {
            var idToNodeMap = {};
            var root = null;

            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                node.children = [];
                var id=Onem2m.id(node);
                idToNodeMap[id]=node;
            }

            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                idToNodeMap[Onem2m.id(node)] = node;

                if (typeof Onem2m.parentId(node) === "undefined") {
                    root = node;
                } else {
                    var parentNode = idToNodeMap[Onem2m.parentId(node)];
                    parentNode.children.push(node);
                }
            }
            return root;
        }
    }
    TreeLayoutService.$inject = ['Onem2mHelperService'];
    app.service('TreeLayoutService', TreeLayoutService);
})(app, d3);
