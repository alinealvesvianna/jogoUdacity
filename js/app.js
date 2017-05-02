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

/**
 * Variáveis utilizadas para deslocar o retângulo que seleciona
 * o jogador no início do jogo.
 */
var deslocamentoRetanguloInicial = 0;
var deslocarRetangulo = 100;

/**
 * @description:  Essa função gera números aleatórios para parâmetros do jogo.
 *
 * @param {number} max - o maior número aleatório que pode ser retornado
 * @param {number} min - o menor número aleatório que pode ser retornado
 * @returns {number} - Retorna um número aleatório entre o parâmetro min e max
 *
 */
function numeroAleatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @description:  Essa função cria retângulos com texto, e centraliza
 *                o conteúdo em relação a sua a altura e largura.
 *
 * @param ParametrosRetangulo {object} - Define os parâmetros para desenhar o retângulo
 */
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

/**
 * @description: Super classe, que abstrai as classes do jogo,
 *               Vidas, Enemy e Player.
 * @constructor
 * @param x {number} - Define a posição x do personagem
 * @param y {number} - Define a posição y do personagem
 */
var Personagens = function(x, y) {
    this.sprite = "sprite";
    this.x = x;
    this.y = y;
}

/**
 * @description: Metódo da Super classe Personagem, que renderiza
 *               os personagens na tela
 * @constructor
 */
Personagens.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
};

/**
 * @description: Metódo da Super classe Personagem, que atualiza
 *               os personagens na tela
 * @constructor
 */
Personagens.prototype.update = function() {};


/**
 * @description: Classe Jogo, criada para guardar os estados do jogo
 * @constructor
 * @param estado {object} - Define o estado
 * @param vidas {number} - Define a quantidades de vidas
 * @param nivel {number} - Define o nível
 * @param deslocamentoRetanguloSelecionarPersonagem {number} - Define a posição do retângulo
 *        para seleção do player
 */
var Jogo = function(estado, vidas, nivel, deslocamentoRetanguloSelecionarPersonagem) {
    this.estado = estado;
    this.vidas = vidas;
    this.nivel = nivel;
    this.deslocamentoRetanguloSelecionarPersonagem = deslocamentoRetanguloSelecionarPersonagem;
};


/**
 * @description: Metódo da Classe Jogo, que atualiza
 *               os estados do jogo
 * @constructor
 */
Jogo.prototype.update = function() {};

/**
 * @description: Metódo da Classe Jogo, que renderiza
 *               os estados do jogo
 * @constructor
 */
Jogo.prototype.render = function() {
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

    if (this.vidas === 0) {
        this.estado.finalJogo = true,
            this.morrer();
    }
}

/**
 * @description: Metódo da Classe Jogo, que mostra mensagem
 *               de game over
 * @constructor
 */
Jogo.prototype.morrer = function() {
    desenharRetangulo({
        x: 102,
        y: 150,
        w: 300,
        h: 70,
        texto: "Você Perdeu, seu ruim!",
        transparencia: 0.6,
        corRetangulo: "Tomato",
        bordaRetanguloCor: "Salmon",
        corFonte: "White",
        tamanhoFonte: 20,
    });

    desenharRetangulo({
        x: 7,
        y: 300,
        w: 490,
        h: 50,
        texto: "Pressione a barra de espaço para começar novamente",
        transparencia: 0.6,
        corRetangulo: "GoldenRod",
        bordaRetanguloCor: "Gold",
        corFonte: "White",
        tamanhoFonte: 16,
    })
}

/**
 * @description: Metódo da Classe Jogo, que mostra
 *               retângulo para escolher jogador
 * @constructor
 */
