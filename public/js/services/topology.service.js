(function(app) {
    function TopologyService(nx, DataStore, Onem2m) {

        var _layout = function(data) {
            return data;
        };

        var _topo = new nx.graphic.Topology({
            adaptive: true,
            nodeConfig: {
                iconType: function(vertex) {
                    return Onem2m.icon(vertex.getData());
                },
                label: function(vertex) {
                    return Onem2m.label(vertex.getData());
                }
            },
            showIcon: true,
            identityKey: Onem2m.id(),
            dataProcessor: 'force'
        });

        nx.define('onem2m.Tree', nx.ui.Application, {
            methods: {
                start: function() {
                    _topo.attach(this);
                }
            }
        });

        this.initTopology = function(htmlElementId) {
            var application = new onem2m.Tree();
            application.container(document.getElementById(htmlElementId));
            application.start();
        };

        this.layout = function(layout) {
            _layout = layout;
        };

        this.drew = function(data) {
          //todo: isSelectNodeAction is stopPropagation Flag since Event.stopPropagation not work. Need to ask
            var isSelectNodeAction = false;
            data = _layout(data);
            _topo.on('topologyGenerated', function(sender, event) {
                sender.eachNode(function(node) {
                    node.onclickNode(function(sender, event) {
                        DataStore.selectNode(sender.id());
                        isSelectNodeAction = true;
                    });
                });
                _topo.adaptToContainer();
            });
            _topo.on('clickStage', function(sender, event) {
                if (!isSelectNodeAction) {
                    DataStore.unSelectNode();
                }
                isSelectNodeAction = false;
            });
            _topo.data(data);
        };
    }

    TopologyService.$inject = ['NxService', 'DataStoreService', 'Onem2mHelperService'];
    app.service('TopologyService', TopologyService)
})(app);
