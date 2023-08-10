// Inicialización de Variables
let tarjetasGiradas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let timerInicial = 40;
let tiempoRegresivoId = null;

// Apuntando a elementos del documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

let clickAudio = new Audio('./Sounds/mouse-click-117076.mp3')
let upAudio = new Audio('./Sounds/1up.wav')
let wrongAudio = new Audio('./Sounds/buzzer-or-wrong-answer-20582.mp3')
let loseAudio = new Audio('./Sounds/lose.wav')
let rightAudio = new Audio('./Sounds/interface-124464.mp3')

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);

// Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} Seg`;
        if (timer === 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas(numeros);
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

// Función Principal
function girar(id) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasGiradas++;

    if (tarjetasGiradas === 1) {
        //Mostrar Número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png">`;
        clickAudio.play();

        //Desabilitar Botón 
        tarjeta1.disabled = true;

    } else if (tarjetasGiradas === 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML =  `<img src="./img/${segundoResultado}.png" alt="">`;
        clickAudio.play();
        //Desabilitar Botón 
        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado === segundoResultado) {
            tarjetasGiradas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();
        } else {
            wrongAudio.play();
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasGiradas = 0;
            }, 500);
        }
        if (aciertos === 8) {
            upAudio.play();
            clearInterval(tiempoRegresivoId);
            mostrarAciertos.innerHTML = `Tuviste ${aciertos} Aciertos🙀`;
            mostrarTiempo.innerHTML = `Fantástico! 🎉 Sólo Demoraste ${
                timerInicial - timer
            } Segundos`;
            mostrarMovimientos.innerHTML = ` Hiciste ${movimientos} Movimientos 🤟😎`;
        }
    }
}