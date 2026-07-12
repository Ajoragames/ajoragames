define(['./Utilities/rectangle'], function(Rectangle) {

  function SceneObject() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.velocity = null;
    this.scene = null;
    this.zOrder = 0;
  }

  SceneObject.prototype.update = function(dt) {};
  SceneObject.prototype.draw = function(c) {};
  SceneObject.prototype.keyDown = function(key) {};

  SceneObject.prototype.rectangle = function() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  };

  return SceneObject;
});
