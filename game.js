kontra.init();

var sprite = kontra.sprite({
    x: 0,
    y: 0,
    width: 50,
    height: 100,
    color: 'green',
    dx: 1,
    dy: 0.5
  });

var loop = kontra.gameLoop({
    update: function() {
      console.log(sprite.x);
      sprite.update();
    },
    render: function() {
      sprite.render();
    }
  });

loop.start();
