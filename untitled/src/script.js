let clientes = JSON.parse(localStorage.getItem("clientes")) || [
  {
    id: "CL-0001",
    nombre: "Martín Pérez",
    visitas: 4,
    ultimaVisita: "2026-09-01"
  },
  {
    id: "CL-0002",
    nombre: "Juan Rodríguez",
    visitas: 2,
    ultimaVisita: "2026-09-24"
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

const totalClientes = document.getElementById("totalClientes");
const totalVisitas = document.getElementById("totalVisitas");
const beneficiosDisponibles = document.getElementById("beneficiosDisponibles");
const listaClientes = document.getElementById("listaClientes");

const abrirPanel = document.getElementById("abrirPanel");
const panel = document.getElementById("panel");
const volverTarjeta = document.getElementById("volverTarjeta");


// GUARDAR DATOS

function guardarDatos() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}


// ACTUALIZAR PANTALLA

function actualizarPantalla() {

  // ESTADÍSTICAS DEL PANEL

  totalClientes.textContent = clientes.length;

  totalVisitas.textContent = clientes.reduce(function (total, cliente) {
    return total + cliente.visitas;
  }, 0);

  beneficiosDisponibles.textContent = clientes.filter(function (cliente) {
    return cliente.visitas === 5;
  }).length;


  // LISTA DE CLIENTES

  listaClientes.innerHTML = "";

  clientes.forEach(function (clienteActual, indice) {

    const elemento = document.createElement("div");

    elemento.innerHTML = `
      <div>
        <strong>${clienteActual.nombre}</strong>
        <span>${clienteActual.visitas} / 5 visitas</span>
      </div>

      <button class="registrarDesdePanel">
        REGISTRAR
      </button>
    `;


    // BOTÓN REGISTRAR DESDE EL PANEL

    const botonRegistrar = elemento.querySelector(".registrarDesdePanel");

    botonRegistrar.addEventListener("click", function (evento) {

      evento.stopPropagation();

      const hoy = new Date().toISOString().split("T")[0];

      if (clienteActual.ultimaVisita === hoy) {

        alert("Esta visita ya fue registrada hoy");
        return;

      }

      if (clienteActual.visitas < 5) {
        clienteActual.visitas++;
      }

      clienteActual.ultimaVisita = hoy;

      guardarDatos();

      actualizarPantalla();

    });


    // SELECCIONAR CLIENTE

    elemento.addEventListener("click", function () {

      cliente = clienteActual;

      selectorCliente.value = indice;

      actualizarPantalla();

      panel.style.display = "none";
      document.querySelector(".card").style.display = "block";

    });


    listaClientes.appendChild(elemento);

  });


  // TARJETA DEL CLIENTE

  nombreMostrado.textContent = cliente.nombre;

  idCliente.textContent = "ID: " + cliente.id;

  contador.textContent = cliente.visitas + " / 5 visitas";


  // PUNTOS DE PROGRESO

  puntos.forEach(function (punto, indice) {

    if (indice < cliente.visitas) {

      punto.classList.add("activo");

    } else {

      punto.classList.remove("activo");

    }

  });


  // ESTADO DEL BENEFICIO

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


// REGISTRAR VISITA DESDE LA TARJETA

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


  const nuevoId =
    "CL-" + String(clientes.length + 1).padStart(4, "0");


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


// ABRIR PANEL DE BARBERÍA

abrirPanel.addEventListener("click", function () {

  document.querySelector(".card").style.display = "none";

  panel.style.display = "block";

});


// VOLVER A TARJETA

volverTarjeta.addEventListener("click", function () {

  panel.style.display = "none";

  document.querySelector(".card").style.display = "block";

});