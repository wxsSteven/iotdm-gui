(function(app) {
    var cacheNodesById = {};
    var cacheLinksBySourceId = {};
    var selectNode = {};

    var selectNodeListeners = [];
    var unSelectNodeListeners = [];

    function DataStoreService(Onem2m, Onem2mDataAdaptor, CRUD) {

        this.getAccessKey = getAccessKey;
        this.addNode = addNode;
        this.removeNode = removeNode;
        this.retrieveNode = retrieveNode;
        this.rebuild = rebuild;
        this.syncAllData = syncAllData;

        function getAccessKey() {
            return {
                getData:function() {
                  return{
                    nodes: values(cacheNodesById),
                    links: values(cacheLinksBySourceId)
                  }
                }
            }
        };

        function addNode(node) {
           node=Onem2mDataAdaptor(node);
            var id = Onem2m.id(node);
            var parentId = Onem2m.parentId(node);
            if (id) {
                cacheNodesById[id] = node;
            }
            if (parentId && id) {
                cacheLinksBySourceId[id] = {
                    source: id,
                    target: parentId
                };
            }
        };

        function removeNode(node) {
            node=Onem2mDataAdaptor(node);
            var id = Onem2m.id(node);
            if (cacheNodesById[id]) {
                delete cacheNodesById[id];
            }
            if (cacheLinksBySourceId[id]) {
                delete cacheLinksBySourceId[id];
            }
        };

        function retrieveNode(id) {
            return cacheNodesById[id];
        };

        function rebuild(host, port, cseName) {
            cacheNodesById = {};
            cacheLinksBySourceId = {};
            selectNode = {};
            return CRUD.retrieveCSE(host, port, cseName).then(function(onem2mData) {
                addNode(onem2mData);
            });
        }

        function syncAllData(host, port, cseName) {
            var cacheNodesById = {};
            var cacheLinksBySourceId = {};
            var selectNode = {};
            return CRUD.discovery(host, port, cseName).then(function(onem2mDatas) {
                onem2mDatas.forEach(function(onem2mData) {
                    addNode(onem2mData);
                });
            });
        }

        function values(object) {
            var array = [];
            for (var key in object) {
                array.push(object[key]);
            }
            return array;
        }
    }

    DataStoreService.$inject = ['Onem2mHelperService', 'DataStoreOnem2mDataAdaptorService', 'Onem2mCRUDService'];
    app.service('DataStoreService', DataStoreService);
})(app);
