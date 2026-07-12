define([],
  function() {

    function Promise() {
      this.events = [];
      this.contexts = [];
    }

    Promise.prototype.addEvent = function(e, context) {
      this.events.push(e);
      this.contexts.push(context);
    };

    Promise.prototype.execute = function(completeCallback) {
      var remaining = this.events.length;

      function done() {
        remaining -= 1;
        if (remaining <= 0) {
          completeCallback();
        }
      }

      for (var x = 0; x < this.events.length; x++) {

        var evt = this.events[x];
        var context = this.contexts[x];

        if (context !== undefined) {
          evt.call(context, done);
        } else {
          evt(done);
        }
      }
    };

    return Promise;
  }
);
