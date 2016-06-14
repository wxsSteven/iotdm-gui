(function(app) {
  'use strict';
    var MIME = "application/json";
    var HOST = 'localhost';
    var PORT = '8181';
    var CSE_NAME = "";

    function Onem2mCRUDService($http, Onem2m) {
        this.CRUD = CRUD;
        this.setBaseDir = setBaseDir;
        this.retrieveCSE = retrieveCSE;
        this.discovery = discovery;

        function setBaseDir(host, port, cseName) {
            HOST = host;
            PORT = port;
            CSE_NAME = cseName;
        }

        function retrieveCSE(host, port, cseName) {
            setBaseDir(host, port, cseName);
            var request = {
                to: "",
                operation: Onem2m.operation.retrieve,
                requestIdentifier: "id",
                from: "//localhost",
            }
            return CRUD(request);
        }

        function discovery(host, port, cseName) {
            setBaseDir(host, port, cseName);
            var request = {
                to: "",
                operation: Onem2m.operation.retrieve,
                requestIdentifier: "id",
                from: "//localhost",
                filterCriteria: {
                    filterUsage: Onem2m.filterUsage["Discovery Criteria"]
                }
            }
            return CRUD(request);
        }

        function CRUD(request) {
            switch (request.operation) {
                case Onem2m.operation.create:
                    return _create(request);
                case Onem2m.operation.retrieve:
                    return _retrieve(request);
                case Onem2m.operation.update:
                    return _update(request);
                case Onem2m.operation.delete:
                    return _delete(request);
            }
        };

        function _retrieve(request) {
            var httpRequest = parseRequest(request);
            return $http.get(httpRequest.url, {
                headers: httpRequest.headers
            }).then(function(httpResponse) {
                return parseHttpResponse(httpResponse);
            });
        };

        function _create(request) {
            var httpRequest = parseRequest(request);
            var attrsSent = httpRequest.payload;
            return $http.post(httpRequest.url, httpRequest.payload, {
                headers: httpRequest.headers
            }).then(function(httpResponse) {
                var attrsReceived = parseHttpResponse(httpResponse);
                var data = combineAttrs(attrsSent, attrsReceived);
                return data;
            });
        };

        function _update(request) {
            var httpRequest = parseRequest(request);
            var attrsSent = httpRequest.payload;
            var ri=request.to;
            return $http.put(httpRequest.url, httpRequest.payload, {
                headers: httpRequest.headers
            }).then(function(httpResponse) {
                var data = parseHttpResponse(httpResponse);
                var key =getWrapper(data);
                data[key].ri=ri;
                return data;
            });
        };

        function _delete(request) {
            var httpRequest = parseRequest(request);
            return $http.delete(httpRequest.url, {
                headers: httpRequest.headers
            }).then(function(httpResponse) {
                return parseHttpResponse(httpResponse);
            });
        };

        function parseRequest(request) {
            var url = "http://" + HOST + ":" + PORT + "/" + CSE_NAME + "/" + request.to;
            var query = {};
            query.rt = request.responseType && request.responseType.responseTypeValue;
            query.rp = request.resultPersistence;
            query.rcn = request.resultContent;
            query.da = request.deliveryAggregation;
            if (request.filterCriteria) {
                var fc = request.filterCriteria;
                query.crb = fc.createdBefore;
                query.cra = fc.createdAfter;

                query.ms = fc.modifiedSince;
                query.us = fc.unmodifiedSince;

                query.sts = fc.stateTagSmaller;
                query.stb = fc.stateTagBigger;

                query.exb = fc.expireBefore;
                query.exa = fc.expireAfter;

                query.lbl = fc.labels && fc.labels.join("+");
                query.ty = fc.resourceType;

                query.sza = fc.sizeAbove;
                query.szb = fc.sizeBelow;

                query.cty = fc.contentType && fc.contentType.join("+");
                query.lim = fc.limit;

                if (fc.attribute) {
                    fc.attribute.forEach(function(d) {
                        query[d.nm] = d.val;
                    })
                }
                query.fu = fc.filterUsage;
            }
            query.drt = request.discoveryResultType;

            var queryArray = [];
            for (var key in query) {
                if (query[key]) {
                    queryArray.push(key + "=" + query[key]);
                }
            }

            url = queryArray.length > 0 ? url + "?" + queryArray.join("&") : url;


            var headers = {};
            headers["Accept"] = MIME;
            if (request.operation)
                headers["Content-Type"] = request.operation == 1 ? MIME + ";ty=" + request.resourceType : MIME;

            if (request.from)
                headers["X-M2M-Origin"] = request.from;

            if (request.requestIdentifier)
                headers["X-M2M-RI"] = request.requestIdentifier;

            if (request.groupRequestIdentifier)
                headers["X-M2M-GID"] = request.groupRequestIdentifier;

            if (request.responseType && request.responseType.notificationURI && request.responseType.notificationURI.length > 0)
                headers["X-M2M-RTU"] = request.responseType.notificationURI.join("&");

            if (request.originatingTimestamp)
                headers["X-M2M-OT"] = request.originatingTimestamp;

            if (request.resultExpirationTimestamp)
                headers["X-M2M-RST"] = request.resultExpirationTimestamp;

            if (request.requestExpirationTimestamp)
                headers["X-M2M-RET"] = request.requestExpirationTimestamp;

            if (request.operationExecutionTime)
                headers["X-M2M-OET"] = request.operationExecutionTime;

            if (request.eventCategory)
                headers["X-M2M-EC"] = request.eventCategory;

            var payload = request.primitiveContent;

            var httpRequest = {
                url: url,
                payload: payload,
                headers: headers
            };
            return httpRequest;
        }

        function parseHttpResponse(httpResponse) {
            var response = {};
            var headers = httpResponse.headers();

            response.responseStatusCode = headers["X-M2M-RSC".toLowerCase()];
            response.requestIdentifier = headers["X-M2M-RI".toLowerCase()];
            response.primitiveContent = httpResponse.data;
            response.from = httpResponse["X-M2M-Origin".toLowerCase()];
            response.originatingTimestamp = headers["X-M2M-OT".toLowerCase()];
            response.originatingTimestamp = headers["X-M2M-RST".toLowerCase()];
            response.eventCategory = headers["X-M2M-EC".toLowerCase()];
            return response.primitiveContent;
        }

        function getWrapper(object) {
            return Object.keys(object)[0];
        }

        function combineAttrs(oldAttrs, newAtts) {
            var key = getWrapper(oldAttrs);
            for (var k in newAtts[key]) {
                oldAttrs[key][k] = newAtts[key][k];
            }
            return oldAttrs;
        }
    }

    Onem2mCRUDService.$inject = ['$http', 'Onem2mHelperService'];
    app.service('Onem2mCRUDService', Onem2mCRUDService);
})(app);
