
/* Peter */

/*  Migue  */

/* Augusto  */


const validateLogin = () => {
let form = document.querySelector('#userLogin')
let username = document.querySelector('input#name')
let password = document.querySelector('input#password')
let errorName = document.querySelector('p.name')
let errorPassword = document.querySelector('p.password')
let localsName = document.querySelector('p.localsName')
let localsPassword = document.querySelector('p.localsPassword')

if(form != null){

    if(localsPassword != null){
        errorPassword.innerHTML = "";
    }
    if(localsName != null){
        errorName.innerHTML = '';
    }
    console.log(localsName);
    console.log(localsPassword);
    let timeout;
    username.onfocus = function (){
        errorName.innerHTML = "";
        console.log('bitch');
        if(username.value == ""){
            timeout =  setTimeout(()=> { errorName.innerHTML = "Debes completar el nombre de usuario"
        }, 2000)
        }
        if(localsName != null){
            localsName.innerHTML = '';
        }


    }

    password.onfocus = function (){
        clearTimeout(timeout);
    
        if(localsPassword != null){
            localsPassword.innerHTML = '';
        }
        if(username.value == ""){
            errorName.innerHTML = "Debes completar el nombre de usuario";
        }
        if(username.value.length >= 4 && username.value.length < 30){

            errorPassword.innerHTML =''
        }
        

    }

    username.onkeyup = function (){
        errorPassword.innerHTML = "";
        clearTimeout(timeout);
        console.log(username.value.length);

        if(username.value == ""){
            errorName.innerHTML = "";
            timeout =  setTimeout(()=> { errorName.innerHTML = "Debes completar el nombre de usuario"
        }, 1000)
        }
if(username.value.length < 4 && username.value.length > 0|| username.value.length > 30){
    clearTimeout(timeout);
    console.log('works');
         timeout =  setTimeout(()=> { errorName.innerHTML = "Debe ser de entre 4 y 30 caracteres"
        }, 200)
        }

        if(username.value.length >= 4 && username.value.length <= 30){
            clearTimeout(timeout);
            console.log('testing123');
            errorName.innerHTML = "";

            timeout =  setTimeout(()=> { errorPassword.innerHTML = "Debes completar la contraseña";
        }, 2000)
        }
        if(username.value.length > 30){
           errorName.innerHTML = "Debe ser de entre 4 y 30 caracteres";
        
        }
    }
username.onblur = function(){
    clearTimeout(timeout);
    if(username.value.length >= 4){
        timeout =  setTimeout(()=> { errorPassword.innerHTML = "Debes completar la contraseña"
    }, 1000)
    password.onfocus = function(){
        console.log('password focused');
        errorName.innerHTML = "";
        errorPassword.innerHTML = ""
    }
    }
    if(username.value == ""){
       errorName.innerHTML = "Debes completar el nombre de usuario";

    }
}

password.onkeyup = function (){
    clearTimeout(timeout);
    console.log(password.value.length);

    if(password.value == "" && username.value == ""){
      errorName.innerHTML = "Debe ser de entre 4 y 30 caracteres";
    }

    if(password.value == ""){
        timeout =  setTimeout(()=> { errorPassword.innerHTML = "Debes completar la contraseña"
    }, 1000)
    }
if(password.value.length < 4 && password.value.length > 0){
console.log('works');
     timeout =  setTimeout(()=> { errorPassword.innerHTML = "Debe ser de entre 4 y 30 caracteres"
    }, 200)
    }

    if(password.value.length >= 4 && password.value.length <= 30){
        clearTimeout(timeout);
        console.log('testing123');
        errorPassword.innerHTML = "";

        timeout =  setTimeout(()=> { errorPassword.innerHTML = "Debes completar la contraseña";
    }, 2000)
    }


    if(password.value.length == 4){
        console.log('erase');
        errorPassword.innerHTML = "";
    }
    if(password.value.length >= 4){
        console.log('testing123');
        timeout =  setTimeout(()=> { errorPassword.innerHTML = "Debes completar la contraseña";
    }, 2000)
    }
    if(password.value.length > 30){
       errorPassword.innerHTML = "Debe ser de entre 4 y 30 caracteres";
    
    }
    if(password.value.length == 30){
        console.log('erase');
        errorPassword.innerHTML = "";
    } 

    }



}
}

