// Variáveis globais

var morreu = false;
var inicioJogo = true;
var deslocamentoRetanguloInicial = 0;
var deslocarRetangulo = 100;
var deslocamentoRetanguloSelecionarPersonagem = 6;
var players = [
  {
      sprite: "images/char-boy.png",
      altura: 88,
      largura: 67,
      posicaoJogador: 0
  },
  {
      sprite: "images/char-cat-girl.png",
      altura: 90,
      largura: 68,
      posicaoJogador: 0
  },
  {
      sprite: "images/char-horn-girl.png",
      altura: 90,
      largura: 77,
      posicaoJogador: 0

  },
  {
      sprite: "images/char-pink-girl.png",
      altura: 89,
      largura: 76,
      posicaoJogador: 0
  },
  {
      sprite: "images/char-princess-girl.png",
      altura: 99,
      largura: 75,
      posicaoJogador: 0
  }
];

var sprite = "";

//Funções Utilitárias
function numeroAleatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function desenharRetangulo(x, y, w, h, texto, transparencia, corRetangulo, bordaRetangulo, corFonte, tamanhoFonte) {
    var ParametrosRetangulo = {
        // retanguloStrokeStyle: "black",
        retanguloLineWidth: 6,
        // familiaFonte: "12 px Arial",
        // corFonte: "white",
        // corRetangulo: "yellow"
    }
    // ctx.strokeStyle = ParametrosRetangulo.retanguloStrokeStyle;
    ctx.strokeStyle = bordaRetangulo;
    ctx.lineWidth = ParametrosRetangulo.retanguloLineWidth;
    ctx.globalAlpha = transparencia;
    // ctx.fillStyle = ParametrosRetangulo.corRetangulo;
    ctx.fillStyle = corRetangulo;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x -=
        ParametrosRetangulo.retanguloLineWidth / 2, y -=
        ParametrosRetangulo.retanguloLineWidth / 2, w +=
        ParametrosRetangulo.retanguloLineWidth, h +=
        ParametrosRetangulo.retanguloLineWidth);
    ctx.globalAlpha = 1.0;
    ctx.textBaseline = "middle";
    // ctx.font = ParametrosRetangulo.familiaFonte;
    ctx.font = tamanhoFonte + "px" + " " + "Courier New" ;
    // ctx.fillStyle = ParametrosRetangulo.corFonte;
      ctx.fillStyle = corFonte;
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

    if (playerEscolhido.vidas <= 3 && inicioJogo === false) {
        for (var i = 0; i < playerEscolhido.vidas; ++i) {
            var posicaoCoracao = 30 * i;
            ctx.drawImage(Resources.get("images/Heart.png"), 405 + posicaoCoracao, 60, 30, 50);
        }
    }

    if (playerEscolhido.vidas === 4 && inicioJogo === false) {
        for (var i = 0; i < playerEscolhido.vidas; ++i) {
            var posicaoCoracao = 30 * i;
            ctx.drawImage(Resources.get("images/Heart.png"), 370 + posicaoCoracao, 60, 30, 50);
        }
    }

    if (playerEscolhido.vidas > 4 && inicioJogo === false) {
        ctx.fillText(playerEscolhido.vidas + " Vidas", 420, 90);
    }

    if (inicioJogo === false) {
        ctx.fillText(playerEscolhido.nivel + "°" + " Nível", 10, 90);
    }

    if (morreu === true) {
        playerEscolhido.x = 2;
        playerEscolhido.y = 5;

        desenharRetangulo(102, 150, 300, 70, "Você Perdeu, seu ruim!", 0.6, "Tomato", "Salmon", "White", 20);
        desenharRetangulo(7, 300, 490, 50, "Pressione a barra de espaço para começar novamente", 0.6, "GoldenRod", "Gold", "White", 16);
    }

    if(inicioJogo === true){
        playerEscolhido.selecionarPlayer()
    }

};

