(function (app) {
    var nodes = [
        {
            key: "m2m:cb",
            value: {
                "ct": "20160524T211038",
                "srt": [
                    5,
                    2,
                    3,
                    4,
                    23,
                    9,
                    14,
                    1
                ],
                "cst": "IN-CSE",
                "ty": 5,
                "ri": "2",
                "csi": "InCSE1",
                "lt": "20160524T211038",
                "rn": "InCSE1"
            }
        },
        {
            key: "m2m:acp",
            value: {
                "ct": "20160524T211038",
                "ty": 1,
                "pv": {
                    "acr": [
                        {
                            "acor": [
                                "*"
                            ],
                            "acop": 63
                        }
                    ]
                },
                "ri": "3",
                "lt": "20160524T211038",
                "pi": "/InCSE1/2",
                "pvs": {
                    "acr": [
                        {
                            "acor": [
                                "admin"
                            ],
                            "acop": 63
                        }
                    ]
                },
                "rn": "_defaultACP",
                "et": "29991231T111111"
            }
        },
        {
            key: "m2m:ae",
            value: {
                "rr": true,
                "ct": "20160525T151059",
                "or": "iphone",
                "aei": "AE",
                "ty": 2,
                "ri": "4",
                "lt": "20160525T151059",
                "pi": "/InCSE1/2",
                "api": "1234",
                "rn": "AE",
                "et": "29991231T111111"
            }
        },
        {
            key: "m2m:cnt",
            value: {
                "st": 0,
                "or": "http://hey/you",
                "ty": 3,
                "lt": "20160525T151225",
                "cr": "//localhost:10000",
                "et": "29991231T111111",
                "ct": "20160525T151225",
                "cbs": 0,
                "lbl": [
                    "key1"
                ],
                "ri": "5",
                "pi": "/InCSE1/2",
                "rn": "container1",
                "mbs": 30,
                "cni": 0
            }
        }
    ];

    var cacheNodesById = {};
    var cacheLinksBySourceId = {};

    function DataStoreService(Onem2m) {

        //todo init database, which will be deleted
        nodes.forEach(function (node, index) {
            var id = Onem2m.id(node);
            cacheNodesById[id] = node;
        });

        nodes.forEach(function (node) {
            var id = Onem2m.id(node);
            var parentId = Onem2m.parentId(node);
            if (parentId && id) {
                var link = {source: parentId, target: id};
                cacheLinksBySourceId[id] = link;
            }
        });
        //end

        this.topologyData = function () {
            return {
                nodes: values(cacheNodesById),
                links: values(cacheLinksBySourceId)
            }
        };

        this.addNode = function (node) {
            var id = Onem2m.id(node);
            var parentId = Onem2m.id(node);
             if (id) {
                cacheNodesById[id] = node;
            }
            if (parentId && id) {
                cacheLinksBySourceId[id] = {source: parentId, target: id};
            }
        };

        this.removeNode=function(node){
            var id = Onem2m.id(node);
            if(cacheNodesById[id]){
                delete cacheNodesById[id];
            }
            if(cacheLinksBySourceId[id]){
                delete cacheNodesById[id];
            }
        };

        this.retrieveNode=function(id){
            return cacheNodesById[id];
        };
        
        function values(object) {
            var array = [];
            for (var key in object) {
                array.push(object[key]);
            }
            return array;
        }
    }

    DataStoreService.$inject = ['Onem2mService'];
    app.service('DataStoreService', DataStoreService);
})(app);