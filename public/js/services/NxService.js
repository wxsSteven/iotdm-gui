(function(app,nx){
    function NxService(){
        if(!nx)
            throw "No nx exist";
        return nx;
    }
    NxService.$inject=[];
    app.service('NxService',NxService);
})(app,nx);