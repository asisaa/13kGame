/*
-_-_-_-_-_-_-_-_-_- INIT KONTRA ENGINE _-_-_-_-_-_-_-_-_-
*/
kontra.init()

//loading the assets first and then starting the game
//kontra.assets.imagePath = '.../assets/img/';
kontra.assets.load('/Users/asisa/Projects/13k-js-game-repo/13kGame/src/img/juicy.png')
.then( function()
  {

/*
-_-_-_-_-_-_-_-_-_- VARIABLES _-_-_-_-_-_-_-_-_-
*/
  let testimg = new Image();
  testimg.src = '/Users/asisa/Projects/13k-js-game-repo/13kGame/src/img/juicy.png';

  var imagesprite = kontra.sprite({
      x: 0,
      y: 0,
      image: testimg,
      dx: 1
    });

    var sprite2 = kontra.sprite({
        x: 10,
        y: 100,
        width: 50,
        height: 50,
        color: 'red',
        dx: 3,
        //dy: 0.5
      });


  /*
  -_-_-_-_-_-_-_-_-_- MOUSE & TOUCH HANDLING _-_-_-_-_-_-_-_-_-
  */


  /*
  -_-_-_-_-_-_-_-_-_- GAME LOOP _-_-_-_-_-_-_-_-_-
  */
  var loop = kontra.gameLoop({
      update: function() {

//control the sprite with pointer
      if (kontra.pointer.pressed('left')){
        // left mouse button pressed
        sprite2.x = 0
      }
      else if (kontra.keys.pressed('right')) {
        // right mouse button pressed
        sprite2.x = 100
      }



// control the sprite with the keyboard

        if (kontra.keys.pressed('left')){
        sprite2.x = 0
        }

        else if (kontra.keys.pressed('right')) {
        sprite2.x = 206,
        sprite2.color = 'green'
        }

        if (kontra.keys.pressed('down')){
        sprite2.y = 100,
        sprite2.color = 'yellow'
        }

        else if (kontra.keys.pressed('up')){
        sprite2.y = 0
        }

//Bouncing the sprite on the edgers of the canvas

        if (imagesprite.x >= 206) {
          imagesprite.x = 205,
          imagesprite.dx = -1
        }

        else if (imagesprite.x <= 0) {
          imagesprite.x = 1,
          imagesprite.dx = 1
        }

        if (sprite2.x >= 206) {
          sprite2.x = 205,
          sprite2.dx = -2
        }

        else if (sprite2.x <= 0) {
          sprite2.x = 1,
          sprite2.dx = 3
        }

//calling the update function
        imagesprite.update();
        sprite2.update();
        //console.log(sprite.x);

      },


//render function
      render: function() {
        imagesprite.render();
        sprite2.render();
      }

    });
//start game loop
  loop.start();

  }
)
