define([], function() {

  function inherit(proto) {
    function F() {}
    F.prototype = proto;
    return new F;
  }

  return inherit;

});
