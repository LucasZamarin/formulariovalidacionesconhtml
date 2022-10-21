// const inputNacimiento = document.querySelector("#birth");

// inputNacimiento.addEventListener("blur", (evento) => {
//     validarNacimiento(evento.target);
// });

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    // dataset está determinado en el código HTML en el atributo data-X="nombre"
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
  
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipoDeInput, input);
        // Función que recibe como primer parámetro tipoDeInput y de 2do parámetro input
        // (la función está generada debajo de validadores)
        // Si el input está validado, no se muestra la clase de mensaje de error
     // = se modifica el span de input-message-error para que salga vacío
     // Si el input es false, el mensaje de error será mostrado (el span 
    // de clase input-container--invalid)
    }
  };

  const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ];

// tipoDeErrores es un array que contiene los tipos de errores, será recorrido en la función
// mostrarMensajeDeError

const mensajesDeError = {
    nombre: {
      valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
      valueMissing: "El campo correo no puede estar vacío",
      typeMismatch: "El correo no es válido",
    },
    password: {
      valueMissing: "El campo contraseña no puede estar vacío",
      patternMismatch:
        "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
      valueMissing: "Este campo no puede estar vacío",
      customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },
    direccion: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres.",
    },
    estado: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "El estado debe contener entre 4 a 30 caracteres.",
    },
  };
// mensajesDeError es un OBJETO que muestra todos los mensajes de error(tmb objetos) según cada input
// valueMissing = en caso de que esté vacío
// typeMismatch/patternMismatch = en caso de que esté mal escrito
// customError = lo que dice el nombre

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    // El array tipoDeErrores será recorrido para mostrar los mensajes de error
    return mensaje;
  }

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
    // Este es el mensaje de error al poner mal la validación

  }
  
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
  }