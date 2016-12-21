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
var morreu = false;

/**
* Variável utilizada para saber se o jogo iniciou, para
* fazer a escolha do personagem.
*/
var inicioJogo = true;

/**
* Variáveis utilizadas deslocar o retângulo usado para selecionar
* o jogador ao início do jogo.
*/
var deslocamentoRetanguloInicial = 0;
var deslocarRetangulo = 100;
var deslocamentoRetanguloSelecionarPersonagem = 6;

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
 * @param x {number} - A locacalização inicial do retângulo em x
 * @param y {number} - A locacalização inicial do retângulo em y
 * @param w {number} - A largura do retângulo
 * @param h {number} - A altura do retângulo
 * @param texto {string} - O texto que deve aparecer no retângulo
 * @param transparencia {number} - Um número de com no máximo 2 casais decimais de
 * 0 a 1 para definir opacidade do retângulo
 * @param corRetangulo {string} - O nome da cor do retângulo
 * @param bordaRetangulo {string} - O nome da cor da borda do retângulo
 * @param corFonte {string} - O nome da cor da fonte do texto
 * @param tamanhoFonte {number} - o tamanho da fonte do texto
 *
 */
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
    ctx.font = tamanhoFonte + "px" + " " + "Courier New";
    // ctx.fillStyle = ParametrosRetangulo.corFonte;
    ctx.fillStyle = corFonte;
    textX = x + w / 2 - ctx.measureText(texto).width / 2;
    textY = y + h / 2;
    ctx.fillText(texto, textX, textY);
}

/**
* @description: Super classe, que abstrai todas as classes do jogo,
*               como Vidas, Enemy e Player. Com isso, todos os
*               métodos criados são herdados por essas classes,
*               sem precisar repetir os metódos.
* @constructor
* @param x {number} - Define a posição x do personagem
* @param y {number} - Define a posição y do personagem
* @param vidas {number} - Define a quantidade de vidas do personagem
* @param nivel {number} - Define o nível do personagem
*/
var Personagens = function (x, y, vidas, nivel) {
    this.sprite = "sprite";
    this.x = x;
    this.y = y;
    this.vidas = vidas;
    this.nivel = nivel;
}

/**
* @description: Metódo da Super classe Personagem, que renderiza
*               tela as instâncias Enemy, Player e informações do jogo,
*               como número de vidas e nível que o jogador está.
* @constructor
*/
Personagens.prototype.render = function () {

    /**
    * Desenha todas as classes que utilizam sprite de imagem
    */
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
    ctx.font = "20px Trebuchet MS";
    ctx.fillStyle = "white"

    /**
    * Se a quantidade de vidas da instância Player for menor ou igual a 3, e a variável inicioJogo for falsa,
    * é exibido na tela 3 corações indicando a quantidade de vidas do jogador.
    */
    if (playerEscolhido.vidas <= 3 && inicioJogo === false) {
        for (var i = 0; i < playerEscolhido.vidas; ++i) {
            var posicaoCoracao = 30 * i;
            ctx.drawImage(Resources.get("images/Heart.png"), 405 + posicaoCoracao, 60, 30, 50);
        }
    }

    /**
    * Se a quantidade de vidas da instância Player for igual a 4 e a tela de escolha
    * de jogador não estiver sendo exibida, mudo a posição do indicador de quantidades de vida.
    */
    if (playerEscolhido.vidas === 4 && inicioJogo === false) {
        for (var i = 0; i < playerEscolhido.vidas; ++i) {
            var posicaoCoracao = 30 * i;
            ctx.drawImage(Resources.get("images/Heart.png"), 370 + posicaoCoracao, 60, 30, 50);
        }
    }

    /**
    * Se a quantidade de vidas da instância Player for maior a 4 e a tela de escolha
    * de jogador não estiver sendo exibida, exibo a quantidade de vidas com texto ao
    * invés de corações.
    */
    if (playerEscolhido.vidas > 4 && inicioJogo === false) {
        ctx.fillText(playerEscolhido.vidas + " Vidas", 420, 90);
    }

    /**
    * Exibo na tela o nível da instância de Player, se não estiver na tela de escolha de jogador.
    */
    if (inicioJogo === false) {
        ctx.fillText(playerEscolhido.nivel + "°" + " Nível", 10, 90);
    }

    /**
    * Exibo a mensagem de game over.
    */
    if (morreu === true) {
        playerEscolhido.x = 2;
        playerEscolhido.y = 5;

        desenharRetangulo(102, 150, 300, 70, "Você Perdeu, seu ruim!", 0.6, "Tomato", "Salmon", "White", 20);
        desenharRetangulo(7, 300, 490, 50, "Pressione a barra de espaço para começar novamente", 0.6, "GoldenRod", "Gold", "White", 16);
    }

    /**
    * Exibo a tela de seleção de jogador
    */
    if (inicioJogo === true) {
        playerEscolhido.selecionarPlayer()
    }

};

