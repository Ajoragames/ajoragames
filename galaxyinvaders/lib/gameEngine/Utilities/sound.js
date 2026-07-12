define([], function() {

  function SoundManager() {
    this.soundCache = {};
  };

  SoundManager.prototype.load = function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        this.soundCache[url] = buffer;
        callback();
      });
    };

    request.send();
  };

  SoundManager.prototype.play = function(context, url) {

    function play() {
      var source = context.createBufferSource();
      source.buffer = this.soundCache[url];
      source.connect(context.destination);
      source.start(0);
    }

    if (url in this.soundCache) {
      play();
    } else {
      this.load(url, play);
    }
  };

  SoundManager.prototype.preLoad = function (urls, callback) {

    for (var i = 0; i < urls.length; i++) {
      var promise = new Promise(callback);
      promise.addEvent(function(done) {
        this.load(urls[i], done);
      });
    }

    promise.execute();
  });
});
