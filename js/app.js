var morreu = false;
var inicioJogo = true;
//Funções Utilitárias
function numeroAleatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function desenharRetangulo(x, y, w, h, texto, transparencia) {
    //seta parâmetros do retângulo
    var ParametrosRetangulo = {
        retanguloStrokeStyle: "black",
        retanguloLineWidth: 6,
        familiaFonte: "12 px Arial",
        corFonte: "white",
        corRetangulo: "yellow"
    }
    // draw rectangular
    ctx.strokeStyle = ParametrosRetangulo.retanguloStrokeStyle;
    ctx.lineWidth = ParametrosRetangulo.retanguloLineWidth;
    ctx.globalAlpha = transparencia;
    ctx.fillStyle = ParametrosRetangulo.corRetangulo;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x -=
        ParametrosRetangulo.retanguloLineWidth / 2, y -=
        ParametrosRetangulo.retanguloLineWidth / 2, w +=
        ParametrosRetangulo.retanguloLineWidth, h +=
        ParametrosRetangulo.retanguloLineWidth);
    ctx.globalAlpha = 1.0;
    // draw text (this.val)
    ctx.textBaseline = "middle";
    ctx.font = ParametrosRetangulo.familiaFonte;
    ctx.fillStyle = ParametrosRetangulo.corFonte;
    // ctx2d.measureText(text).width/2
    // returns the text width (given the supplied font) / 2
    textX = x + w / 2 - ctx.measureText(texto).width / 2;
    textY = y + h / 2;
    ctx.fillText(texto, textX, textY);
}

//Criando uma superclasse para os Personagens e suas propriedades em comum
var Personagens = function (x, y, vidas, nivel) {
    this.sprite = "sprite";
    this.x = x;
    this.y = y;
    this.vidas = vidas;
    this.nivel = nivel;
}

// Desenha todos os Personagens (Enemy, Player e Vidas ) na tela
Personagens.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
    ctx.font = "20px Trebuchet MS";
    ctx.fillStyle = "white"


    if (player.vidas <= 3) {
        for (var i = 0; i < player.vidas; ++i) {
            var posicaoCoracao = 30 * i;
            ctx.drawImage(Resources.get("images/Heart.png"), 405 + posicaoCoracao, 50, 30, 50);
        }
    }

    if (player.vidas === 4) {
        for (var i = 0; i < player.vidas; ++i) {
            var posicaoCoracao = 30 * i;
            ctx.drawImage(Resources.get("images/Heart.png"), 370 + posicaoCoracao, 50, 30, 50);
        }
    }

    if (player.vidas > 4) {
        ctx.fillText(player.vidas + " Vidas", 420, 90);
    }

    ctx.fillText(player.nivel + "°" + " Nível", 10, 90);

    if (morreu === true) {
        player.x = 2;
        player.y = 5;
        desenharRetangulo(102, 150, 300, 100, "Você Perdeu, seu ruim!!", 0.2);
        desenharRetangulo(102, 300, 300, 50, "Pressione enter para começar novamente", 0.2);
    }

    player.selecionarPlayer()

};

//Definindo metódo de uptade padrão
Personagens.prototype.update = function () { };

Personagens.prototype.selecionarPlayer = function (sprite) {
    var players = [
      {
          imagemJogador: "images/char-boy.png",
          altura: 88,
          largura: 67
      },
      {
          imagemJogador: "images/char-cat-girl.png",
          altura: 90,
          largura: 68

      },
      {
          imagemJogador: "images/char-horn-girl.png",
          altura: 90,
          largura: 77

      },
      {
          imagemJogador: "images/char-pink-girl.png",
          altura: 89,
          largura: 76

      },
      {
          imagemJogador: "images/char-princess-girl.png",
          altura: 99,
          largura: 75
      }
    ]


    for (var i = 0; i < players.length; ++i) {
        // console.log(players)
        var posicaoJogador = 95 * i;
        ctx.drawImage(Resources.get(players[i].imagemJogador), 0 + posicaoJogador, 200, (players[i].largura) * 1.5, (players[i].altura) * 1.5);
    }


        if(inicioJogo === true){
          desenharRetangulo(95,  230, 100, 100, "", 0.2)
        }


};

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
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

// Personagens.prototype.reset = function() {
//
//   this.sprite = "sprite";
//   this.x = x;
//   this.y = y;
//   this.vidas = vidas;
//   this.nivel = nivel;
//
// };


Enemy.prototype = new Personagens();
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if (this.x > 6) {
        this.x = -1;
    }
};

Enemy.prototype.morrer = function () {
    // allEnemies.forEach(function(enemy) {
    enemy.speed = numeroAleatorio(5, 1);
    enemy.x = 1;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, vidas, nivel) {
    Personagens.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.nivel = 1;
    this.vidas = 3;
};

Player.prototype = new Personagens();
Player.prototype.constructor = Player;


Player.prototype.morrer = function () {

    // function desenharRetangulo(x, y, w, h, texto, transparencia)
    player.x = 2;
    player.y = 5;
    player.vidas = 3;
    player.nivel = 1;

};

Player.prototype.handleInput = function (key) {
    // if (morreu === false) {
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

                allEnemies.forEach(function (enemy) { // aumenta a velocidade do inimigo
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
        case "enter":
            if (morreu === true) {
                console.log("morri porra!")
                player.morrer()
                allEnemies.forEach(function (enemy) {
                    enemy.morrer()
                })
                premiacaoVidas.forEach(function (vida) {
                    vida.morrer();
                })
                morreu = false;
            }
            break;
    }

    // } else {
    //     reset();
    // }
};

// Classe para instanciar vidas ao jogador
var Vida = function (x, y, speed) {
    Personagens.call(this);
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = "images/Heart.png";
}

Vida.prototype = new Personagens();
Vida.prototype.constructor = Vida;


Vida.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 30) {
        this.x = -1;
    }

    if (this.y < 1) {
        this.y = numeroAleatorio(3, 1);
    }
}

Vida.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);
}

Vida.prototype.morrer = function () {
    vida.y = numeroAleatorio(3, 1);
    vida.speed = numeroAleatorio(10, 5);
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
for (var i = 0; i < 2; i++) {
    var vida = new Vida(1, numeroAleatorio(3, 1), numeroAleatorio(10, 5))
    console.log(i);
    premiacaoVidas.push(vida);
    console.log(vida);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: "enter"
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
