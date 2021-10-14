// formulario.addEventListener("submit", function(evento){

//     let errores = [];

//     let campoNombre = document.querySelector("input.name");

//     if(campoNombre.value == ""){
//         errores.push('el campo de nombre tiene que estar completo');
//     } else if (campoNombre.value.length < 3) {
//         errores.push('el campo de nombre debe tener al menos 3 caracteres');
//     }

//     let campoEmail = document.querySelector("input.email");

//     if(campoEmail.value == ""){
//         errores.push('el campo de email tiene que estar completo');
//     }

//     let campoAsunto = document.querySelector("input.asunto");

//     if(campoAsunto.value == ""){
//         errores.push('el campo de asunto tiene que estar completo');
//     }

//     let campoConsulta = document.querySelector("textarea.consulta");

//     if(campoConsulta.value == ""){
//         errores.push('el campo de consulta tiene que estar completo');
//     }

//     if(errores.length > 0) {
//         e.preventDefault();

//         let ulErrores = document.querySelector("div.errores ul");
//         for (let i = 0; i < errores.length; i++){

//             ulErrores.innerHTML += "<li>" + errores[i] + "</li>" 
//         }
//     }

// });

const formulario = document.querySelector('reservation');
const inputs = document.querySelectorAll('#reservation inputs');
