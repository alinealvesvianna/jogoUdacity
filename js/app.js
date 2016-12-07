// Enemies our player must avoid
var Enemy = function(locX, locY){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = locX;
    this.y = locY;
    this.speed;

};

Enemy.prototype.speed = function(){
  speed = Math.floor(Math.random() * 6) + 1
  return speed;
}



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.location = location;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// var Player = function(locX, locY)
var Player = function() {
    this.sprite = 'images/char-boy.png';
    // this.x = locX;
    // this.y = locY;
};

Player.prototype.update = function(dt) {
    this.location = location;
};

Player.prototype.render = function() {
    this.location = location;
};

Player.prototype.handleInput = function() {
    this.location = location;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var a = new Enemy(-90, 50);
var b = new Enemy(90, 140);
var c = new Enemy(300, 225);
allEnemies.push(a, b, c);



var numeroAleatorio = function(){
  var max = 10;
  var min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// var gerarInstancias = function(classe, nomeArray){
//   for (i = 0; i < numeroAleatorio(); i++ ){
//     // var i = new Player();
//       var i = new classe()
//       var  nomeArray = []
//       nomeArray.push(i)
//   }
// }
// gerarInstancias(Enemy, banana);





// var player = new Player(90, 90);
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
