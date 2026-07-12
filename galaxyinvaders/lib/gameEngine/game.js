define(['./Managers/soundManager', './Managers/imageManager'],
  function(SoundManager, ImageManager) {

    function Game(gameElementId, width, height, fps, speedUp) {

      // shim layer with setTimeout fallback
      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();

      // Create the Canvas
      this.createCanvas(gameElementId, width, height);
      this.scenes = {};
      this.fps = fps;
      this.width = width;
      this.height = height;
      this.speedUp = speedUp;
      this.paused = false;

      this.setupInput();
      this.setupManagers();
      this.loop();
    }

    Game.prototype.createCanvas = function (gameElementId, width, height) {
      var gameElement = document.getElementById(gameElementId);
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      var bufferedImage = document.createElement('canvas');
      bufferedImage.width = width;
      bufferedImage.height = height;

      gameElement.appendChild(canvas);

      // Get the context
      this.ctx = canvas.getContext && canvas.getContext('2d');
      this.bufferedCtx = bufferedImage.getContext && bufferedImage.getContext('2d');
      this.bufferedImage = bufferedImage;
    };

     Game.prototype.loop = function() {

      var obj = this;
      var lastTime;
      var timePassed = 0;

      function mainLoop(time) {
        var deltaTime = time - lastTime;

        if (obj.scene !== undefined) {
          if (deltaTime >= 1000 / obj.fps) {
            if (!obj.paused) {
              obj.scenes[obj.scene].update(deltaTime * obj.speedUp);
              obj.scenes[obj.scene].draw(obj.ctx, obj.bufferedCtx);
            }

            lastTime = time;
          }
        }

        window.requestAnimFrame(mainLoop);
        //setTimeout(mainLoop, obj.fps / 1000);
      }

      window.requestAnimFrame(function(time) {
        lastTime = time;
        mainLoop();
      });
    };

    Game.prototype.setupInput = function() {

      var obj = this;

      document.addEventListener('keydown', function (e) {
        e = e || window.event;

        if (obj.scene !== undefined) {
          var activeScene = obj.scenes[obj.scene];
          for (var i = 0; i < activeScene.sceneObjects.length; i++) {
            activeScene.sceneObjects[i].keyDown(e.keyCode);
          }
        }
      });
    };

    Game.prototype.addScene = function (name, scene) {
      scene.game = this;
      this.scenes[name] = scene;
    };

    Game.prototype.startScene = function(scene) {
      this.scene = scene;
      this.scenes[scene].init();
    };

    Game.prototype.setupManagers = function() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.imageManager = new ImageManager();

      try {
        this.soundManager = new SoundManager(new AudioContext());
      } catch(e) {
        console.error('Audio not supported');

        // Stub out sound Manager for IE
        this.soundManager = {
          preLoad: function(lst, callback) { callback(); },
          load: function() {},
          play: function() {}
        };
      }

    };

    Game.prototype.fullScreen = function () {
      var elem = document.body;
      if (elem.requestFullscreen) {
        console.log('Here normal');
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        console.log('Here webkit');
        elem.webkitRequestFullscreen();
      }
    };

    return Game;
  }
);