//Definindo metódo de uptade padrão
Personagens.prototype.update = function () { };

Personagens.prototype.selecionarPlayer = function () {
    for (var i = 0; i < players.length; ++i) {
        players[i].posicaoJogador = (100 * i) + 6;
        ctx.drawImage(Resources.get(players[i].sprite), players[i].posicaoJogador, 200, (players[i].largura) * 1.3, 100 * 1.5);
        // console.log(players[i].posicaoJogador);
    }

    desenharRetangulo(40, 380, 420, 50, "Escolha um personagem para começar o jogo", 0.5, "AntiqueWhite", "BurlyWood", "Crimson", 16);
    desenharRetangulo(deslocamentoRetanguloSelecionarPersonagem, 240, 85, 100, "", 0.3, "Crimson", "DarkRed", "white", 0)
};

var Enemy = function (x, y, speed) {
    Personagens.call(this);
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = "images/enemy-bug.png";
};

Enemy.prototype = new Personagens();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 6) {
        this.x = -1;
    }
};

Enemy.prototype.morrer = function () {
    enemy.speed = numeroAleatorio(5, 1);
    enemy.x = 1;
};

var Player = function (x, y, vidas, nivel) {
    Personagens.call(this);
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.nivel = 1;
    this.vidas = 3;
};

Player.prototype = new Personagens();
Player.prototype.constructor = Player;

Player.prototype.morrer = function () {
    this.x = 2;
    this.y = 5;
    this.vidas = 3;
    this.nivel = 1;
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case "left":
            if (this.x > 0 && inicioJogo === false) {
                this.x--;
            }

            if(deslocamentoRetanguloSelecionarPersonagem > 6 && inicioJogo === true){
              deslocamentoRetanguloInicial--;
              deslocamentoRetanguloSelecionarPersonagem = (deslocarRetangulo * deslocamentoRetanguloInicial) + 6;
              // console.log(deslocamentoRetanguloSelecionarPersonagem)
            }

            break;

        case "up":
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
        case "right":
            if (this.x < 4 && inicioJogo === false) {
                this.x++;
            }

            if(deslocamentoRetanguloSelecionarPersonagem < 400 && inicioJogo === true){
              deslocamentoRetanguloInicial++;
              deslocamentoRetanguloSelecionarPersonagem = (deslocarRetangulo * deslocamentoRetanguloInicial) + 6;
              // console.log(deslocamentoRetanguloSelecionarPersonagem)
            }

            break;
            //if the user pressed the down keyboard button move player down one y value
        case "down":
            if (this.y < 5) {
                this.y++;
            }
            break;
            //used to select a player
        case "enter":
            if(inicioJogo === true){
              players.forEach(function(player){
                  if(deslocamentoRetanguloSelecionarPersonagem === player.posicaoJogador){
                    sprite = player.sprite;
                    playerEscolhido.sprite = sprite;
                  }
              });
              inicioJogo = false
            }
            break;
        case "spacebar":
        if (morreu === true) {
            playerEscolhido.morrer()
            allEnemies.forEach(function (enemy) {
                enemy.morrer()
            })
            premiacaoVidas.forEach(function (vida) {
                vida.morrer();
            })
            inicioJogo = true;
            morreu = false;
        }
          break;
    }

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

var allEnemies = [];
for (var i = 1; i < 4; ++i) {
    var enemy = new Enemy(1, i, numeroAleatorio(5, 1));
    allEnemies.push(enemy);
}

var playerEscolhido = new Player(2, 5, 3, 1);

var premiacaoVidas = [];
for (var i = 0; i < 2; i++) {
    var vida = new Vida(1, numeroAleatorio(3, 1), numeroAleatorio(10, 5))
    premiacaoVidas.push(vida);
}

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        13: "enter",
        32: "spacebar"
    };

    playerEscolhido.handleInput(allowedKeys[e.keyCode]);

});
