define(['../sceneObject'], function(SceneObject) {

  function StaticImage(x, y, width, height, image, rect, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.image = image;
    this.rect = rect;
  }

  StaticImage.prototype = new SceneObject();

  StaticImage.prototype.draw = function(c) {
    c.drawImage(this.image, this.rect.x, this.rect.y,
      this.rect.width, this.rect.height,
      this.x, this.y, this.width, this.height);
  };

  return StaticImage;
});
