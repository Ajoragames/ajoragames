define(['../sceneObject'], function(SceneObject) {

  function BasicObject(x, y, width, height, type, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    if (color === undefined) {
      this.display = false;
    } else {
      this.display = true;
      this.color = color;
    }
  }

  BasicObject.prototype = new SceneObject();

  BasicObject.prototype.draw = function(c) {
    if (this.display) {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  BasicObject.prototype.show = function() {
    this.display = true;
  };

  BasicObject.prototype.hide = function() {
    this.display = false;
  };

  return BasicObject;
});
