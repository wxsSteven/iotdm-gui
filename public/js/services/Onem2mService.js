(function (app) {
    function Onem2mService() {
        this.children = children;
        this.id = id;
        this.parentId=parentId;
        this.label = label;
        this.icon = icon;

        function children(node) {
            return node.value.ch;
        }

        function id(node) {
            if (!node)
                return "value.ri";
            return node.value.ri;
        }

        function parentId(node){
            if(node&&node.value&&node.value.pi){
                var array=node.value.pi.split("/");
                return array[2];
            }
        }

        function label(node) {
            if (!node)
                return "value.rn";
            return node.value.rn;
        }

        function icon(node) {
            if (!node)
                return "value.ty";
            return node.value.ty;
        }
    }

    Onem2mService.$inject = [];
    app.service('Onem2mService', Onem2mService);
})(app);