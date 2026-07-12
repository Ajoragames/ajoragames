define(['../constants',
  '../../lib/gameEngine/scene',
  '../Entities/starfield',
  '../Entities/playerShip',
  '../Entities/enemy1',
  '../Entities/movement',
  '../Entities/explosion',
  '../Entities/score',
  '../../lib/gameEngine/Entities/staticText'
  ],

  function(Constants, Scene, StarField, PlayerShip,
    Enemy1, Movement, Explosion, Score, StaticText) {

    var gameScene = new Scene();

    gameScene.init = function() {

      // Start Sound
      this.game.soundManager.play(Constants.BACKGROUND_MUSIC);

      this.startGame();
    };

    gameScene.postUpdate = function() {

      var bullets = this.getObjectsByType('Bullet');
      var enemyBullets = this.getObjectsByType('EnemyBullet');
      var enemies = this.getObjectsByType('Enemy');
      var thisScene = this;

      // Check Bullet collisions with enemies
      enemies.forEach(function(enemy) {
        bullets.forEach(function(bullet) {
          if (bullet.rectangle().intersects(enemy.rectangle())) {
            var explosion = new Explosion(
              enemy.x + enemy.width / 2,
              enemy.y + enemy.height / 2,
              Constants.ENEMY_EXPLOSION_ANIMATION);
            thisScene.removeObject(bullet);
            thisScene.removeObject(enemy);
            thisScene.addObject(explosion);
            thisScene.score.increment();

            thisScene.game.soundManager.play(Constants.KILL_ENEMY_SOUND);
            thisScene.noOfEnemies -= 1;

            if (thisScene.noOfEnemies <= 0) {
              thisScene.startGame(true);
            }
          }
        });

        if (thisScene.ship != null) {
          if (enemy.rectangle().intersects(thisScene.ship.rectangle())) {
            thisScene.score.increment();
            thisScene.noOfEnemies -= 1;
            thisScene.removeObject(enemy);
            thisScene.playerDies();
          }
        }

      });


      enemyBullets.forEach(function(bullet) {
        if (thisScene.ship != null) {
          if (bullet.rectangle().intersects(thisScene.ship.rectangle())) {
            thisScene.removeObject(bullet);
            thisScene.playerDies();
          }
        }
      });

    };

    gameScene.createEnemyWave = function () {

      var waveMovement = new Movement(
        Constants.WAVE_MOVEMENT_TIME_LIST,
        Constants.WAVE_MOVEMENT_VELOCITY_LIST,
        Constants.WAVE_MOVEMENT_ROLLBACK
      );

      this.addObject(waveMovement);

      this.totalEnemies = Constants.WAVES.length * Constants.WAVE_COLUMNS;
      this.noOfEnemies = this.totalEnemies;

      for (var j = 0; j < Constants.WAVES.length; j++) {
        for (var i = 0; i < Constants.WAVE_COLUMNS; i++) {
          var enemy = new Enemy1(
            this.game.imageManager.get(Constants.SPRITE_SHEET),
            Constants.WAVE_START_X + i *
              (Constants.ENEMY_WIDTH + Constants.WAVE_PADDING),
            Constants.WAVE_START_Y + j *
              (Constants.ENEMY_HEIGHT + Constants.WAVE_PADDING),
            Constants.WAVES[j],
            waveMovement,
            Constants.ENEMY_MOVEMENT_SPRITES[j]
          );

          this.addObject(enemy);
        }
      }

    };

    gameScene.playerDies = function() {
      var explosion = new Explosion(
              this.ship.x + this.ship.width / 2,
              this.ship.y + this.ship.height / 2,
              Constants.SHIP_EXPLOSION_ANIMATION);
      this.addObject(explosion);
      this.removeObject(this.ship);
      this.game.soundManager.play(Constants.SHIP_DESTROYED_SOUND);

      this.ship = null;

      // Create Game Over
      var gameOverText = new StaticText(
        Constants.GAME_OVER_TEXT_X,
        Constants.GAME_OVER_TEXT_Y,
        Constants.GAME_OVER_TEXT_TEXT,
        Constants.GAME_OVER_TEXT_COLOR,
        Constants.GAME_OVER_TEXT_FONT);

      gameOverText.keyDown = function(key) {
        if (key === Constants.GAME_OVER_START_KEY) {
          this.scene.startGame();
        }
      };

      this.addObject(gameOverText);
    };

    gameScene.startGame = function (won) {

      // Create the scene objects
      var currentScore;
      if (this.score !== undefined) {
        currentScore = this.score.text;
      }

      this.sceneObjects = [];
      var background = new StarField(Constants.STARFIELD_SPEED, Constants.STARFIELD_STARS);
      this.ship = new PlayerShip(this.game.imageManager.get(
        Constants.SPRITE_SHEET));
      this.score = new Score(
        Constants.SCORE_X,
        Constants.SCORE_Y,
        Constants.SCORE_COLOR,
        Constants.SCORE_FONT
      );

      if (won === true) {
        this.score.text = currentScore;
      }

      this.addObject(background);
      this.addObject(this.ship);
      this.addObject(this.score);

      this.createEnemyWave();
    };

    return gameScene;
  }
);
