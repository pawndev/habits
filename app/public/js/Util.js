let UTIL = {
  fire : function(func,funcname, args){

    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && this.namespace[func] && typeof this.namespace[func][funcname] == 'function'){
      this.namespace[func][funcname](args);
    }

  },

  loadEvents : function(){

    var bodyId = document.body.getAttribute('data-namespace');
    var callFunction = document.body.getAttribute('data-namespace-functions');

    UTIL.fire('common');

    UTIL.fire(bodyId);
    if (callFunction !== "" && callFunction !== null && typeof callFunction !== "undefined") {
        callFunction.split(/\s+/).forEach(function (name, i) {
            UTIL.fire(bodyId, name);
        });
    }

    UTIL.fire('common','finalize');

  }

};

export default UTIL;