Jogo.prototype.selecionarPlayer = function() {

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

/**
 * @description: Metódo da Classe Jogo, que faz
 *               retângulo de escolha de jogador
 *               se mover ao usar o teclado.
 * @constructor
 */
Jogo.prototype.handleInput = function(key) {
    var objetoJogo = this;
    switch (key) {

        case "left":

            if (this.deslocamentoRetanguloSelecionarPersonagem > 6 && this.estado.inicioJogo === true) {
                deslocamentoRetanguloInicial--;
                this.deslocamentoRetanguloSelecionarPersonagem = (deslocarRetangulo * deslocamentoRetanguloInicial) + 6;
            }

            break;

        case "right":

            if (this.deslocamentoRetanguloSelecionarPersonagem < 400 && this.estado.inicioJogo === true) {
                deslocamentoRetanguloInicial++;
                this.deslocamentoRetanguloSelecionarPersonagem = (deslocarRetangulo * deslocamentoRetanguloInicial) + 6;
            }

            break;

        case "enter":
            if (this.estado.inicioJogo === true) {
                players.forEach(function(player) {
                    if (objetoJogo.deslocamentoRetanguloSelecionarPersonagem === player.posicaoJogador) {
                        sprite = player.sprite;
                    }
                });
                this.estado.inicioJogo = false
            }
            break;

        case "spacebar":
            if (this.estado.finalJogo === true) {
                this.vidas = 3;
                this.nivel = 1;
                this.estado.inicioJogo = true;
                this.estado.finalJogo = false;
            }
            break;
    }
};

/**
 * @description: Classe Enemy, gera os inimigos
 * @constructor
 * @param x {number} - Define x
 * @param y {number} - Define y
 * @param speed {number} - Define a velocidade
 */
var Enemy = function(x, y, speed) {
    Personagens.call(this, x, y, "images/enemy-bug.png");
    this.speed = speed;
    this.vidas = 3;
    this.estado = {
        finalJogo: false
    }
};

Enemy.prototype = new Personagens();
Enemy.prototype.constructor = Enemy;

/**
 * @description: Metódo da Classe Enemy,
 *               que atualiza inimigos na tela
 * @constructor
 */
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 6) {
        this.x = -1;
    }
};

/**
 * @description: Metódo da Classe Enemy,
 *               que renderiza inimigos na tela
 * @constructor
 */
Enemy.prototype.render = function() {
    if (this.vidas === 0) {
        this.estado.finalJogo = true;
        this.sprite = "";
    }
    if (this.estado.finalJogo === false) {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);
    }
}

/**
 * @description: Metódo da Classe Enemy,
 *               que muda as propriedades
 *               dos inimigos ao usar o teclado
 * @constructor
 */
Enemy.prototype.handleInput = function(key) {
    switch (key) {
        case "enter":
            if (this.estado.finalJogo === true) {
                allEnemies.forEach(function(enemy) {
                    enemy.sprite = "images/enemy-bug.png";
                    enemy.speed = numeroAleatorio(5, 1);
                    enemy.x = 1;
                    enemy.vidas = 3;
                    enemy.estado.finalJogo = false;
                });
            }
            break;
    }
}

/**
 * @description: Classe Player, gera o jogador
 * @constructor
 * @param x {number} - Define x
 * @param y {number} - Define y
 * @param vidas {number} - Define vidas
 * @param nivel {number} - Define nível
 */
var Player = function(x, y, vidas, nivel) {
    Personagens.call(this);
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.vidas = vidas;
    this.nivel = nivel;
    this.estado = {
        inicioJogo: true,
        finalJogo: false,
    }
};

Player.prototype = new Personagens();
Player.prototype.constructor = Player;

/**
 * @description: Metódo da Classe Player,
 *               que renderiza o jogador
 *               na tela
 * @constructor
 */
Player.prototype.render = function() {
    if (this.estado.inicioJogo === true) {
        this.selecionarPlayer();
    }

    if (this.vidas === 0) {
        this.estado.finalJogo = true;
        this.sprite = "";
    }

    if (this.estado.inicioJogo === false && this.estado.finalJogo === false) {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
    }
};

/**
 * @description: Metódo da Classe Player,
 *               que exibe todas as opções
 *               de personagens na tela
 * @constructor
 */
Player.prototype.selecionarPlayer = function() {
    for (var i = 0; i < players.length; ++i) {
        players[i].posicaoJogador = (100 * i) + 6;
        ctx.drawImage(Resources.get(players[i].sprite), players[i].posicaoJogador, 200, (players[i].largura) * 1.3, 100 * 1.5);
    }
};

