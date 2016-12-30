/**************************************************************
 * Purpose: Esse documento contém funcões, classes e váriaveis
 *          necessárias para executar o jogo Frogger.
 *
 * Author:  Base e engine fornecida pelo curso de nanodegree da Udacity.
 *          Desenvolvimento de Aline Vianna
 *
 * Date:    12/21/2016
 *
 **************************************************************/
/**
 *  @description: Variáveis globais
 */
/**
 * Variável utilizada para saber se o jogador morreu, e exibir
 * a tela de game over.
 */
// var morreu = false;

/**
 * Variável utilizada para saber se o jogo iniciou, para
 * fazer a escolha do personagem.
 */
// var inicioJogo = true;

/**
 * Variáveis utilizadas deslocar o retângulo usado para selecionar
 * o jogador ao início do jogo.
 */


/**
 * Array de objetos com propriedades para selecionar o jogador.
 */
var players = [{
    sprite: "images/char-boy.png",
    altura: 88,
    largura: 67,
    posicaoJogador: 0
}, {
    sprite: "images/char-cat-girl.png",
    altura: 90,
    largura: 68,
    posicaoJogador: 0
}, {
    sprite: "images/char-horn-girl.png",
    altura: 90,
    largura: 77,
    posicaoJogador: 0

}, {
    sprite: "images/char-pink-girl.png",
    altura: 89,
    largura: 76,
    posicaoJogador: 0
}, {
    sprite: "images/char-princess-girl.png",
    altura: 99,
    largura: 75,
    posicaoJogador: 0
}];

/**
 * Variável utilizada para guardar o valor do sprite usado para selecionar o jogador.
 */
var sprite = "";

var deslocamentoRetanguloInicial = 0;
var deslocarRetangulo = 100;

function numeroAleatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function desenharRetangulo(ParametrosRetangulo) {
    var retanguloLineWidth = 6;

    ctx.strokeStyle = ParametrosRetangulo.bordaRetanguloCor;
    ctx.lineWidth = retanguloLineWidth;
    ctx.globalAlpha = ParametrosRetangulo.transparencia;
    ctx.fillStyle = ParametrosRetangulo.corRetangulo;
    ctx.fillRect(ParametrosRetangulo.x, ParametrosRetangulo.y, ParametrosRetangulo.w, ParametrosRetangulo.h);
    ctx.strokeRect(
        ParametrosRetangulo.x -= retanguloLineWidth / 2,
        ParametrosRetangulo.y -= retanguloLineWidth / 2,
        ParametrosRetangulo.w += retanguloLineWidth,
        ParametrosRetangulo.h += retanguloLineWidth
    );
    ctx.globalAlpha = 1.0;
    ctx.textBaseline = "middle";
    ctx.fillStyle = ParametrosRetangulo.corFonte;
    ctx.font = ParametrosRetangulo.tamanhoFonte + "px" + " " + "Courier New";
    textX = ParametrosRetangulo.x + ParametrosRetangulo.w / 2 - ctx.measureText(ParametrosRetangulo.texto).width / 2;
    textY = ParametrosRetangulo.y + ParametrosRetangulo.h / 2;
    ctx.fillText(ParametrosRetangulo.texto, textX, textY);
}


//var Personagens = function (x, y, vidas, nivel)
var Personagens = function (x, y) {
    this.sprite = "sprite";
    this.x = x;
    this.y = y;
    //this.vidas = vidas;
    //this.nivel = nivel;
}

Personagens.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
};

Personagens.prototype.update = function () { };

var Jogo = function (estado, vidas, nivel, deslocamentoRetanguloSelecionarPersonagem) {
    //this.estado = {
    //    inicioJogo: true,
    //    finalJogo: false,
    //    selecaoJogador: true,
    //};

    this.estado = estado;
    this.vidas = vidas;
    this.nivel = nivel;
    this.deslocamentoRetanguloSelecionarPersonagem = deslocamentoRetanguloSelecionarPersonagem;
};

Jogo.prototype.update = function () { };

Jogo.prototype.render = function () {
    ctx.font = "20px Trebuchet MS";
    ctx.fillStyle = "white"

    if (this.vidas <= 3 && this.estado.inicioJogo === false) {
        for (var i = 0; i < this.vidas; ++i) {
            var posicaoCoracao = 30 * i;
            ctx.drawImage(Resources.get("images/Heart.png"), 405 + posicaoCoracao, 60, 30, 50);
        }
    }

    if (this.vidas === 4 && this.estado.inicioJogo === false) {
        for (var i = 0; i < this.vidas; ++i) {
            var posicaoCoracao = 30 * i;
            ctx.drawImage(Resources.get("images/Heart.png"), 370 + posicaoCoracao, 60, 30, 50);
        }
    }

    if (this.vidas > 4 && this.estado.inicioJogo === false) {
        ctx.fillText(this.vidas + " Vidas", 420, 90);
    }

    if (this.estado.inicioJogo === false) {
        ctx.fillText(this.nivel + "°" + " Nível", 10, 90);
    }

    if (this.estado.inicioJogo === true) {
        this.selecionarPlayer();
    }

}

