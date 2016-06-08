(function(app) {
    var cacheNodesById = {};
    var cacheLinksBySourceId = {};
    var selectNode = {};

    var selectNodeListeners = [];
    var unSelectNodeListeners = [];

    function DataStoreService(Onem2m,Onem2mDataAdaptor,CRUD) {

        this.topologyData = topologyData;
        this.addNode = addNode;
        this.removeNode = removeNode;
        this.retrieveNode = retrieveNode;
        this.addSelectNodeListener = addSelectNodeListener;
        this.addUnSelectNodeListener = addUnSelectNodeListener;
        this.selectNode = selectNode;
        this.unSelectNode = unSelectNode;
        this.rebuild = rebuild;
        this.syncAllData = syncAllData;

        function topologyData() {
            return {
                nodes: values(cacheNodesById),
                links: values(cacheLinksBySourceId)
            }
        };

        function addNode(node) {
            var id = Onem2m.id(node);
            var parentId = Onem2m.parentId(node);
            if (id) {
                cacheNodesById[id] = node;
            }
            if (parentId && id) {
                cacheLinksBySourceId[id] = {
                    source: parentId,
                    target: id
                };
            }
        };

        function removeNode(node) {
            var id = Onem2m.id(node);
            if (cacheNodesById[id]) {
                delete cacheNodesById[id];
            }
            if (cacheLinksBySourceId[id]) {
                delete cacheNodesById[id];
            }
        };

        function retrieveNode(id) {
            return cacheNodesById[id];
        };

        function addSelectNodeListener(listener) {
            selectNodeListeners.push(listener);
        };

        function addUnSelectNodeListener(listener) {
            unSelectNodeListeners.push(listener);
        };

        function selectNode(id) {
            selectNode = retrieveNode(id);
            notifyListeners(selectNodeListeners, selectNode);
        };

        function unSelectNode() {
            notifyListeners(unSelectNodeListeners, selectNode);
        };

        function rebuild(host, port, cseName) {
            var cacheNodesById = {};
            var cacheLinksBySourceId = {};
            var selectNode = {};
            return CRUD.retrieveCSE(host, port, cseName).then(function(onem2mData) {
                var data = Onem2mDataAdaptor(onem2mData);
                addNode(data);
            });
        }

        function syncAllData(host, port, cseName) {
            var cacheNodesById = {};
            var cacheLinksBySourceId = {};
            var selectNode = {};
            return CRUD.discovery(host, port, cseName).then(function(onem2mDatas) {
                ronem2mDatas.forEach(function(onem2mData) {
                    var data = Onem2mDataAdaptor(onem2mData);
                    addNode(data);
                });
            });
        }

        function notifyListeners(listeners, notification) {
            listeners.forEach(function(listener) {
                listener(notification);
            })
        }

        function values(object) {
            var array = [];
            for (var key in object) {
                array.push(object[key]);
            }
            return array;
        }
    }

    DataStoreService.$inject = ['Onem2mHelperService','DataStoreOnem2mDataAdaptorService','Onem2mCRUDService'];
    app.service('DataStoreService', DataStoreService);
})(app);
