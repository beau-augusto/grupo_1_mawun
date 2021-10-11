
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




window.addEventListener("load", function () {

    sumadorCarrito();
    sumadorDetalle();

})