/**
* @description: Metódo da Super classe Personagem, para definir update
*               padrão.
* @constructor
*/
Personagens.prototype.update = function () { };


/**
* @description: Metódo da Super classe Personagem, para definir seleção jogador.
* @constructor
*/
Personagens.prototype.selecionarPlayer = function () {
    /**
    * Faço um looping para pegar os objetos do array players, definido no início do programa.
    */
    for (var i = 0; i < players.length; ++i) {
        players[i].posicaoJogador = (100 * i) + 6;
        ctx.drawImage(Resources.get(players[i].sprite), players[i].posicaoJogador, 200, (players[i].largura) * 1.3, 100 * 1.5);
        // console.log(players[i].posicaoJogador);
    }

    desenharRetangulo(40, 380, 420, 50, "Escolha um personagem para começar o jogo", 0.5, "AntiqueWhite", "BurlyWood", "Crimson", 16);
    desenharRetangulo(deslocamentoRetanguloSelecionarPersonagem, 240, 85, 100, "", 0.3, "Crimson", "DarkRed", "white", 0)
};

/**
* @description: Classe Enemy, herdada da Super Classe Personagens,
*               para instanciar inimigos.
* @constructor
* @param x {number} - Define a posição x da instâcia de Enemy
* @param y {number} - Define a posição y da instâcia de Enemy
* @param speed {number} - Define a velocidade do Enemy
*/
var Enemy = function (x, y, speed) {
    Personagens.call(this);
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = "images/enemy-bug.png";
};

Enemy.prototype = new Personagens();
Enemy.prototype.constructor = Enemy;


/**
* @description: Metódo da classe Enemy para fazer update
*               do sprite de inimigo
* @constructor
* @param dt {number} - Define o tempo para criar a animação
*/
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 6) {
        this.x = -1;
    }
};

/**
* @description: Metódo da classe Enemy quando a instância de Player morre,
*               para resetar a velocidade e a posição em x.
* @constructor
*/
Enemy.prototype.morrer = function () {
    enemy.speed = numeroAleatorio(5, 1);
    enemy.x = 1;
};

/**
* @description: Classe Player, herdada da Super Classe Personagens,
*               para instanciar o jogador.
* @constructor
* @param x {number} - Define a posição x do jogador
* @param y {number} - Define a posição y do jogador
* @param vidas {number} - Define a quantidade de vidas do jogador
* @param nivel {number} - Define o nível do jogador
*/
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

/**
* @description: Metódo da classe Player quando a instância de Player morre,
*               para resetar os parâmetros iniciais.
* @constructor
*/
Player.prototype.morrer = function () {
    this.x = 2;
    this.y = 5;
    this.vidas = 3;
    this.nivel = 1;
};

