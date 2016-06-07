(function (app) {
    function TopologyService(nx,$rootScope) {

        var _layout=function(data){
            return data;
        };

        var _topo = new nx.graphic.Topology({
            adaptive: true,
            nodeConfig: {
                iconType: function (vertex) {
                    return "ae";
                },
                label:function(vertex){
                    return vertex.get('value.rn');
                }
            },
            showIcon: true,
            identityKey:'value.ri',
            dataProcessor:'force'
        });

        nx.define('onem2m.Tree', nx.ui.Application, {
            methods: {
                start: function () {
                    _topo.attach(this);
                }
            }
        });

        this.initTopology = function (htmlElementId) {
            var application = new onem2m.Tree();
            application.container(document.getElementById(htmlElementId));
            application.start();
        };

        this.layout=function(layout){
            _layout=layout;
        };

        this.drew=function(data){
            data=_layout(data);
            _topo.data(data);
            _topo.on('topologyGenerated',function(sender,event){
                _topo.eachNode(function (node) {
                    node.onselectNode(function (sender, events) {
                            $rootScope.$broadcast("select:node",sender.id());
                        }
                    );
                });
                _topo.adaptToContainer();
            });
        };
    }

    TopologyService.$inject = ['NxService','$rootScope'];
    app.service('TopologyService', TopologyService)
})(app);