define([
  '../../lib/gameEngine/sceneObject'],
  function (SceneObject) {

    function Movement(timeList, velocityList, rollBack, endFunction) {
      this.timeList = timeList;
      this.velocityList = velocityList;
      this.rollBack = rollBack;
      this.time = 0;
      this.endFunction = endFunction;
    }

    Movement.prototype = new SceneObject();

    Movement.prototype.draw = function(c) {};

    Movement.prototype.update = function (dt) {
      this.time += dt;

      if (this.time > this.rollBack) {
        this.time = 0;
        if (this.endFunction !== undefined) {
          this.scene.removeObject(this);
          this.endFunction();
        }
      }

      for (var x = 0; x < this.timeList.length; x++) {
        if (this.time >= this.timeList[x]) {
          this.velocity = this.velocityList[x];
        }
      }
    };

    Movement.prototype.keyDown = function (key) {};

    return Movement;
  }
);