/**
* @description: Metódo da classe Player para movimentar
*               o jogador de acordo com a tecla pressionada.
* @param key {string} - define qual a tecla foi pressionada
* @constructor
*/
Player.prototype.handleInput = function (key) {
    switch (key) {
        case "left":

            /**
            * Se a tela de escolha do jogador não tiver sendo exibida e a posição
            * x não for negativa, ao pressionar a tecla esquerda, a
            * posição em x do player é decrementada.
            */
            if (this.x > 0 && inicioJogo === false) {
                this.x--;
            }

            /**
            * Se a tela de escolha do jogador tiver sendo exibida e a posição inicial do retângulo
            * de escolha do player for maior que 6px, sua posição em x é decrementada.
            */
            if (deslocamentoRetanguloSelecionarPersonagem > 6 && inicioJogo === true) {
                deslocamentoRetanguloInicial--;
                deslocamentoRetanguloSelecionarPersonagem = (deslocarRetangulo * deslocamentoRetanguloInicial) + 6;
                // console.log(deslocamentoRetanguloSelecionarPersonagem)
            }

            break;

        case "up":
            if (this.y > 0) {
                this.y--;
            }
            /**
            * Se o player conseguir passar do rio, ele atravessa a tela, volta para posição inicial,
            * aumenta o nível e a velocidade dos inimigos.
            */
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

            /**
            * Se a tela de escolha do jogador não tiver sendo exibida e a posição
            * x não for menor que 4, ao pressionar a tecla direita, a
            * posição em x do player é incrementada.
            */
            if (this.x < 4 && inicioJogo === false) {
                this.x++;
            }

            /**
            * Se a tela de escolha do jogador tiver sendo exibida e a posição inicial do retângulo
            * de escolha do player for menor que 400px, sua posição em x é incrementada.
            */
            if (deslocamentoRetanguloSelecionarPersonagem < 400 && inicioJogo === true) {
                deslocamentoRetanguloInicial++;
                deslocamentoRetanguloSelecionarPersonagem = (deslocarRetangulo * deslocamentoRetanguloInicial) + 6;
                // console.log(deslocamentoRetanguloSelecionarPersonagem)
            }

            break;

        case "down":
            if (this.y < 5) {
                this.y++;
            }
            break;
            /**
            * Se a tela de escolha do jogador tiver sendo exibida, ao pressionar enter
            * o looping verifica em qual personagem o retângulo de escolha do player está
            * posicionado. E então guarda na variável sprite a imagem do personagem que
            * foi escolhido.
            * No final, muda o valor da variável inicioJogo para false, para que a tela de
            * escolha pare de ser renderizada.
            */
        case "enter":
            if (inicioJogo === true) {
                players.forEach(function (player) {
                    if (deslocamentoRetanguloSelecionarPersonagem === player.posicaoJogador) {
                        sprite = player.sprite;
                        playerEscolhido.sprite = sprite;
                    }
                });
                inicioJogo = false
            }
            break;

            /**
            * Se o player morreu e a tecla de espaço for pressionada,
            * chamo todos o métodos de morrer, chamo a tela de
            * escolha do player e deixo de exibir a tela de game over
            */
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

/**
* @description: Classe Vida, herdada da Super Classe Personagens,
*               para instanciar vidas.
* @constructor
* @param x {number} - Define a posição x de vida
* @param y {number} - Define a posição y de vida
* @param speed {number} - Define a velocidade de vida
*/
var Vida = function (x, y, speed) {
    Personagens.call(this);
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = "images/Heart.png";
}

Vida.prototype = new Personagens();
Vida.prototype.constructor = Vida;


/**
* @description: Metódo da classe Vida para exibir corações
*               em cada atualização em posições diferentes de y
* @constructor
*/
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

/**
* @description: Metódo da classe Vida quando a instância de Player morre,
*               para resetar a velocidade e a posição em y.
* @constructor
*/
Vida.prototype.morrer = function () {
    vida.y = numeroAleatorio(3, 1);
    vida.speed = numeroAleatorio(10, 5);
}


/**
* Instanciando inimigos, player e vidas ao jogo.
*/
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
