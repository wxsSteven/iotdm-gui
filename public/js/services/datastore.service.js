(function(app) {
    var cacheNodesById = {};
    var cacheLinksBySourceId = {};
    var selectNode = {};

    var selectNodeListeners = [];
    var unSelectNodeListeners = [];

    function DataStoreService(Onem2m, Onem2mDataAdaptor, CRUD) {

        this.getAccessKey = getAccessKey;
        this.addNode = addNode;
        this.updateNode=updateNode;
        this.removeNode = removeNode;
        this.retrieveNode = retrieveNode;
        this.rebuild = rebuild;
        this.syncAllData = syncAllData;

        function getAccessKey() {
            return {
                getData: function() {
                    return {
                        nodes: values(cacheNodesById),
                        links: values(cacheLinksBySourceId)
                    }
                }
            }
        };

        function addNode(node) {
            var nodes = Onem2mDataAdaptor(node);

            nodes.forEach(function(node) {
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
            })
        };

        function updateNode(node){
          var nodes=Onem2mDataAdaptor(node);
          nodes.forEach(function(node) {
              var id = Onem2m.id(node);
              if (id) {
                  var old=cacheNodesById[id];
                  for(var key in node.value){
                    old.value[key]=node.value[key];
                  }
              }
          })
        }

        function removeNode(node) {
            node = Onem2mDataAdaptor(node)[0];
            var id=Onem2m.id(node);
            node=cacheNodesById[id];
            var array=[node];
            while(array.length>0){
              var node=array.pop();
              var id = Onem2m.id(node);
              if (cacheNodesById[id]) {
                  delete cacheNodesById[id];
              }
              if (cacheLinksBySourceId[id]) {
                  delete cacheLinksBySourceId[id];
              }
              if(node.children){
                array=array.concat(array,node.children);
              }
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
            cacheNodesById = {};
            cacheLinksBySourceId = {};
            selectNode = {};
            return CRUD.discovery(host, port, cseName).then(function(onem2mDatas) {
                addNode(onem2mDatas);
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
