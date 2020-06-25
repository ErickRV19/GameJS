//fin del juego
var conteo = 0;
var gameover = false;
//primero seleciono mi canvas
const canvas = document.getElementById("canvas");
// seleciono los metodos y propiedades
const ctx = canvas.getContext("2d");
//jugador
const user = {
  x: 0,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "WHITE",
};

//computadora
const com = {
  x: canvas.width - 10,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "WHITE",
};

//linea que separa el canvas
const net = {
  x: (canvas.width - 2) / 2,
  y: 0,
  height: 10,
  width: 2,
  color: "WHITE",
};

// para crear la liena puntiada en el canvas
function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

// bola
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  velocityX: 5,
  velocityY: 5,
  speed: 7,
  color: "WHITE",
};

//dibujar un rectángulo, se utilizará para dibujar las paletas.
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

//dibuja el circulo que se usara cmo bola
function drawArc(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// boton espacio
//teclado espacio 
document.addEventListener('keydown', function (evento) {
    //las teclas con el codigo ascii
    if (evento.keyCode == 32) {
        //espacio es 32
        console.debug("espacio");
        if (gameover == true) {
            gameover = false;
            user.score = 0;
            com.score = 0;
            resetBall();
        } 
    }
});
//cotrol del player, con el mouse
canvas.addEventListener("mousemove", getMousePos);
//poscion del mouse
function getMousePos(evt) {
  let rect = canvas.getBoundingClientRect();

  user.y = evt.clientY - rect.top - user.height / 2;
}

//resetear bola
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 7;
}

// dibujamos texto
function drawText(text, x, y) {
  ctx.fillStyle = "#FFF";
  ctx.font = "75px fantasy";
  ctx.fillText(text, x, y);
}

// funcion de colision
// jugador y la pelota
function collision(b, p) {
  //conocemos la altura del jugador
  p.top = p.y;
  //conocemos la parte inferior del jugador
  p.bottom = p.y + p.height;
  //la parte izquierda
  p.left = p.x;
  //la parte derecha
  p.right = p.x + p.width;

  //lo mismo con la bola
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  //returnamos la poscion si esta pegado en izquierda, derecha, arriba y abajo esta chocando
  return (
    p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top
  );
}
//funcion update
function update() {
  // cambia la puntacion si la pelota en x < 0 gana la computadora
  // x > canvas.width gana el jugador
  if (ball.x - ball.radius < 0) {
    com.score++;
    conteo = 0;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    conteo = 0;
    resetBall();
  }
  if(com.score == 20 || user.score== 20){
      gameover = true;
  }
  // la velocidad de la bola
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // Simple IA Computadora
  if (conteo > 10) {
    com.y += (ball.y - (com.y + com.height / 2)) * 0.05;
  } else if (conteo > 15) {
    com.y += (ball.y - (com.y + com.height / 2)) * 0.01;
  } else {
    com.y += (ball.y - (com.y + com.height / 2)) * 0.1;
  }

  // cuando la bola colisiona con las paredes inferior y superior, se inversas la velocidad y.
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
  }

  // comprobamos si la paleta golpeó al usuario o a la paleta computadora
  //checando a partir si a la izquierda o la derecha de la mitad del canvas
  let player = ball.x + ball.radius < canvas.width / 2 ? user : com;

  // si la bola golpea una paleta
  if (collision(ball, player)) {
    // comprobamos dónde la pelota golpea la paleta
    let collidePoint = ball.y - (player.y + player.height / 2);
    // Normalice el valor de collidePoint, necesitamos obtener números entre -1 y 1.
    // -player.height/2 < punto de colisión < player.height/2
    collidePoint = collidePoint / (player.height / 2);

    // cuando la pelota golpea la parte superior de una paleta queremos que la pelota, para tomar un ángulo de -45degees
    // cuando la bola golpea el centro de la paleta queremos que la bola tome un ángulo de 0 grados
    // cuando la bola golpea la parte inferior de la paleta queremos que la bola tome un 45 grados
    // Math.PI/4 = 45 grados
    let angleRad = (Math.PI / 4) * collidePoint;

    // cambiamos la diecion de X & Y de la bola
    let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // acelera el balón cada vez que un remo lo golpea.
    ball.speed += 0.1;
    conteo++;
  }
}

//limpiar el lienzo
function render() {
  // limpiar canvas
  drawRect(0, 0, canvas.width, canvas.height, "#000");

  // dibujar el score del jugador
  drawText(user.score, canvas.width / 4, canvas.height / 5);

  // dibujar el score de la computadora
  drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5);

  // dibujamos la liena puntiada
  drawNet();

  //dibujamos al jugador
  drawRect(user.x, user.y, user.width, user.height, user.color);

  // dibujamos la computadora
  drawRect(com.x, com.y, com.width, com.height, com.color);

  // dibujamos la bola
  drawArc(ball.x, ball.y, ball.radius, ball.color);
}

//funcion del juego que llama el render
function game() {
  if (!gameover) {
    update();
    render();
  }else{
    drawText("GAME OVER", canvas.width / 8, canvas.height / 2);
  }
}

//FPS, fotogramas por segundo
let framePerSecond = 50;

//llamar la funcion game, 50 veces por segundo 1000=1seg
let loop = setInterval(game, 1000 / framePerSecond);
