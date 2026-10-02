let clientes = JSON.parse(localStorage.getItem("clientes")) || [
  {
    id: "CL-0001",
    nombre: "Martín Pérez",
    visitas: 4,
    ultimaVisita: null
  },
  {
    id: "CL-0002",
    nombre: "Juan Rodríguez",
    visitas: 2,
    ultimaVisita: null
  }
];

let cliente = clientes[0];


// ELEMENTOS HTML

const nombreMostrado = document.getElementById("nombreMostrado");
const nombreCliente = document.getElementById("nombreCliente");
const telefonoCliente = document.getElementById("telefonoCliente");
const cumpleanosCliente = document.getElementById("cumpleanosCliente");
const guardarCliente = document.getElementById("guardarCliente");

const nuevoCliente = document.getElementById("nuevoCliente");
const formularioCliente = document.getElementById("formularioCliente");

const boton = document.getElementById("sumarVisita");
const selectorCliente = document.getElementById("selectorCliente");
const usarBeneficio = document.getElementById("usarBeneficio");

const contador = document.getElementById("contador");
const puntos = document.querySelectorAll(".puntos span");
const estado = document.getElementById("estado");
const idCliente = document.getElementById("idCliente");


// GUARDAR DATOS

function guardarDatos() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}


// ACTUALIZAR PANTALLA

function actualizarPantalla() {

  idCliente.textContent = "ID: " + cliente.id;

  contador.textContent = cliente.visitas + " / 5 visitas";

  puntos.forEach(function (punto, indice) {

    if (indice < cliente.visitas) {
      punto.classList.add("activo");
    } else {
      punto.classList.remove("activo");
    }

  });

  if (cliente.visitas === 5) {

    estado.textContent = "BENEFICIO DISPONIBLE";
    usarBeneficio.style.display = "inline-block";
    boton.style.display = "none";

  } else {

    estado.textContent = "PRÓXIMO BENEFICIO";
    usarBeneficio.style.display = "none";
    boton.style.display = "inline-block";

  }

}


// MOSTRAR CLIENTE INICIAL

actualizarPantalla();


// REGISTRAR VISITA

boton.addEventListener("click", function () {

  identificarCliente();

  const hoy = new Date().toISOString().split("T")[0];

  if (cliente.ultimaVisita === hoy) {

    estado.textContent = "VISITA YA REGISTRADA HOY";
    return;

  }

  cliente.ultimaVisita = hoy;

  if (cliente.visitas < 5) {
    cliente.visitas++;
  }

  guardarDatos();

  actualizarPantalla();

});


// USAR BENEFICIO

usarBeneficio.addEventListener("click", function () {

  cliente.visitas = 0;
  cliente.ultimaVisita = null;

  guardarDatos();

  actualizarPantalla();

});


// IDENTIFICAR CLIENTE

function identificarCliente() {

  console.log("Cliente identificado:");
  console.log(cliente.id);
  console.log(cliente.nombre);

}


// CAMBIAR CLIENTE

selectorCliente.addEventListener("change", function () {

  cliente = clientes[this.value];

  actualizarPantalla();

  nombreMostrado.textContent = cliente.nombre;

});


// NUEVO CLIENTE

nuevoCliente.addEventListener("click", function () {

  if (formularioCliente.style.display === "none") {
    formularioCliente.style.display = "block";
  } else {
    formularioCliente.style.display = "none";
  }

});


// GUARDAR NUEVO CLIENTE

guardarCliente.addEventListener("click", function () {

  const nombre = nombreCliente.value.trim();

  if (nombre === "") {
    alert("Ingresá el nombre del cliente");
    return;
  }

  const nuevoId = "CL-" + String(clientes.length + 1).padStart(4, "0");

  const nuevo = {

    id: nuevoId,
    nombre: nombre,
    telefono: telefonoCliente.value,
    cumpleanos: cumpleanosCliente.value,
    visitas: 0,
    ultimaVisita: null

  };

  clientes.push(nuevo);

  guardarDatos();

  const opcion = document.createElement("option");

  opcion.value = clientes.length - 1;
  opcion.textContent = nuevo.nombre;

  selectorCliente.appendChild(opcion);

  selectorCliente.value = clientes.length - 1;

  cliente = nuevo;

  actualizarPantalla();

  nombreCliente.value = "";
  telefonoCliente.value = "";
  cumpleanosCliente.value = "";

  formularioCliente.style.display = "none";

});