/*
-_-_-_-_-_-_-_-_-_- SOUND _-_-_-_-_-_-_-_-_-
*/
//sound credits: https://css-tricks.com/introduction-web-audio-api/

class Sound {

  constructor(context) {
    this.context = context;
  }

  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'square';
  }

  play(value, time) {
    this.init();

    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

    this.oscillator.start(time);
    this.stop(time);

  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    this.oscillator.stop(time + 0.1);
  }

}


/*
-_-_-_-_-_-_-_-_-_- INIT KONTRA ENGINE _-_-_-_-_-_-_-_-_-
*/

kontra.init();

//loading the assets first and then starting the game
kontra.assets.imagePath = 'src/img';
kontra.assets.load('blue.png', 'red.png', 'green.png', 'dog.png', 'dog-blue.png', 'dog-green.png', 'dog-red.png')
.then(function() {

//BACKGROUND
    let starCount = 500;
    let bgrdStars = [starCount];
    let mode;
    let size;
    let dy;

    for (var i = 0; i < starCount; i++) {
    size = Math.random();

    bgrdStars[i] = kontra.sprite({
      x: Math.round(Math.random() * 320),
      y: Math.round(Math.random() * 512),
      width: Math.round(size * 3),
      height: Math.round(size * 3),
      color: 'white',
      dy: ((Math.pow(Math.random(), 2) * 1.2) + 0.3),
    });
    };


//Variabel to keep track of the score
    var score = 0;

//Variabel to keep track of the canvas and show score, start and end screen
    var c = document.getElementById("game");
    var ctx = c.getContext("2d");
    ctx.font = "small-caps 30px Arial";
    ctx.lineWidth=2;
    ctx.fillStyle="#FFFFFF";
    ctx.fillText("Press 'enter' to start", 20,50);

//Show win or show loss
    var win = {
    showwin: function() {
      ctx.fillStyle="#ffffff";
      ctx.fillText("YOU WON", 77,250);
      }
    }

    var loss = {
    showloss: function() {
      ctx.fillStyle="#ffffff";
      ctx.fillText("GAME OVER", 60,250);
      }
    }

//Show the score
    var actualscore = {
    showscore: function() {
      console.log('actualscore');
      ctx.fillStyle="#ffffff";
      ctx.fillText("SCORE = " + score, 20,50);
      }
    }
//SOUND Variables and initializing a new AudioContext
  let context = new (window.AudioContext || window.webkitAudioContext)();
  let note = new Sound(context);


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


//IMAGE-SPRITES THAT THE DOG CAN CHANGE THE COLOR
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


//ARRAY WITH RGB ITEMS WHICH THE DOG NEED TO COLLECT
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

//BACKGROUND
      bgrdStars.forEach(function(star){
         if (star.y > 512) {
           star.y = 0;
           star.x = Math.round(Math.random() * 320);
         } else {
           star.update();
         }
       });

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
  //Functions are playing the sound depending on score increase or decrease
  //There get used in the forEach collision function below
    var plussound = {
        plus: function() {
        let now = context.currentTime;
        note.play(440.00, now); //plays A
      }
    }

    var minussound = {
        minus: function() {
        let now = context.currentTime;
        note.play(196.00, now); //plays G
      }
    }

//forEach collision function uses the plus and minus sound function
//If dog and an item collides depending if the color fit the score inscreases or descreases
    items.forEach(function(item){

      if (item.collidesWith(player)) {
        item.y = -200;

        if (player.image == dogredimg) {
          if (item.color == 'red') {
            score += 10;
            plussound.plus();
          } else {
            score -= 10;
            minussound.minus();
          }
        } else if (player.image == doggreenimg) {
          if (item.color == '#00ff00') {
            score += 10;
            plussound.plus();
          } else {
            score -= 10;
            minussound.minus();
          }
        }  else if (player.image == dogblueimg) {
          if (item.color == 'blue') {
            score += 10;
            plussound.plus();
          } else {
            score -= 10;
            minussound.minus();
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
          let now = context.currentTime;
          note.play(329.63, now); //plays C
        }

        if(blue.collidesWith(player)) {
          player.image = dogblueimg;
          blue.y = -200;
          let now = context.currentTime;
          note.play(329.63, now); //plays C
        }

        if(green.collidesWith(player)) {
          player.image = doggreenimg;
          green.y = -200;
          let now = context.currentTime;
          note.play(329.63, now); //plays C
        }

/*
-_-_-_-_-_-_-_-_-_- LOOPS_-_-_-_-_-_-_-_-_-
*/

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

        blue.render();
        green.render();
        red.render();
        //showscore.render();

        items.forEach(function(item){
            item.render();
        });

        player.render();
        actualscore.showscore();

        if (score >= 100) {
          loop.stop();
          console.log(loop.isStopped);
          win.showwin();
          //alert('You Won!');
          }

        else if(score <= -100) {
          loop.stop();
          console.log(loop.isStopped);
          loss.showloss();
          //alert('You Lost!');
          }
//TEST
          bgrdStars.forEach(function(star){
            star.render();
          })
  //TESTENDE

      }
    });
/*
------------------ CLOSE GAME LOOP FUNCTIONS ---------------------
*/


//START

  kontra.keys.bind('enter', function() {
      loop.start();
  });

}) //close assets loading/then function
