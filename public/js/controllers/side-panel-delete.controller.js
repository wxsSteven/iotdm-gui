(function(app){
  var ROOT_KEY = "Request Primitive";
  var TREE = {};
  function SidePanelDeleteCtrl($scope,Topology,DataStore,Onem2m,CRUD) {
    $scope.hide = false;
    $scope.path = [];
    $scope.request = {};

    Topology.addSelectNodeListener(function(selectNode) {
        TREE = {};
        $scope.path = [];

        $scope.request = Onem2m.getRequestPrimitiveByOperation(Onem2m.operation.delete);
        $scope.request.from=Onem2m.assignFrom();
        $scope.request.requestIdentifier=Onem2m.assignRequestIdentifier();
        $scope.request.to = Onem2m.id(selectNode);

        TREE[ROOT_KEY] = $scope.request;
        $scope.path.push(ROOT_KEY);
        $scope.$apply();
    })

    $scope.ancestor = ancestor;
    $scope.children = children;
    $scope.parent = parent;
    $scope.yourName = yourName;
    $scope.yourself = yourself;
    $scope.isValue = isValue;
    $scope.isRoot = isRoot;
    $scope.submit=submit;

    function ancestor(index) {
        $scope.path.splice(index + 1);
    };

    function children(name) {
        $scope.path.push(name);
    };

    function parent() {
        $scope.path.pop();
    };

    function yourName() {
        return $scope.path.slice(-1)[0];
    };

    function yourself() {
        var place = TREE;
        $scope.path.forEach(function(p) {
            place = place[p];
        });
        return place;
    };

    function isValue(value) {
        return !(angular.isObject(value));
    };

    function isRoot() {
        return $scope.path.length == 1;
    };

    function submit(request){
        request=Onem2m.toOnem2mJson(request);
        CRUD.CRUD(request).then(function(data){
            DataStore.removeNode(data);
            Topology.update();
            $scope.$emit("closeSidePanel");
        });
    };
  }

  SidePanelDeleteCtrl.$inject = ['$scope','TopologyService','DataStoreService','Onem2mHelperService','Onem2mCRUDService'];
  app.controller('SidePanelDeleteCtrl', SidePanelDeleteCtrl);
})(app);
