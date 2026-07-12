define([
  '../constants',
  '../../lib/gameEngine/sceneObject',
  './enemyBullet',
  './movement'
  ], function (Constants, SceneObject, EnemyBullet, Movement) {

    function Enemy1(image, x, y, rects, movement, movementRects) {
      this.x = x;
      this.y = y;
      this.width = Constants.ENEMY_WIDTH;
      this.height = Constants.ENEMY_HEIGHT;
      this.type = 'Enemy';
      this.image = image;
      this.rects = rects;
      this.animationTime = 0;
      this.animationIndex = 0;
      this.movement = movement;
      this.waveMovement = movement;
      this.movementRects = movementRects;
      this.mode = 0;
    }

    Enemy1.prototype = new SceneObject();

    Enemy1.prototype.draw = function(c) {

      var rect = this.rects[this.animationIndex];

      if (this.mode == 1 && this.movementRects !== undefined) {

        if (this.movement.velocity !== null && this.movement.velocity !== undefined) {
          var x = this.movement.velocity.x;
          var y = this.movement.velocity.y;

          if (x < 0 && y == 0) {
            rect = this.movementRects['left'];
          } else if (x < 0 && y < 0) {
            rect = this.movementRects['up left'];
          } else if (x == 0 && y < 0) {
            rect = this.movementRects['up'];
          } else if (x > 0 && y < 0) {
            rect = this.movementRects['up right'];
          } else if (x > 0 && y == 0) {
            rect = this.movementRects['right'];
          } else if (x > 0 && y > 0) {
            rect = this.movementRects['bottom right'];
          } else if (x == 0 && y > 0) {
            rect = this.movementRects['bottom'];
          } else if (x < 0 && y > 0) {
            rect = this.movementRects['bottom left'];
          }
        }
      }

      c.drawImage(this.image, rect.x, rect.y,
          rect.width, rect.height,
          this.x, this.y, this.width, this.height);
    };

    Enemy1.prototype.update = function (dt) {

      this.animationTime += dt;

      // Change Animation
      if (this.animationTime > Constants.ENEMY_ANIMATE_DURATION) {
        this.animationIndex += 1;
        this.animationTime = 0;
        if (this.animationIndex >= this.rects.length) {
          this.animationIndex = 0;
        }
      }

      if (this.mode == 0) {
        this.x += (dt * this.movement.velocity.x) * (this.scene.totalEnemies - this.scene.noOfEnemies) * 0.1;
        this.y += (dt * this.movement.velocity.y) * (this.scene.totalEnemies - this.scene.noOfEnemies) * 0.1;
      } else if (this.mode == 1) {
        this.tempX += (dt * this.waveMovement.velocity.x) * (this.scene.totalEnemies - this.scene.noOfEnemies) * 0.1;
        this.tempY += (dt * this.waveMovement.velocity.y) * (this.scene.totalEnemies - this.scene.noOfEnemies) * 0.1;
        this.x += (dt * this.movement.velocity.x);
        this.y += (dt * this.movement.velocity.y);
      } else if (this.mode == 2) {
        this.tempX += (dt * this.waveMovement.velocity.x) * (this.scene.totalEnemies - this.scene.noOfEnemies) * 0.1;
        this.tempY += (dt * this.waveMovement.velocity.y) * (this.scene.totalEnemies - this.scene.noOfEnemies) * 0.1;

        if (Math.abs(this.x - this.tempX) <= 0.01
            && Math.abs(this.y - this.tempY) <= 0.01) {
          this.mode = 0;
          this.movement = this.waveMovement;
        } else {
          if (this.x > this.tempX) {
            this.x -= (dt * Constants.ATTACK_MOVEBACK_VELOCITY);
          } else if (this.x < this.tempX) {
            this.x += (dt * Constants.ATTACK_MOVEBACK_VELOCITY);
          }

          if (this.y > this.tempY) {
            this.y -= (dt * Constants.ATTACK_MOVEBACK_VELOCITY);
          } else if (this.y < this.tempY) {
            this.y += (dt * Constants.ATTACK_MOVEBACK_VELOCITY);
          }
        }
      }

      var fireChance = 0;

      if (this.mode == 0 || this.mode == 2) {
        fireChance = Math.floor((Math.random() * Constants.ENEMY_BULLET_CHANCE *
          (this.scene.noOfEnemies / this.scene.totalEnemies)) + 1);
      } else {
        fireChance = Math.floor((Math.random() * Constants.ENEMY_BULLET_CHANCE * 0.08 *
          (this.scene.noOfEnemies / this.scene.totalEnemies)) + 1);
      }

      if (fireChance == 1) {
        this.scene.addObject(new EnemyBullet(
          this.x + this.width / 2,
          this.y + this.height));
      }

      var attackChance = Math.floor(
        (Math.random() * Constants.ENEMY_ATTACK_CHANCE *
          (this.scene.noOfEnemies / this.scene.totalEnemies)) + 1
      );

      if (attackChance == 1 && this.mode == 0) {
        this.mode = 1;
        this.tempX = this.x;
        this.tempY = this.y;

        var enemy = this;
        var velocityList;

        if (this.scene.ship != null) {
          if (enemy.x > this.scene.ship.x) {
            velocityList = Constants.ATTACK2_MOVEMENT_VELOCITY_LIST;
          } else {
            velocityList = Constants.ATTACK1_MOVEMENT_VELOCITY_LIST;
          }
        } else {
          velocityList = Constants.ATTACK2_MOVEMENT_VELOCITY_LIST;
        }

        var attackMovement = new Movement(
          Constants.ATTACK_MOVEMENT_TIME_LIST,
          velocityList,
          Constants.ATTACK_MOVEMENT_ROLLBACK,
          function() {
            if (enemy !== undefined && enemy !== null) {
              enemy.mode = 2;
            }
          }
        );
        this.movement = attackMovement;
        this.scene.addObject(attackMovement);
      }
    };

    Enemy1.prototype.keyDown = function (key) {};

    return Enemy1;
  }
);
