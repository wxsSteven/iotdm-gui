(function(app,d3){
    function TreeLayoutService(Onem2m){
        if(!d3)
            throw "ThreeLayoutService dependent on d3, which is not exist";

        this.init=init;
        function init (hGap,vGap) {
            return function (data) {
                hGap=hGap?hGap:50;
                vGap=vGap?vGap:50;

                var tree = d3.layout.tree();
                tree.children(function (d) {
                    return Onem2m.children(d);
                });

                var nodes = tree.nodes(data);
                nodes.forEach(function (node) {
                    var y = node.y;
                    node.y = hGap * node.x;
                    node.x = vGap * y;
                });

                var links = tree.links(nodes);
                var nextLinks = [];

                links.forEach(function (link) {
                    nextLinks.push({
                        source: Onem2m.id(link.source),
                        target: Onem2m.id(link.target)
                    });
                });

                return {
                    nodes: nodes,
                    links: nextLinks
                };
            }
        }
    }
    TreeLayoutService.$inject=['Onem2mService'];
    app.service('TreeLayoutService',TreeLayoutService);
})(app,d3);