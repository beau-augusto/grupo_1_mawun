
/* Peter */

/*  Migue  */

/* Augusto  */


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

    if(direccion != null){ 
        direccion.onclick = function (){
            direccion.style.display = "none";
            nuevaDireccion.style.display = "block";
            selector.style.display = "none";
        }


    }
}

const borrarSearch = () => {
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



window.addEventListener("load", function () {
    console.log("anda");
    let bubble = document.querySelector('div.cartNumber');
    if(bubble != null){

    fetch('http://localhost:3000/api/orders') // llamar a la api para llenar la burbuja de carrito
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let productNumber = data.meta.total // toma el length del array
        console.log(productNumber);
    
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
    borrarSearch();

})