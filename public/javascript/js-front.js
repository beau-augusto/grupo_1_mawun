
// Peter


// Migue 

// Augusto 


const redirectToProduct = () => { // si el usuario es redireccionado a login desde carrito, tienda o producto o agregar producto a carrito, sera devuelto a la pagina que a la que trato de acceder
    let login = document.querySelector('#abm-button-submit-login');

    if(login != null){
        login.onclick = function(){
            console.log('working')
        }
    }
}

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

window.addEventListener("load", function(){

  redirectToProduct();
 //  confirmUserDelete();
})