Jogo.prototype.selecionarPlayer = function (estado) {

  desenharRetangulo({
        x: 40,
        y: 380,
        w: 420,
        h: 50,
        texto: "Escolha um personagem para começar o jogo.",
        transparencia: 0.5,
        corRetangulo: "AntiqueWhite",
        bordaRetanguloCor: "BurlyWood",
        corFonte: "Crimson",
        tamanhoFonte: 16,
    });

    desenharRetangulo({
        x: 10,
        y: 450,
        w: 480,
        h: 50,
        texto: "Para selecionar um personagem, pressione Enter.",
        transparencia: 0.5,
        corRetangulo: "AntiqueWhite",
        bordaRetanguloCor: "BurlyWood",
        corFonte: "Crimson",
        tamanhoFonte: 16,
    });

    desenharRetangulo({
        x: this.deslocamentoRetanguloSelecionarPersonagem,
        y: 240,
        w: 85,
        h: 100,
        texto: "",
        transparencia: 0.3,
        corRetangulo: "Crimson",
        bordaRetanguloCor: "DarkRed",
        corFonte: "white",
        tamanhoFonte: 0,
    });

}

Jogo.prototype.handleInput = function (key) {

    switch (key) {

        case "left":

            if (this.deslocamentoRetanguloSelecionarPersonagem > 6) {
                deslocamentoRetanguloInicial--;
                this.deslocamentoRetanguloSelecionarPersonagem = (deslocarRetangulo * deslocamentoRetanguloInicial) + 6;
                console.log(this.deslocamentoRetanguloSelecionarPersonagem)
            }

            break;

        case "right":

            if (this.deslocamentoRetanguloSelecionarPersonagem < 400) {
                deslocamentoRetanguloInicial++;
                this.deslocamentoRetanguloSelecionarPersonagem = (deslocarRetangulo * deslocamentoRetanguloInicial) + 6;
                console.log(this.deslocamentoRetanguloSelecionarPersonagem)
            }

            break;

        case "enter":

           if (this.estado.inicioJogo ===  true) {
               players.forEach(function (player) {
                 //TODO: Como chamar a instância da classe Jogo, sem marretar o objeto criado?
                   if (ambienteJogo.deslocamentoRetanguloSelecionarPersonagem === player.posicaoJogador) {
                       sprite = player.sprite;
                       playerEscolhido.sprite = sprite;
                   }
               });
               this.estado.inicioJogo = false
           }
           break;
    }
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
    this.vidas = vidas;
    this.nivel = nivel;
};

Player.prototype = new Personagens();
Player.prototype.constructor = Player;


Player.prototype.render = function () {
  if(ambienteJogo.estado.inicioJogo === true){
      this.selecionarPlayer();
  }
  else{
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
  }
};

Player.prototype.morrer = function () {
    this.x = 2;
    this.y = 5;
    this.vidas = 3;
    this.nivel = 1;
};

Player.prototype.selecionarPlayer = function () {
    for (var i = 0; i < players.length; ++i) {
        players[i].posicaoJogador = (100 * i) + 6;
        ctx.drawImage(Resources.get(players[i].sprite), players[i].posicaoJogador, 200, (players[i].largura) * 1.3, 100 * 1.5);
        // console.log(players[i].posicaoJogador);
    }
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case "left":
            if (this.x > 0) {
                this.x--;
            }
            break;

        case "up":
            if (this.y > 0) {
                this.y--;
            }

            else {
                ctx.clearRect(0, 0, 500, 600);
                this.nivel++;
                this.y = 5;

                allEnemies.forEach(function (enemy) {
                    enemy.speed += 1;
                });
            }
            break;

        case "right":

            if (this.x < 4) {
                this.x++;
            }


            break;

        case "down":
            if (this.y < 5) {
                this.y++;
            }
            break;


        // case "spacebar":
        //     if (morreu === true) {
        //         playerEscolhido.morrer()
        //         allEnemies.forEach(function (enemy) {
        //             enemy.morrer()
        //         })
        //         premiacaoVidas.forEach(function (vida) {
        //             vida.morrer();
        //         })
        //         inicioJogo = true;
        //         morreu = false;
        //     }
        //     break;
    }

};


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


//var Jogo = function (estado, vidas)

var ambienteJogo = new Jogo({
    inicioJogo: true,
    finalJogo: false,
    selecaoJogador: true,
}, 3, 1, 6)

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        13: "enter",
        32: "spacebar"
    };

  if (ambienteJogo.estado.inicioJogo === true) {
    ambienteJogo.handleInput(allowedKeys[e.keyCode]);
  }
  else{
    playerEscolhido.handleInput(allowedKeys[e.keyCode]);
  }
});
