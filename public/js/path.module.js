'use strict';
angular.module('path', []).provider("Path", function() {
    var _base = "/";
    this.setBase = function(base) {
        _base = base;
    };

    this.$get = [function() {
        return _base;
    }];
});
