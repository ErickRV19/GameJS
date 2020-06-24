'use strict'
// como leer el teclado
//utilizando un listener
document.addEventListener('keydown', function (evento) {
    //las teclas con el codigo ascii
    if (evento.keyCode == 32) {
        //espacio es 32
        if (nivel.muerto == false) {
            if (trex.saltando == false) {
                saltar();
            }
        } else {
            nivel.velociadad = 9;
            nube.velociadad = 2;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;
        }
    }
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes() {
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();


    imgRex.src = '../img/Dino/rex.png';
    imgNube.src = '../img/Dino/nuebe.png';
    imgCactus.src = '../img/Dino/cactus.png';
    imgSuelo.src = '../img/Dino/suelo.png';
}



//variables de lienzo (canvas)
var ancho = 700;
var alto = 300;
var canvas, ctx;

// este tiene que estar en el body el cual es el que inicializa todo
function inicializa() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}

// borra canvas
function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}


// objetos -----------------------

var suelo = 200;

var trex = {
    y: suelo, // posicion de dibujo verticar
    vy: 0, // velocidad en y
    gravedad: 2,
    salto: 28,
    vymax: 9,
    saltando: false
};

var nivel = {
    velociadad: 9,
    marcador: 0,
    muerto: false
};

var cactus = {
    x: ancho + 100, // posicion de dibujo horizontal
    y: suelo - 25 // posicion de dibujo verticar
};

var nube = {
    x: 400,
    y: 100,
    velociadad: 2
};

var suelog = {
    x: 0,
    y: suelo + 30
};

// Dibujos en pantalla----------------------------------------

// Rex -----------------------------
function dibujaRex() {
    /* ctx.drawImage(Variable imagen, 
        poscion x, posicion y, 
        tamaño imagen original x, tamaño imagen original y, 
        posicion escogida X, posicion escogida Y,
        Rescalar imagen X,Rescalar imagen X);
        */
    ctx.drawImage(imgRex, 0, 0, 88, 94, 100, trex.y, 50, 50);
}


//Cactus ------------------------------
function dibujaCactus() {
    ctx.drawImage(imgCactus, 0, 0, 50, 96, cactus.x, cactus.y, 38, 75);
}

function logicaCactus() {
    if (cactus.x < -100) {
        cactus.x = ancho + 100;
        nivel.marcador++;
    } else {
        cactus.x -= nivel.velociadad;
    }
}

// suelo -------------------------------------------
function dibujaSuelo() {
    ctx.drawImage(imgSuelo, suelog.x, 0, 700, 30, 0, suelog.y, 700, 30);
}

function logicaSuelo() {
    if (suelog.x > 700) {
        suelog.x = 0;
    } else {
        suelog.x += nivel.velociadad;
    }
}

// nube -------------------------------------------
function dibujaNube() {
    ctx.drawImage(imgNube, 0, 0, 93, 27, nube.x, nube.y, 82, 31);
}

function logicaNube() {
    if (nube.x < -100) {
        nube.x = ancho + 100;
    } else {
        nube.x -= nube.velociadad;
    }
}


//salto de Rex -------------
function saltar() {
    trex.saltando = true;
    trex.vy = trex.salto;
}

// gravedad ----------
function gravedad() {
    if (trex.saltando == true) {
        if (trex.y - trex.vy - trex.gravedad > suelo) {
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        } else {
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }
    }
}


// colision --------------------
function colision() {
    if (cactus.x >= 100 && cactus.x <= 150) {
        if (trex.y >= suelo - 25) {
            nivel.muerto = true;
            nivel.velociadad = 0;
            nube.velociadad = 0;
        }
    }
}

//Puntacion ------------------
function puntacion() {
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.marcador}`, 600, 50);

    if (nivel.muerto == true) {
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`, 240, 150);
    }
}

//Bucle principal --------------------------------
var FPS = 50; //los frame por segundo

//setintervalo son los intervalos que va repetir una funcion
setInterval(function () {
    principal();
    // 1000 (milisegundos) / frame
}, 1000 / FPS);


//esta funcion va ir haciendo los proceso todo por frame 
function principal() {
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();
    dibujaRex();
    puntacion();
}