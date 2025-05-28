function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let player;
let obstacles = [];
let scene = 'campo'; // O jogador começa no campo
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 400);
  player = new Player();
  spawnObstacles(); // Cria obstáculos
}

function draw() {
  background(220);

  if (gameOver) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("GAME OVER! Pressione R para reiniciar", width / 2, height / 2);
    return;
  }

  // Desenha o cenário (campo ou cidade)
  if (scene === 'campo') {
    drawCampo();
  } else {
    drawCidade();
  }

  // Move o jogador
  player.display();
  player.move();

  // Atualiza e desenha os obstáculos
  updateObstacles();
  checkCollisions();

  // Aumenta o tempo ou a pontuação
  if (scene === 'campo') {
    score += 1;
  }

  // Verifica se o jogador chegou à cidade
  if (player.x > width / 2 && scene === 'campo') {
    scene = 'cidade'; // Transição para a cidade
    spawnObstacles(); // Recria obstáculos para a cidade
  }

  // Exibe o score
  textSize(16);
  fill(0);
  text(`Pontuação: ${score}`, 10, 20);
}

function spawnObstacles() {
  obstacles = [];
  if (scene === 'campo') {
    for (let i = 0; i < 5; i++) {
      obstacles.push(new Obstacle(random(width), random(height - 50, height - 150), 'campo'));
    }
  } else {
    for (let i = 0; i < 5; i++) {
      obstacles.push(new Obstacle(random(width), random(height - 50, height - 150), 'cidade'));
    }
  }
}

// Atualiza a posição dos obstáculos
function updateObstacles() {
  for (let obs of obstacles) {
    obs.move();
    obs.display();
  }
}

// Checa se o jogador colidiu com um obstáculo
function checkCollisions() {
  for (let obs of obstacles) {
    if (dist(player.x, player.y, obs.x, obs.y) < 30) {
      gameOver = true;
    }
  }
}

// Desenha o campo
function drawCampo() {
  background(135, 206, 235); // Cor do céu
  fill(34, 139, 34); // Cor do campo
  rect(0, height - 50, width, 50); // Grama

  // Desenha uma casa de fazenda
  fill(204, 153, 102);
  rect(100, height - 150, 120, 100); // Corpo da casa
  fill(139, 69, 19); // Cor do telhado
  triangle(100, height - 150, 220, height - 150, 160, height - 200); // Telhado

  // Desenha árvores
  fill(34, 139, 34);
  ellipse(250, height - 100, 50, 50);
  ellipse(350, height - 120, 50, 50);
  ellipse(450, height - 90, 50, 50);
}

// Desenha a cidade
function drawCidade() {
  background(169, 169, 169); // Cor do céu na cidade

  // Desenha prédios
  fill(100, 100, 100);
  rect(600, height - 200, 50, 200); // Prédio 1
  rect(670, height - 250, 50, 250); // Prédio 2
  rect(740, height - 180, 50, 180); // Prédio 3

  // Desenha ruas
  fill(50);
  rect(0, height - 50, width, 50); // Rua
}

// Classe do jogador (carro)
class Player {
  constructor() {
    this.x = 50;
    this.y = height - 100;
    this.size = 30;
    this.speed = 5;
  }

  display() {
    fill(0, 128, 255); // Cor do jogador (carro)
    rect(this.x, this.y, this.size, 20); // Representação do carro como um retângulo
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.size) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW) && this.y > height - 150) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height - 50) {
      this.y += this.speed;
    }
  }
}

// Classe do obstáculo
class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.speed = random(2, 5);
    this.type = type; // Define o tipo do obstáculo (campo ou cidade)
  }

  move() {
    this.x -= this.speed;
    if (this.x < -this.size) {
      this.x = width;
    }
  }

  display() {
    if (this.type === 'campo') {
      fill(139, 69, 19); // Cor para obstáculos no campo (como cercas ou pedras)
    } else {
      fill(255, 0, 0); // Cor para obstáculos na cidade (como carros)
    }
    rect(this.x, this.y, this.size, this.size); // Desenha o obstáculo
  }
}

// Reinicia o jogo
function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetGame();
  }
}

// Reseta o estado do jogo
function resetGame() {
  player.x = 50;
  player.y = height - 100;
  scene = 'campo';
  obstacles = [];
  score = 0;
  gameOver = false;
  spawnObstacles();
}

