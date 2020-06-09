const contenedorOpciones = document.querySelector("main .contenedor");
const opciones = contenedorOpciones.querySelectorAll(".principal");
const btnReiniciar = document.querySelector("#reiniciar");
const medidaContenedor = document.querySelector("main .contenedor").clientWidth;
const contenedorOpcionPc = document.querySelector("#eleccion-pc");
const contenedorResultado = document.querySelector("#resultado");
const contenedorScore = document.querySelector(".score");

const piedraPrincipal = document.querySelector("#piedra");
const papelPrincipal = document.querySelector("#papel");
const tijeraPrincipal = document.querySelector("#tijera");

papelPrincipal.style.left =
  medidaContenedor - papelPrincipal.clientWidth + "px";
tijeraPrincipal.style.left =
  medidaContenedor / 2 - tijeraPrincipal.clientWidth / 2 + "px";
window.addEventListener("DOMContentLoaded", esperaDeEleccion);
window.addEventListener("DOMContentLoaded", mostrarSessionStorage);
btnReiniciar.addEventListener("click", reiniciar);

function esperaDeEleccion() {
  contenedorOpciones.addEventListener("click", eligioOpcion);
}

function eligioOpcion(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("principal")) {
    const opcion = e.target.parentElement;
    const opcionId = opcion.id;
    opcion.classList.add("eleccion");
    contenedorOpciones.removeEventListener("click", eligioOpcion);
    ocultarOpciones(opcionId);
    esperaDePc(opcionId);
  }
}

function ocultarOpciones(opcionId) {
  opciones.forEach(opcion => {
    if (opcion.id != opcionId) {
      opcion.classList.add("hide");
      setTimeout(() => {
        opcion.classList.add("offscreen");
      }, 1000);
    }
  });
}

function esperaDePc(opcionId) {
  contenedorOpcionPc.classList.add("espera");
  const eleccionPc = function () {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
      case 0:
        return "piedra";
        break;
      case 1:
        return "papel";
        break;
      case 2:
        return "tijera";
        break;
      default:
        return console.log("hubo un error en eleccion de pc");
        break;
    }
  };
  mostrarEleccionPc(opcionId, eleccionPc());
}

function mostrarEleccionPc(opcionId, eleccionPc) {
  const div = document.createElement("div");
  div.classList.add(eleccionPc);
  const icono = document
    .querySelector(`#${eleccionPc}`)
    .firstElementChild.getAttribute("class");
  div.innerHTML = `
    <i class="${icono}"></i>
  
  `;
  contenedorOpcionPc.insertBefore(div, contenedorOpcionPc.lastElementChild);
  setTimeout(() => {
    document.querySelector("#eleccion-pc div").classList.add("mostrar");
  }, 1200);
  resultado(opcionId, eleccionPc);
}

function resultado(eleccionUsr, eleccionPc) {
  switch (eleccionUsr) {
    case "papel":
      if (eleccionPc === "tijera") {
        mostrarResultado("pierde", "Perdiste :'c");
      } else if (eleccionPc === "piedra") {
        mostrarResultado("gana", "Ganaste!!!");
      } else if (eleccionPc === "papel") {
        mostrarResultado("empate", "Empataste buuuu!!");
      }
      break;
    case "piedra":
      if (eleccionPc === "tijera") {
        mostrarResultado("gana", "Ganaste!!!");
      } else if (eleccionPc === "piedra") {
        mostrarResultado("empate", "Empataste buuuu!!");
      } else if (eleccionPc === "papel") {
        mostrarResultado("pierde", "Perdiste :'c");
      }
      break;
    case "tijera":
      if (eleccionPc === "tijera") {
        mostrarResultado("empate", "Empataste buuuu!!");
      } else if (eleccionPc === "piedra") {
        mostrarResultado("pierde", "Perdiste :'c");
      } else if (eleccionPc === "papel") {
        mostrarResultado("gana", "Ganaste!!!");
      }
      break;
    default:
      console.log("error en resultado");
      break;
  }
}

function mostrarResultado(resultado, mensaje) {
  const h1 = document.createElement("h1");
  h1.textContent = mensaje;
  contenedorResultado.insertBefore(h1, btnReiniciar);
  setTimeout(() => {
    contenedorResultado.classList.add("revelar");
  }, 1200);
  if (resultado === "gana") {
    let score = obtenerSessionStorage();
    score[0] = (parseInt(score[0]) + 1).toString();
    sessionStorage.setItem("score", JSON.stringify(score));
    setTimeout(() => {
      mostrarSessionStorage();
    }, 1200);
  }
}

function obtenerSessionStorage() {
  if (!sessionStorage.getItem("score")) {
    return ["0"];
  } else {
    return JSON.parse(sessionStorage.getItem("score"));
  }
}

function mostrarSessionStorage() {
  const score = obtenerSessionStorage();
  contenedorScore.querySelector("h2 span").textContent = score[0];
}

function reiniciar() {
  const opcion = document.querySelector(".eleccion");
  opcion.classList.remove("eleccion");
  contenedorOpciones.addEventListener("click", eligioOpcion);
  opciones.forEach(opcion => {
    opcion.classList.remove("offscreen");
    setTimeout(() => {
      opcion.classList.remove("hide");
    }, 300);
  });
  contenedorOpcionPc.classList.remove("espera");
  contenedorOpcionPc.firstElementChild.remove();
  contenedorResultado.classList.remove("revelar");
  setTimeout(() => {
    contenedorResultado.firstElementChild.remove();
  }, 1000);
}