const editSelectedAddress = () => {
    let optionAddress = document.querySelector('#address')
    let nuevaDireccion = document.querySelector('.addressInvisible')
    let cargarTexto = document.querySelector('.cargarDireccion')
    let selector = document.querySelector('.invisibleSelector')
    let editAddress = document.querySelector('.addressInvisible-edit')
    let calle_numero = document.querySelector('input#calle_numero_edit')
    let departamento = document.querySelector('input#departamento_edit')
    let provincia = document.querySelector('input#provincia_edit')
    let codigo_postal = document.querySelector('input#codigo_postal_edit')
    let barrio = document.querySelector('input#barrio_edit')
    let ciudad = document.querySelector('input#ciudad_edit')
    let userIdEjs = document.querySelector('#userID');
    let editUsuario = document.querySelector('.editUsuario');
    let botonBorrado = document.querySelector('#borrarDireccionButon');
    let butonSubirDire = document.querySelector('.subirDireccion');
    let continuarDireccion = document.querySelector('.continuarDireccion');

    if(cargarTexto !=  null){
        let clickCounter = 0;

        cargarTexto.onclick = function (){ // si no exiten direcciones
            cargarTexto.style.display = "none";
            if(butonSubirDire != null){
                butonSubirDire.style.display = 'block'; 
                continuarDireccion.style.display = 'none'; 

            }


            if(botonBorrado != null){

                botonBorrado.style.display = 'none'; 
            }
            if(optionAddress != null){
                optionAddress.value = "";
            }
            if(editAddress != null){

                editAddress.style.display = "none";
            }
 if(nuevaDireccion.style.display == "block"){
    nuevaDireccion.style.display = "none";
 } else {
    nuevaDireccion.style.display = "block"

}
        }
        if(optionAddress != null){ // si existen direcciones ya
        optionAddress.onmouseup = function (){
            clickCounter++;
            
            if (clickCounter % 2 == 0) {
                if(nuevaDireccion.style.display == "block"){
                    nuevaDireccion.style.display = 'none';
                    butonSubirDire.style.display = 'none'; 
                    continuarDireccion.style.display = 'block'; 
                }
                let idAddress = optionAddress.value;
                if(idAddress){

                    cargarTexto.style.display = 'block';
                }
                console.log(idAddress);
                optionAddress.blur();

                fetch('http://localhost:3000/api/addresses') // llamar a la api para cargar addresses en address edit
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                 let userID = userIdEjs.value;
                    let userAddresses = data.data.filter(address => address.user_id == userID);
                    let selectedAddress = userAddresses.find(address => address.id == idAddress)
                    console.log(selectedAddress);
                    if(!idAddress){
                        console.log('no anda?');
                        editAddress.style.display = 'none'; 
                        botonBorrado.style.display = 'none'; 
                    }

                    if(idAddress){
                        nuevaDireccion.style.display = 'none'; 
                        editAddress.style.display = 'block'; 
                        botonBorrado.style.display = 'block'; 
                        calle_numero.value = selectedAddress.street;
                        departamento.value = selectedAddress.apartment;
                        provincia.value = selectedAddress.state;
                        codigo_postal.value = selectedAddress.zip_code;
                        barrio.value = selectedAddress.district;
                        ciudad.value = selectedAddress.city;

                    }

                
                    }
            
                )
                    .catch(function(error){
                    console.log(error);
                })

                
            }
    }
    }}
}

const borrarDireccion = () => {
    let optionAddress = document.querySelector('#address')
    let button = document.querySelector('#borrarDireccionButon')
    let sendAddressId = document.querySelector('#sendAddressId')
    let deleteAddressForm = document.querySelector('#deleteAddressForm')

    if(button != null){

        button.onclick = function(){
           let id = optionAddress.value
           console.log(optionAddress.value);
            sendAddressId.value = id
            console.log(sendAddressId.value);
            deleteAddressForm.submit()
        }


    }


}
const sumadorCarrito = () => {
    let form = document.querySelectorAll('form.cajaSumadoraCarrito')
    let plus = document.querySelectorAll(".plus");
    let minus = document.querySelectorAll(".minus");
    let sumador = document.querySelectorAll("#sumador")
    let resumenTitle = document.querySelector('.resumenTitle')
    
    if(sumador && resumenTitle != null){ 
        let timeout;
        for(let i = 0; i < sumador.length; i++){
        form[i].onmouseup = function (event){
            event.preventDefault()   
            clearTimeout(timeout)
            timeout = setTimeout(function(){form[i].submit()}, 900)

            sumador[i].value
                plus[i].onclick = function (event){
                    event.preventDefault()   
                    sumador[i].value++           
            }
            minus[i].onclick = function (event){
                event.preventDefault()   
                if (sumador[i].value > 1){
                    sumador[i].value--
                 event.preventDefault()   
                }   
        }
            
        
        
    }
}
}}

