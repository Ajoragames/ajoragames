define(['../sceneObject'], function(SceneObject) {

  function StaticText(x, y, text, color, font) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.font = font;

    this.display = true;
  }

  StaticText.prototype = SceneObject.prototype;

  StaticText.prototype.draw = function(c) {
    if (this.display) {
      c.fillStyle = this.color;
      c.font = this.font;
      c.fillText(this.text, this.x, this.y);
    }
  };

  StaticText.prototype.show = function() {
    this.display = true;
  };

  StaticText.prototype.hide = function() {
    this.display = false;
  };

  return StaticText;

});
