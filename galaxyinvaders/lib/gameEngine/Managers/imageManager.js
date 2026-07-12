define([], function() {

  function ImageManager() {
    this.imageCache = {};
  }

  ImageManager.prototype.load = function (url, callback) {
    var image = new Image();

    var obj = this;

    image.onload = function() {
      obj.imageCache[url] = image;
      callback();
    };

    image.src = url;
  };

  ImageManager.prototype.get = function(url) {
    return this.imageCache[url];
  };

  ImageManager.prototype.preLoad = function (urls, callback) {

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
    }
  };

  return ImageManager;
});