/**
 * @description: Metódo da Classe Player,
 *               que movimenta o jogador na tela
 *               ao acionar o teclado
 * @constructor
 */
Player.prototype.handleInput = function(key) {

    switch (key) {
        case "left":
            if (this.x > 0 && this.estado.inicioJogo === false && this.estado.finalJogo === false) {
                this.x--;
            }
            break;

        case "up":
            if (this.y >= 0 && this.estado.inicioJogo === false && this.estado.finalJogo === false) {
                this.y--;
            }

            if (this.y <= -1 && this.estado.inicioJogo === false && this.estado.finalJogo === false) {
                console.log(this.y);

                ctx.clearRect(0, 0, 500, 600);
                this.nivel++;
                this.y = 5;

                allEnemies.forEach(function(enemy) {
                    enemy.speed += 1;
                });
                ambienteJogo.nivel++;
            }
            break;

        case "right":

            if (this.x < 4 && this.estado.inicioJogo === false && this.estado.finalJogo === false) {
                this.x++;
            }

            break;

        case "down":
            if (this.y < 5 && this.estado.inicioJogo === false && this.estado.finalJogo === false) {
                this.y++;
            }
            break;

        case "enter":
            if (this.estado.inicioJogo === true) {
                this.sprite = sprite;
                this.estado.inicioJogo = false
            }
            break;

        case "spacebar":
            if (this.estado.finalJogo === true) {
                this.vidas = 3;
                this.nivel = 1;
                this.estado.inicioJogo = true;
                this.estado.finalJogo = false;
            }
            break;
    }

};

/**
 * @description: Classe Vida que instância os corações no jogo,
 *                e faz o jogador ganhar vidas ao pegá-lo
 * @constructor
 * @param x {number} - Define x
 * @param y {number} - Define y
 * @param speed {number} - Define a velocidade
 */
var Vida = function(x, y, speed) {
    Personagens.call(this);
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = "images/Heart.png";
    this.estado = {
        finalJogo: false,
    }
    this.vidas = 3;

}

Vida.prototype = new Personagens();
Vida.prototype.constructor = Vida;


/**
 * @description: Metódo da Classe Vida,
 *               que atualiza os corações na tela
 * @constructor
 */
Vida.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 30) {
        this.x = -1;
    }

    if (this.y < 1) {
        this.y = numeroAleatorio(3, 1);
    }
}

/**
 * @description: Metódo da Classe Vida,
 *               que atualiza os corações na tela
 * @constructor
 */
Vida.prototype.render = function() {
    if (this.vidas === 0) {
        this.estado.finalJogo = true;
        this.sprite = "";
    }
    if (this.estado.finalJogo === false) {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);
    }
}

/**
 * @description: Metódo da Classe Vida,
 *               que muda os parâmetros do coração
 *               ao acionar o teclado
 * @constructor
 */
Vida.prototype.handleInput = function(key) {
    switch (key) {
        case "enter":
            if (this.estado.finalJogo === true) {
                premiacaoVidas.forEach(function(vida) {
                    vida.sprite = "images/Heart.png";
                    vida.speed = numeroAleatorio(10, 5);
                    vida.y = numeroAleatorio(3, 1);
                    vida.x = 1;
                    vida.vidas = 3;
                    vida.estado.finalJogo = false;
                });
            }
            break;
    }
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


var ambienteJogo = new Jogo({
    inicioJogo: true,
    finalJogo: false,
    // selecaoJogador: true,
}, 3, 1, 6)

document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        13: "enter",
        32: "spacebar"
    };

    ambienteJogo.handleInput(allowedKeys[e.keyCode]);

    playerEscolhido.handleInput(allowedKeys[e.keyCode]);

    for (var i = 0; i < premiacaoVidas.length; i++) {
        vida.handleInput(allowedKeys[e.keyCode]);
    }

    for (var i = 0; i < allEnemies.length; i++) {
        enemy.handleInput(allowedKeys[e.keyCode]);
    }
});
