define([], function() {

  function SoundManager(context) {
    this.soundCache = {};
    this.context = context;
  };

  SoundManager.prototype.load = function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    var obj = this;

    request.onload = function() {
      obj.context.decodeAudioData(request.response, function(buffer) {
        obj.soundCache[url] = buffer;
        callback();
      });
    };

    request.send();
  };

  SoundManager.prototype.play = function(url, loop) {

    var sm = this;

    function play() {
      var source = sm.context.createBufferSource();
      source.buffer = sm.soundCache[url];
      source.connect(sm.context.destination);

      if (loop !== undefined) {
        source.loop = true;
      }

      source.start(0);
    }

    if (url in this.soundCache) {
      play();
    }
  };

  SoundManager.prototype.preLoad = function (urls, callback) {

    var length = urls.length;
    var obj = this;
    var remaining = length;

    function done() {
      remaining -= 1;
      if (remaining <= 0) {
        callback();
      }
    };

    for (var i = 0; i < length; i++) {
      var url = urls[i];
      obj.load(url, done);
    };
  };

  return SoundManager;
});
