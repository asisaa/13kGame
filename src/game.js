
/*
-_-_-_-_-_-_-_-_-_- INIT KONTRA ENGINE _-_-_-_-_-_-_-_-_-
*/

kontra.init();

//loading the assets first and then starting the game
kontra.assets.imagePath = 'src/img';
kontra.assets.load('rgb-pixel.png', 'blue.png', 'red.png', 'green.png', 'dog.png', 'dog-blue.png', 'dog-green.png', 'dog-red.png')
.then(function() {

//Variabel to keep track of the score
    var score = 0;

//Variabel to keep track of the canvas and show score, start and end screen
    var c = document.getElementById("game");
    var ctx = c.getContext("2d");
    ctx.font = "small-caps 30px Arial";
    ctx.lineWidth=2;
    ctx.fillStyle="#FFFFFF";
    ctx.fillText("Press 'enter' to start", 20,50);

    var actualscore = {
    showscore: function() {
      console.log('actualscore');
      ctx.fillStyle="#ffffff";
      ctx.fillText("SCORE = " + score, 10,50);
      }
    }

/*
-_-_-_-_-_-_-_-_-_- ALWAYS PAUSE GAME with "p" _-_-_-_-_-_-_-_-_-
*/

//PAUSE
        kontra.keys.bind('p', function() {
            if (loop.isStopped) {
            loop.start();
            } else {loop.stop(); }
        });

/*
-_-_-_-_-_-_-_-_-_- Sprites and Image Loader _-_-_-_-_-_-_-_-_-
*/
//BACKGROUND
    let background = new Image();
    background.src = 'src/img/rgb-pixel.png';

    var backgroundSprite = kontra.sprite({
      x: 0,
      y: 0,
      image: background,
      dy: 1
    });

    var backgroundSprite2 = kontra.sprite({
      x: 0,
      y: -512,
      image: background,
      dy: 1
    });


//THE DOG - THE MAIN PLAYER
    let dogimg = new Image();
    dogimg.src = 'src/img/dog.png';
    let dogredimg = new Image();
    dogredimg.src = 'src/img/dog-red.png';
    let dogblueimg = new Image();
    dogblueimg.src = 'src/img/dog-blue.png';
    let doggreenimg = new Image();
    doggreenimg.src = 'src/img/dog-green.png';
    var player = kontra.sprite({
        x: 120,
        y: 200,
        image: dogimg,
        dy: 0
      });


//DOTS THAT THE DOG CAN CHANGE THE COLOR
    let redimg = new Image();
    redimg.src = 'src/img/red.png';
    var red = kontra.sprite({
        x: 100,
        y: -1,
        image: redimg,
        dy: 1.5
      });

    let greenimg = new Image();
    greenimg.src = 'src/img/green.png';
    var green = kontra.sprite({
        x: 50,
        y: -50,
        image: greenimg,
        dy: 1.5
      });

    let blueimg = new Image();
    blueimg.src = 'src/img/blue.png';
    var blue = kontra.sprite({
        x: 220,
        y: -200,
        image: blueimg,
        dy: 1.5
      });


//ARRAY WITH RGB ITEMS TO COLLECT
    var items = [

      kontra.sprite({
        x: 100,
        y: 0,
        width: 10,
        height: 5,
        color: 'red',
        dy: 1.2,
      }),
      kontra.sprite({
        x: 230,
        y: -100,
        width: 10,
        height: 5,
        color: 'red',
        dy: 1.2,
      }),
      kontra.sprite({
        x: 300,
        y: 10,
        width: 10,
        height: 5,
        color: 'red',
        dy: 1.2,
      }),
      kontra.sprite({
        x: 200,
        y: 40,
        width: 10,
        height: 5,
        color: 'red',
        dy: 1.2,
      }),
      kontra.sprite({
        x: 150,
        y: -200,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 1.5
      }),
      kontra.sprite({
        x: 190,
        y: 100,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 1.5
      }),
      kontra.sprite({
        x: 10,
        y: 200,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 1.5
      }),
      kontra.sprite({
        x: 150,
        y: -200,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 1.5
      }),
      kontra.sprite({
          x: 230,
          y: -100,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 1.8
        }),
      kontra.sprite({
          x: 30,
          y: -10,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 1.8
        }),

        kontra.sprite({
          x: 70,
          y: 10,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 1.8
        }),

        kontra.sprite({
          x: 310,
          y: 70,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 1.8
        })

      ];

/*
------_-_-_-_-_-_-_-_-_- START GAME LOOP FUNCTION_-_-_-_-_-_-_-_-_--------
*/

var loop = kontra.gameLoop({
/*
---------_-_-_-_-_-_-_-_START UPDATE FUNCTION_-_-_-_-_-_-_-_-_-------------
*/
      update: function() {



// Everything down here is part of the gameLoop and inside the update function


/*
-_-_-_-_-_-_-_-_-_- CONTROLES _-_-_-_-_-_-_-_-_-
*/
// control player with the keyboard

        if (kontra.keys.pressed('up')) {
          player.y -= 1;
        }

        if (kontra.keys.pressed('down')) {
          player.y += 1;
        }

        if (kontra.keys.pressed('right')) {
          player.x += 1;
        }

        if (kontra.keys.pressed('left')) {
          player.x -= 1;
        }


//When player leave the canvas it enters the canvas on the other side

        if (player.x >= 320) {
          player.x = 22;
        }

        else if (player.x <= 0) {
          player.x = 298;
        }

        if (player.y >= 512) {
          player.y = 22;
        }

        else if (player.y <= 0) {
          player.y = 490;
        }

/*
-_-_-_-_-_-_-_-_-_- COLLISION FUNCTION_-_-_-_-_-_-_-_-_-
*/
// FEHLER!!! AKTUELL STIMMT DAS ADDIEREN UND SUBTRAHIEREN DER SCORE WÄHREND DES SPIELS NOCH NICHT RICHTIG!!!!
//If the dog collides with an item from the right side the score goes higher else the score goes less
    items.forEach(function(item){

      if (item.collidesWith(player)) {
        item.y = -200;

        if (player.image == dogredimg) {
          if (item.color == 'red') {
            score += 10;
          } else {
            score -= 10;
          }
        } else if (player.image == doggreenimg) {
          if (item.color == '#00ff00') {
            score += 10;
          } else {
            score -= 10;
          }
        }  else if (player.image == dogblueimg) {
          if (item.color == 'blue') {
            score += 10;
          } else {
            score -= 10;
          }
        }
      } else if (item.y >= 512) {
        item.x = Math.random() * 320;
        item.y = (Math.random() * 512) - 512;
      } else {
        item.update();
      }
    });


//If the dog collides with one of the dots the dog changes the color
        if(red.collidesWith(player)) {
          player.image = dogredimg;
          red.y = -200;
        }

        if(blue.collidesWith(player)) {
          player.image = dogblueimg;
          blue.y = -200;
        }

        if(green.collidesWith(player)) {
          player.image = doggreenimg;
          green.y = -200;
        }

/*
-_-_-_-_-_-_-_-_-_- LOOPS_-_-_-_-_-_-_-_-_-
*/

//Background LOOP
      if (backgroundSprite.y >= 512) {
        backgroundSprite.y = -512;
        backgroundSprite.dy = 1;
      }

      if (backgroundSprite2.y >= 512) {
        backgroundSprite2.y = -512;
        backgroundSprite2.dy = 1;
      }

//Dots LOOP
      if (blue.y >= 512) {
        blue.x = Math.random() * 320;
        blue.y = (Math.random() * 512) - 512;
      }

      if (green.y >= 512) {
        green.x = Math.random() * 320;
        green.y = (Math.random() * 512) - 512;
      }

      if (red.y >= 512) {
        red.x = Math.random() * 320;
        red.y = (Math.random() * 512) - 512;
      }

/*
-_-_-_-_-_-_-_-_-_- WIN AND LOOSE_-_-_-_-_-_-_-_-_-
*/
      if (score >= 100) {
        loop.stop();
        //backgroundSprite.x = -500;
        //backgroundSprite2.x = -500;
        console.log(loop.isStopped);
        //alert('You Won!');
        }

      else if(score <= -100) {
        loop.stop();
        console.log(loop.isStopped);
        //alert('You Lost!');
        }


        backgroundSprite.update();
        backgroundSprite2.update();
        red.update();
        blue.update();
        green.update();
        player.update();
        console.log(score);
      },
/*
------------------ CLOSE UPDATE FUNCTIONS ----------------------
*/

/*
-_-_-_-_-_-_-_-_-_- RENDER _-_-_-_-_-_-_-_-_-
*/
//render function
      render: function() {
        backgroundSprite.render();
        backgroundSprite2.render();
        blue.render();
        green.render();
        red.render();
        //showscore.render();

        items.forEach(function(item){
            item.render();
        });

        player.render();
        actualscore.showscore();

      }
    });
/*
------------------ CLOSE GAME LOOP FUNCTIONS ---------------------
*/

//call game loop loop.start();

//START

  kontra.keys.bind('enter', function() {
      loop.start();
  });

}) //close assets loading/then function
