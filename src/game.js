/*
-_-_-_-_-_-_-_-_-_- INIT KONTRA ENGINE _-_-_-_-_-_-_-_-_-
*/
kontra.init()

//loading the assets first and then starting the game
kontra.assets.imagePath = '/Users/asisa/Projects/13kGame/src/img/';
kontra.assets.load('yingyang.png','rgb-pixel.png','blue.png','red.png', 'yellow.png', 'dog.png', 'dog-blue.png','dog-yellow.png', 'dog-red.png')
.then( function()
  {

  var score = 0;

/*
-_-_-_-_-_-_-_-_-_- Sprites and Image Loader _-_-_-_-_-_-_-_-_-
*/
//BACKGROUND
  let background = new Image();
  background.src = '/Users/asisa/Projects/13kGame/src/img/rgb-pixel.png';

    var backgroundSprite = kontra.sprite({
      x: 0,
      y: 0,
      image: background,
      dy: 1
    });

    var backgroundSprite2 = kontra.sprite({
      x: 0,
      y: -256,
      image: background,
      dy: 1
    });

//THE MAIN PLAYER THE DOG
    let dogimg = new Image();
    dogimg.src = '/Users/asisa/Projects/13kGame/src/img/dog.png';
    let dogredimg = new Image();
    dogredimg.src = '/Users/asisa/Projects/13kGame/src/img/dog-red.png';
    let dogblueimg = new Image();
    dogblueimg.src = '/Users/asisa/Projects/13kGame/src/img/dog-blue.png';
    let dogyellowimg = new Image();
    dogyellowimg.src = '/Users/asisa/Projects/13kGame/src/img/dog-yellow.png';
    var player = kontra.sprite({
        x: 120,
        y: 200,
        image: dogimg,
        dy: 0
      });

//DOTS FOR CHANGING THE COLOR

    let redimg = new Image();
    redimg.src = '/Users/asisa/Projects/13kGame/src/img/red.png';
    var red = kontra.sprite({
        x: 100,
        y: -1,
        image: redimg,
        dy: 1.5
      });

    let yellowimg = new Image();
    yellowimg.src = '/Users/asisa/Projects/13kGame/src/img/yellow.png';
    var yellow = kontra.sprite({
        x: 50,
        y: -50,
        image: yellowimg,
        dy: 1.5
      });

    let blueimg = new Image();
    blueimg.src = '/Users/asisa/Projects/13kGame/src/img/blue.png';
    var blue = kontra.sprite({
        x: 220,
        y: - 200,
        image: blueimg,
        dy: 1.5
      });



//ARRAY WITH ITEMS TO COLLECT


      var items = [

        kontra.sprite({
        x: 100,
        y: 0,
        width:10,
        height:5,
        color: 'red',
        dy: 1,
      }),

      kontra.sprite({
      x: 30,
      y: -100,
      width:10,
      height:5,
      color: 'red',
      dy: 1,
    }),

        kontra.sprite({
        x: 150,
        y: -200,
        width:10,
        height:5,
        color: 'blue',
        dy: 1.5
        }),

      kontra.sprite({
      x: 150,
      y: -200,
      width:10,
      height:5,
      color: 'blue',
      dy: 1.5
      }),

        kontra.sprite({
        x: 30,
        y: -10,
        width:10,
        height:5,
        color: 'yellow',
        dy: 0.5
        }),

        kontra.sprite({
        x: 30,
        y: -10,
        width:10,
        height:5,
        color: 'yellow',
        dy: 0.5
        })

      ];
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

      if (kontra.keys.pressed('right')){
        player.x += 1;
      }

      if (kontra.keys.pressed('left')){
        player.x -= 1;
      }

  /*    if(player.y <= 40) {
        //pause game
        loop.stop();

        alert('YouWon!');
      }
*/


/*
-_-_-_-_-_-_-_-_-_- COLLISOION _-_-_-_-_-_-_-_-_-
*/

//Bouncing the sprite on the edgers of the canvas

/*        if (red.y >= 206) {
          red.y = 205,
          red.dy = -2
        }

        else if (red.y <= 0) {
          red.y = 1,
          red.dy = 3
        }

        if (red.x < 32) {
          red.x = 32;
          red.dx = Math.abs(rot.dx);
        }

        else if (red.x > 200) {
          red.x = 200;
          red.dx = -Math.abs(rot.dx);
        }
*/
//ITEM BEHAVIOUR
    items.forEach(function(item){

      if (item.collidesWith(player)) {
        item.y = -200;

        if(player.image == dogredimg && item.color == 'red')
        {score = score + 10;}

        else if(player.image == dogyellowimg && item.color == 'yellow') {
        score = score + 10;}

        else if(player.image == dogblueimg && item.color == 'blue') {
        score = score + 10;}

        else {score = score - 10;}

      }


      if (item.y >= 256) {
        item.x = Math.random() * 256;
        item.y = (Math.random() * 256) - 256;
      }
      item.update();
    });

//Dog and color dots check for collision
        if(red.collidesWith(player)) {
          player.image = dogredimg;
          red.y = -200;
        }

        if(blue.collidesWith(player)) {
          player.image = dogblueimg;
          blue.y = -200;
        }

        if(yellow.collidesWith(player)) {
          player.image = dogyellowimg;
          yellow.y = -200;
        }

//FUNCTION FOR EACH ELEMENT OF THE DOTS ARRAY


//Background LOOP

      if (backgroundSprite.y >= 256) {
        backgroundSprite.y = -256;
        backgroundSprite.dy = 1;
      }

      if (backgroundSprite2.y >= 256) {
        backgroundSprite2.y = -256;
        backgroundSprite2.dy = 1;
      }

//red,blue,yellow LOOP

      if (blue.y >= 256) {
        blue.x = Math.random() * 256;
        blue.y = (Math.random() * 256) - 256;
      }

      if (yellow.y >= 256) {
        yellow.x = Math.random() * 256;
        yellow.y = (Math.random() * 256) - 256;
      }

      if (red.y >= 256) {
        red.x = Math.random() * 256;
        red.y = (Math.random() * 256) - 256;
      }

      if (score > 100)
      { loop.stop();
      alert('You Won!');}
      else if(score < -50) {
      loop.stop();
      alert('You Lost!');
      }

//calling the update function

        backgroundSprite.update();
        backgroundSprite2.update();
        red.update();
        blue.update();
        yellow.update();
        player.update();
        console.log(score);

      },

/*
-_-_-_-_-_-_-_-_-_- RENDER _-_-_-_-_-_-_-_-_-
*/
//render function
      render: function() {
        backgroundSprite.render();
        backgroundSprite2.render();
        blue.render();
        yellow.render();
        red.render();

        items.forEach(function(item){
            item.render();
        });

        player.render();

      }
    });
//start game loop
  loop.start();

  }
)
