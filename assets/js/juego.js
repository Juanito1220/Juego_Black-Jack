const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugadores = [];


    const btnpedir = document.querySelector('#btnpedir'),
        btnnuevo = document.querySelector('#btnnuevo'),
        btndetener = document.querySelector('#btndetener');


    const cartasJugadores = document.querySelectorAll('.player1__carts'),
        suma1 = document.querySelectorAll('small');



    //Inicio del juego 
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i=0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        suma1.forEach(elem => elem.innerText = 0);
        cartasJugadores.forEach(elem => elem.innerHTML = '');

        btnpedir.disabled = false;
        btndetener.disabled = false;

    }

    //Esta funcion permite barajar las cartas 
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo)
            }
        }
        return _.shuffle(deck);
    }


    //Esta funcion permite la eleccion de un carta 

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el Deck';
        }
        return deck.pop();
    }


    //Determinar valor de una carta 

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
    }


    //Puntos acumulados 
    const acumular = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        suma1[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    //Crear una carta 
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('player1__img');
        cartasJugadores[turno].append(imgCarta);
    }

    //Determinar un ganador 
    const determinarGanador = () => {

        const [puntosMinimos, puntosPc] = puntosJugadores;

        setTimeout(() => {

            if (puntosMinimos === puntosPc) {
                alert('Empate');


            } else if (puntosMinimos > 21) {
                alert('Lo siento has perdido');

            } else if (puntosPc > 21) {
                alert('!Felicitaciones has ganado¡');

            } else {
                alert('!Lo siento has perdido¡');
            }
        }, 100);
    }

    //Determinar turno de la pc 
    const turnoComputadora = (puntosMinimos) => {
        let puntosPc = 0;
        do {
            const carta = pedirCarta();
            puntosPc = acumular(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosPc < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }

    //Evento click pedir carta

    btnpedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumular(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnpedir.disabled = true;
            btndetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            btnpedir.disabled = true;
            btndetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    //Detener juego

    btndetener.addEventListener('click', () => {
        btnpedir.disabled = true;
        btndetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();





