
/* Peter */

/*  Migue  */

/* Augusto  */


const sumador = () => {
    let form = document.querySelector('form.cajaSumadoraCarrito')
    let plus = document.querySelectorAll(".plus");
    let minus = document.querySelectorAll(".minus");
    let sumador = document.querySelectorAll("#sumador")
    
    if(sumador && form != null){
        let timeout;
        form.onmouseup = function (event){
            event.preventDefault()   
            clearTimeout(timeout)
            timeout = setTimeout(function(){form.submit()}, 1000)

        for(let i = 0; i < sumador.length; i++){
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


window.addEventListener("load", function () {

    sumador();

})