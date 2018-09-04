/*
-_-_-_-_-_-_-_-_-_- INIT KONTRA ENGINE _-_-_-_-_-_-_-_-_-
*/
kontra.init()

//loading the assets first and then starting the game
kontra.assets.imagePath = '/Users/asisa/Projects/13kGame/src/img/';
kontra.assets.load('TilesTest.png','character1.png','character2.png')
.then( function()
  {

/*
-_-_-_-_-_-_-_-_-_- TILE ENGINE TEST _-_-_-_-_-_-_-_-_-
*/
    let tileEngine = kontra.tileEngine({
      // tile size
      tileWidth: 32,
      tileHeight: 32,

      // map size in tiles
      width: 9,
      height: 9
    });

    let img = document.createElement('img');
    img.src = '/Users/asisa/Projects/13kGame/src/img/TilesTest.png';

    img.onload = function() {
      tileEngine.addTilesets({
        image: img
      });
  };

  img.onload = function() {
  tileEngine.addTilesets({
    image: img
  });

  // Add the following:
  tileEngine.addLayers({
    name: 'ground',
    data: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,
            0,  0,  6,  6,  6,  6,  0,  0,  0,
            0,  6,  24, 24, 24, 24, 0,  0,  0,
            0,  24, 24, 24, 24, 24, 6,  0,  0,
            0,  24, 24, 24, 24, 24, 24, 6,  0,
            0,  24, 24, 24, 24, 24, 24, 24, 0,
            0,  70, 70, 70, 0, 24, 24, 24, 0,
            0,  0,  0,  0,  0, 70, 70, 70, 0,
            0,  0,  0,  0,  0,  0,  0,  0,  0 ]

  });
}

/*
-_-_-_-_-_-_-_-_-_- Sprites and Image Loader _-_-_-_-_-_-_-_-_-
*/
/*
  let background = new Image();
  background.src = '/Users/asisa/Projects/13kGame/src/img/TilesTest.png';

  var backgroundSprite = kontra.sprite({
      x: 0,
      y: 0,
      image: background,
      dy: 0
    }); */

    let character1 = new Image();
    character1.src = '/Users/asisa/Projects/13kGame/src/img/character1.png';

    var player = kontra.sprite({
        x: 150,
        y: 300,
        image: character1,
        dy: 0
      });

    let character2 = new Image();
    character2.src = '/Users/asisa/Projects/13kGame/src/img/character2.png';

    var enemies = [
        kontra.sprite({
        x: 100,
        y: 100,
        image: character2,
        dx: 3
        }),

        kontra.sprite({
        x: 50,
        y: 50,
        image: character2,
        dx: 2
        }),

        kontra.sprite({
        x: 120,
        y: 150,
        image: character2,
        dx: 1
        })
      ];



/*
// THIS IS JUST A TESTING SPRITE CALLED spriteRed
    var spriteRed = kontra.sprite({
        x: 200,
        y: 100,
        width: 16,
        height: 16,
        color: 'red',
        dy: 3,
        //dy: 0.5
      });

*/

  /*
  -_-_-_-_-_-_-_-_-_- GAME LOOP _-_-_-_-_-_-_-_-_-
  */
  var loop = kontra.gameLoop({
      update: function() {

  /*
  -_-_-_-_-_-_-_-_-_- CONTROLES _-_-_-_-_-_-_-_-_-
  */
// control player with the keyboard

      if (kontra.keys.pressed('up')) {
        player.y -= 1;
      }

      if (kontra.keys.pressed('down')){
        player.y += 1;
      }

      if(player.y <= 40) {
        //pause game
        loop.stop();

        alert('YouWon!');
      }


//control the sprite with pointer
/*    if (kontra.pointer.pressed('left')){
            // left mouse button pressed
            sprite2.y = 0
          }
          else if (kontra.keys.pressed('right')) {
          // right mouse button pressed
          sprite2.y = 100
          }
*/

      player.update();

/*
-_-_-_-_-_-_-_-_-_- COLLISOION _-_-_-_-_-_-_-_-_-
*/

//Bouncing the sprite on the edgers of the canvas

      enemies.forEach(function(character2) {
        if (character2.y >= 206) {
          character2.y = 205,
          character2.dy = -2
        }

        else if (character2.y <= 0) {
          character2.y = 1,
          character2.dy = 3
        }

        if (character2.x < 32) {
          character2.x = 32;
          character2.dx = Math.abs(character2.dx);
        }

        else if (character2.x > 200) {
          character2.x = 200;
          character2.dx = -Math.abs(character2.dx);
        }

        character2.update();

        //check for collision
        if(character2.collidesWith(player)) {
          loop.stop();
          alert('Game Over!');
        }

      });


//calling the update function

        //backgroundSprite.update();

        //console.log(sprite.x);
      },

/*
-_-_-_-_-_-_-_-_-_- RENDER _-_-_-_-_-_-_-_-_-
*/
//render function
      render: function() {
        //backgroundSprite.render();
        tileEngine.render();
        player.render();
        enemies.forEach(function(character2) {
          character2.render();
        });
      }
    });
//start game loop
  loop.start();

  }
)
