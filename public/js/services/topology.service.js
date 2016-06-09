(function(app) {
    var selectNodeListeners = [];
    var unSelectNodeListeners = [];

    function TopologyService(nx, DataStore, Onem2m) {

        var _layout = function(data) {
            return data;
        };

        var _dataStoreAccessKey = {
            getData: function() {
                return null;
            }
        }

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

        //todo: isSelectNodeAction is stopPropagation Flag since Event.stopPropagation not work. Need to ask
        this.initTopology = function(htmlElementId) {
            var application = new onem2m.Tree();
            var isSelectNodeAction = false;
            application.container(document.getElementById(htmlElementId));
            application.start();
            _topo.on('topologyGenerated', function(sender, event) {
                sender.eachNode(function(node) {
                    node.onclickNode(function(sender, event) {
                        selectNode(sender.id());
                        isSelectNodeAction = true;
                    });
                });
                _topo.adaptToContainer();
            });
            _topo.on('clickStage', function(sender, event) {
                if (!isSelectNodeAction) {
                    unSelectNode();
                }
                isSelectNodeAction = false;
            });
        };

        this.layout = function(layout) {
            _layout = layout;
        };

        this.setDataStoreAccessKey = function(dataStoreAccessKey) {
            _dataStoreAccessKey = dataStoreAccessKey;
        }

        this.update = function() {
            var data = _dataStoreAccessKey.getData();
            data = _layout(data);
            _topo.data(data);
        };

        this.addSelectNodeListener = addSelectNodeListener;
        this.addUnSelectNodeListener = addUnSelectNodeListener;

        function addSelectNodeListener(listener) {
            selectNodeListeners.push(listener);
        };

        function addUnSelectNodeListener(listener) {
            unSelectNodeListeners.push(listener);
        };

        function selectNode(id) {
            var selectNode = DataStore.retrieveNode(id);
            notifyListeners(selectNodeListeners, selectNode);
        };

        function unSelectNode() {
            notifyListeners(unSelectNodeListeners);
        };

        function notifyListeners(listeners, notification) {
            listeners.forEach(function(listener) {
                listener(notification);
            })
        }
    }

    TopologyService.$inject = ['NxService', 'DataStoreService', 'Onem2mHelperService'];
    app.service('TopologyService', TopologyService)
})(app);
