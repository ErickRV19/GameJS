/**
 * 2C=two of Clubs(Treboles)
 * 2D=two of Diaminds(Diamantes)
 * 2H=two of Hearts(Corazones)
 * 2S=two of Spades(Espadas)
 *
 */

// patron modulo proteger el codigo

const miModulo = (() => {
    "use strict";
    let deck = [];
    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];
    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];

    const puntajeHTML = document.querySelectorAll("small"),
        divCartasJugador = document.querySelectorAll(".divCartas");

    const btnPedirCarta = document.getElementById("btnPedirCarta"),
        btnDetener = document.getElementById("btnDetener"),
        btnNuevo = document.getElementById("btnNuevo");

    const inicializarJuego = (numJugadores = 2) => {
        //esta funcion inicia el juego
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        console.clear();
        btnPedirCarta.disabled = false;
        btnDetener.disabled = false;
        puntajeHTML.forEach((elem) => (elem.innerHTML = 0));
        divCartasJugador.forEach((elem) => (elem.innerHTML = ""));
    };

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }
        return _.shuffle(deck);
    };

    //esta funcion me permite pedir una carta

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en la baraja";
        }
        //console.log(`La carta tomada es ${carta}`);
        return deck.pop();
    };

    const valorCarta = (carta) => {
        //esta funcion sirve para saber el valor de la carta el return pregunta si es numero y si lo es lo multiplica por uno
        // si no verifica si la letra es A si lo es el valor es 11 si no el valor es 10
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };
    //turno 0=al primer jugador y el ultimo sera la pc

    const acomularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntajeHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `../img/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugador[turno].append(imgCarta);
    };
    const determinarGanador = () => {
        const [puntosminimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosminimos > 21) {
                alert("pc a ganado");
            } else if (puntosComputadora > 21) {
                alert("Has ganado");
            } else if (puntosComputadora == puntosminimos) {
                alert("Has empatado con una PC");
            } else {
                alert("pc a ganado");
            }
        }, 150);
    };

    //turno de pc
    const turnoComputadora = (puntosminimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acomularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while (puntosComputadora < puntosminimos && puntosminimos <= 21);
        determinarGanador();
    };

    //eventos

    btnPedirCarta.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador = acomularPuntos(carta, 0);
        crearCarta(carta, 0);
        // <img class="carta" src="./assets/cartas/10C.png" alt="carta" srcset="" />

        if (puntosJugador > 21) {
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener("click", () => {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener("click", () => {
        // nuevo juego limpiando todo
        inicializarJuego();
    });
})();