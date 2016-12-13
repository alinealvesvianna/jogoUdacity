//Funções Utilitárias
function numeroAleatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Criando uma superclasse para os Personagens e suas propriedades em comum
var Personagens = function(x, y) {
    this.sprite = "";
    this.x = x;
    this.y = y;
    this.vidas = 3;
    this.nivel = 1;
}

// Desenha todos os Personagens (Enemy, Player e Vidas ) na tela
Personagens.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
    ctx.font = "20px Trebuchet MS";
    ctx.fillStyle = "white"
    ctx.fillText("Vidas: " + player.vidas, 410, 100);
    ctx.fillStyle = "yellow"
    ctx.fillText("Nível: " + player.nivel, 10, 100);
};

//Definindo metódo de uptade padrão
Personagens.prototype.update = function() {};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    Personagens.call(this);
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = new Personagens();
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if (this.x > 6) {
        this.x = -1;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, vidas, nivel) {
    Personagens.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.nivel = nivel;
    this.vidas = vidas;
};

Player.prototype = new Personagens();
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > 0) {
                this.x--;
            }
            break;

        case 'up':
            if (this.y > 0) {
                this.y--;
            } else { // se o jogador conseguir atravessar o outro lado, ele volta para a posição inicial
                ctx.clearRect(0, 0, 500, 600);
                this.nivel++;
                this.y = 5;

                allEnemies.forEach(function(enemy) { // aumenta a velocidade do inimigo
                    enemy.speed += 1;
                });
            }
            break;
            //if the user pressed the right keyboard button move player right one x value
        case 'right':
            if (this.x < 4) {
                this.x++;
            }
            break;
            //if the user pressed the down keyboard button move player down one y value
        case 'down':
            if (this.y < 5) {
                this.y++;
            }
            break;
            //used to select a player
    }
};

// Classe para instanciar vidas ao jogador
var Vida = function(x,y, speed){
  Personagens.call(this);
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.sprite = "images/Heart.png";
}

Vida.prototype = new Personagens();
Vida.prototype.constructor = Vida;

Vida.prototype.update = function(dt){
  this.x += this.speed * dt;
  if (this.x > 30) {
      this.x = -1;
  }

  if(this.y < 1){
    this.y = numeroAleatorio(3,1);
  }
}

Vida.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 1; i < 4; ++i) {
    var enemy = new Enemy(1, i, numeroAleatorio(5, 1));
    // console.log(i)
    allEnemies.push(enemy);
    // console.log(enemy)
}

var player = new Player(2, 5, 3, 1);

var premiacaoVidas = [];
for (var i = 0; i < 2; i++ ){
  var vida = new Vida(1, numeroAleatorio(3,1), numeroAleatorio(10,5))
  console.log(i);
  premiacaoVidas.push(vida);
  console.log(vida);
}

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