const sumadorDetalle = () => {

    let plus = document.querySelector(".plus"); 
    let minus = document.querySelector(".minus");
    let sumador = document.querySelector("#sumador")
    let detalle = document.querySelector('.detalleProducto')

    if(sumador && detalle != null){ 

        sumador.value
        plus.onclick = function (){
            sumador.value++           
    }
    minus.onclick = function (){
        if (sumador.value > 1){
            sumador.value--
    }
    }}

}



const agregarDireccion = () => {
    let direccion = document.querySelector('.cargarDireccion')
    let nuevaDireccion = document.querySelector('.addressInvisible')
    let selector = document.querySelector('.invisibleSelector')
    let oldAddresses = document.querySelectorAll('div.addressInvisible-edit')
    let optionAddress = document.querySelector('#address')
    let orderAddress = document.querySelector('.orderAddress')

    if(direccion != null && orderAddress != null){ 
        direccion.onclick = function (){

            for (each of oldAddresses){
                    each.style.display = 'none';
                }
            optionAddress.selectedIndex = 0;
            direccion.style.display = "none";
            nuevaDireccion.style.display = "block";
        }


    }
}

const borrarSearch = () => { // por ahora no esta activo
    let searchButton = document.querySelector('.searchInven__submit')
    let searchField = document.querySelector('.searchFieldInventario')
    let heroSearchField = document.querySelector('.hero-search__field')
    let ex = document.querySelector('.fa-times.submit')

    if(searchButton != null){
        searchField.onfocus = () => {
             ex.style.display = "block";
        }
    }
    if(heroSearchField != null){
        heroSearchField.onfocus = () => {
             ex.style.display = "block";
        }
    }
}

const unfocusDireccciones = () => {
let direccionesPerfilFront = document.querySelector('.direccionesPerfilFront')
if (direccionesPerfilFront != null){
    let clickCounter = 0
    direccionesPerfilFront.onclick =function(){
        clickCounter++;
    if (clickCounter % 2 == 0) {

            direccionesPerfilFront.blur()

    }
    }
}


}
const validationFormContact = () => {
    let formulario = document.getElementById('formulario');

    if(formulario != null){

    formulario.addEventListener("submit", function(evento){
    
        let errores = [];

        let campoNombre = document.querySelector("#name");
        
        if(campoNombre.value == ""){
            errores.push('el campo de nombre tiene que estar completo');
        } else if (campoNombre.value.length < 3) {
            errores.push('el campo de nombre debe tener al menos 3 caracteres');
        }
        
        let campoEmail = document.querySelector("#email");
        
        if(campoEmail.value == ""){
        errores.push('el campo de email tiene que estar completo');
        }
        
        let campoAsunto = document.querySelector("#asunto");
        
        if(campoAsunto.value == ""){
            errores.push('el campo de asunto tiene que estar completo');
        }
        
        let campoConsulta = document.querySelector("#description");
        
        if(campoConsulta.value == ""){
            errores.push('el campo de consulta tiene que estar completo');
        }
        
        if(errores.length > 0) {
            evento.preventDefault();
        
            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++){
        
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>" 
            };
        }
        
        });
    }
}

window.addEventListener("load", function () {
    let bubble = document.querySelector('div.cartNumber');
    let counter = document.querySelector('.hero-cart-counter')
    if(bubble != null){

    fetch('http://localhost:3000/api/orders') // llamar a la api para llenar la burbuja de carrito
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let productNumber = data.meta.total // toma el length del array
            if (productNumber == 0){
                counter.style.display = 'none';
            }
            bubble.innerHTML = productNumber;
        }

    )
        .catch(function(error){
        console.log(error);
    })

}

    sumadorCarrito();
    sumadorDetalle();
    agregarDireccion();
    editSelectedAddress();
    borrarDireccion();
    unfocusDireccciones();
    validationFormContact()
});
