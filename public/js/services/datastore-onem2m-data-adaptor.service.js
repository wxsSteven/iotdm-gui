(function(app) {
    function DataStoreOnem2mDataAdaptorService() {
        return function onem2mDataAdaptor(data) {
            if (!data[key]&&angular.isObject(data)) {
                var key = Object.keys(data)[0];
                var value = data[key];
                return {
                    key: key,
                    value: value
                }
            }
            return data;
        }
    }
    DataStoreOnem2mDataAdaptorService.$inject = [];
    app.service('DataStoreOnem2mDataAdaptorService', DataStoreOnem2mDataAdaptorService);
})(app)
