/*
Title: BO THE DOG
Author: Asisa Asseily

Contribution: Timo Schuhmacher
>>>> background, debugging support and idea session <<<<<<

CHALLENGE: http://js13kgames.com/
Bo the dog was developed for the 2018 js13kGames competition.
The 2018 theme is "offline".

Libs: Kontra.js
https://straker.github.io/kontra/

Thanks for playing!
*/


/*
-_-_-_-_-_-_-_-_-_- SOUND _-_-_-_-_-_-_-_-_-
*/

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
kontra.assets.load('dog.png', 'dog-blue.png', 'dog-green.png', 'dog-red.png')
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

//SHOW TEXT ON CANVAS - TEXT FOR: SCORE, WIN, LOSS, STARTSCREEN
    var c = document.getElementById("game");
    var ctx = c.getContext("2d");
    ctx.font = "small-caps 26px Arial";
    ctx.lineWidth=2;
//Startscreen
    ctx.fillStyle="#FFFFFF";
    ctx.fillText("Press 'enter' to start", 20,470);

    ctx.fillText("'WOOF!' Bo the dog", 20,40);
    ctx.fillText("fall into the screen.", 20,70);
    ctx.fillText("Help Bo find his way back", 20,120);
    ctx.fillText("into the OFFLINE world.", 20,150);
    ctx.fillText("Get Bo a RGB color and", 20,210);
    ctx.fillText("collect the right pixels.", 20,240);

    let dogimgstart = new Image();
    dogimgstart.src = 'src/img/dog.png';
    ctx.drawImage(dogimgstart,130,350);
    ctx.strokeStyle="#FFFFFF";
    ctx.strokeRect(112, 330, 80, 50);

//Show win
    var win = {
    showwin: function() {
      ctx.fillStyle="#ffffff";
      ctx.fillText("'WOOF!' YOU WON", 20,200);
      ctx.fillText("Bo can go back into", 20,300);
      ctx.fillText("the OFFLINE World", 20,335);
      }
    }
//Show loss
    var loss = {
    showloss: function() {
      ctx.fillStyle="#ffffff";
      ctx.fillText("GAME OVER", 60,250);
      ctx.fillText("Bo is lost in the screen", 20,280);
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
        x: 130,
        y: 350,
        image: dogimg,
        dy: 0
      });


//IMAGE-SPRITES THAT THE DOG CAN CHANGE THE COLOR
    let redimg = new Image();
    var red = kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        x: 300,
        y: 100,
        dy: 1.5,
        color: 'red',
        // custom properties
        radius: 11,
        render: function() {
          this.context.fillStyle = this.color;
          this.context.beginPath();
          this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
          this.context.fill();
        }

      });


    let greenimg = new Image();
    var green = kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        dy: 1.5,
        color: '#00ff00',
        // custom properties
        radius: 11,
        render: function() {
          this.context.fillStyle = this.color;
          this.context.beginPath();
          this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
          this.context.fill();
        }
      });

    let blueimg = new Image();
    var blue = kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        dy: 1.5,
        color: 'blue',
        // custom properties
        radius: 11,
        render: function() {
          this.context.fillStyle = this.color;
          this.context.beginPath();
          this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
          this.context.fill();
        }
      });


//ARRAY WITH RGB ITEMS WHICH THE DOG NEED TO COLLECT
    var items = [

      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'red',
        dy: 2.5
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'red',
        dy: 2.5
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'red',
        dy: 2
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'red',
        dy: 2
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'red',
        dy: 2
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 2.5
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 2.5
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 2
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 2
      }),
      kontra.sprite({
        x: Math.random () * 310,
        y: Math.random () * 500,
        width: 10,
        height: 5,
        color: 'blue',
        dy: 2
      }),
      kontra.sprite({
          x: Math.random () * 310,
          y: Math.random () * 500,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 2
        }),
      kontra.sprite({
          x: Math.random () * 310,
          y: Math.random () * 500,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 2
        }),
      kontra.sprite({
          x: Math.random () * 310,
          y: Math.random () * 500,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 2.5
        }),
      kontra.sprite({
          x: Math.random () * 310,
          y: Math.random () * 500,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 2.5
        }),
      kontra.sprite({
          x: Math.random () * 310,
          y: Math.random () * 500,
          width: 10,
          height: 5,
          color: '#00ff00',
          dy: 2
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
//Items are going faster when the score gets bigger than 30

        items.forEach(function(item){
          if (score >= 30){
            item.dy += 0.005;
          }
        });

        if (score >= 30) {
          red.dy += 0.005;
          blue.dy += 0.005;
          green.dy += 0.005;
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
//update dots and player

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

        bgrdStars.forEach(function(star){
          star.render();
        })

        blue.render();
        green.render();
        red.render();

        items.forEach(function(item){
            item.render();
        });

        player.render();
        actualscore.showscore();

  /*
  -_-_-_-_-_-_-_-_-_- WIN AND LOOSE_-_-_-_-_-_-_-_-_-
  */

        if (score >= 100) {
          loop.stop();
          console.log(loop.isStopped);
          win.showwin();
          }

        else if(score <= -50) {
          loop.stop();
          console.log(loop.isStopped);
          loss.showloss();
          }

      }
    });
/*
------------------ CLOSE GAME LOOP FUNCTIONS ---------------------
*/


//START GAME

  kontra.keys.bind('enter', function() {
      loop.start();
  });

}) //close assets loading/then function
