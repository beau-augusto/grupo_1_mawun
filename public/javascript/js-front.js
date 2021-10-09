
/* Peter */

/*  Migue  */

/* Augusto  */



// const confirmUserDelete = () => { // si el usuario es redireccionado a login desde carrito, tienda o producto o agregar producto a carrito, sera devuelto a la pagina que a la que trato de acceder
//     let borrar = document.querySelector('#borrarUsuario');

//     if(borrar != null){
//     borrar.onclick = function(event){
//      if(confirm("Por favor confirma el borrado de este usuario")) {
//      } else {
//       event.preventDefault();
//      }
//     }

//     }

// }


const sumador = () => {
    let plus = document.querySelectorAll(".plus");
    let minus = document.querySelectorAll(".minus");
    let sumador = document.querySelectorAll("#sumador")
    // const Order = require("../../src/models/Order");

    if(sumador != null){

        for(let i = 0; i < sumador.length; i++){
            sumador[i].value = sumador[i].value
            console.log("works plus");
            plus[i].onclick = function (){
                sumador[i].value++
        }
        minus[i].onclick = function (){
        
            if (sumador[i].value > 1){
                sumador[i].value--
            }
    }
        
            }
        
    }
}


window.addEventListener("load", function () {

    sumador();

    //  confirmUserDelete();
})