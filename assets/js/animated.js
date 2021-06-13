document.onkeyup = soltarTecla;
document.onkeydown = pulsarTecla;
const personaje = document.getElementById("personaje");
let teclaPulsada = null;
let teclaBloqueada = null;
let bloquearEvento = false;
const listaDireccion = ["derecha", "izquierda"];
const listaEvento = ["parado", "caminar", "atacar", "saltar", "agacharse"];
let eventoActual = 0;
let movimientoActual = "parado-derecha";
let direccionActual = 0;
const direccionTeclas = {
  39: 0, //derecha
  68: 0, //derecha
  37: 1, //izquierda
  65: 1, //izquierda
};
const eventoTeclas = {
  75: { evento: 2, tiempo: 0.8 }, //atacar
  87: { evento: 3, tiempo: 0.8 }, //saltar
  38: { evento: 3, tiempo: 0.8 }, //saltar
  39: { evento: 1, tiempo: 0.1 }, //caminar
  68: { evento: 1, tiempo: 0.1 }, //caminar
  37: { evento: 1, tiempo: 0.1 }, //caminar
  65: { evento: 1, tiempo: 0.1 }, //caminar
};
const realizarEvento = (tiempo = 0) => {
  if (!bloquearEvento) {
    personaje.classList.remove(movimientoActual);
    movimientoActual = `${listaEvento[eventoActual]}-${listaDireccion[direccionActual]}`;
    personaje.classList.add(movimientoActual);
    if (teclaPulsada != null) {
      bloquearEvento = true;
      setTimeout(() => {
        bloquearEvento = false;
        if (teclaPulsada == null || teclaBloqueada !== teclaPulsada) {
            teclaBloqueada = teclaPulsada;
          realizarEvento();
        }
      }, tiempo * 1000);
    }
  }
};

function pulsarTecla(evObject) {
  if (teclaPulsada == null || teclaPulsada !== evObject.keyCode) {
    teclaPulsada = evObject.keyCode;
    if (
      direccionTeclas[evObject.keyCode] ||
      direccionTeclas[evObject.keyCode] === 0
    ) {
      direccionActual = direccionTeclas[evObject.keyCode];
    }
    if (eventoTeclas[evObject.keyCode]) {
      eventoActual = eventoTeclas[evObject.keyCode].evento;
      realizarEvento(eventoTeclas[evObject.keyCode].tiempo);
    }
    console.log("pulsar", teclaPulsada);
  }
}

function soltarTecla(evObject) {
  if (eventoActual !== 0) {
    eventoActual = 0;
    realizarEvento();
    teclaPulsada = null;
  }
}
