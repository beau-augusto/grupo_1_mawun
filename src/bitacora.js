// Notas de Juan
// 1. Twilio sendgrid, mails, dispara un WhatsApp al hacer una compra, NodeMailer
// 2. Hooks, Sequelize ya baja un al stock, if en la vista para decir no disponible 
// 3. https://docs.sendgrid.com/for-developers/sending-email/v2-nodejs-code-example
// 4. json2cvs json-2-csv

// Preguntas para Juan y Guido
////  por que no funciona order_products como alias en el modelo order

// Preguntas para Migue y Peter
// 1. clase 33, hacia la clase en vivo desafio 2 y 3
// Por qué aparece locals en la edición de usuarios si quitas el delete
// Por que el footer en BO esta tan arriba en perfil BO y editar usuario BO
// como user el this en el metodo

// Cosas para hacer
// 1. De registarse ya logearse directamente //
// 2. confirmar al eliminar un producto
// 3. Carrousel
// 4. Meter APIs
// 5. No permitir dos cuentas con el mismo mail //
// 6. Carrito funcional con Javascript
// 7. Wishlist
// 8. Campo en registro para comprar contraseñas
// 9. Logica de javascript para una contraseña con caracteres 
// 10. Como actualizar la contraseña

// Otra ideas
// 1. alinear los socials en el footer //
// 3. API del clima 
// 4. crear mail gmail para recibir las consultas
// 5. pagina de contacto con perfiles diseñado potetete aye 
// 6. mejorar perfil de usuario //
// 7. elegir de qué lado quedan los botones del
// 8. revisión de aye del diseño 
// 9. agregar anio al vino
// 10. codigo para descargar los mails en CVS 
// 11. ensayar la demo 15 minutos con cronometro 
// 12. Cambiar category en users a role // 
// 13. direccion en edicion de usuario 
// 15. google recaptcha v.3
// 16. addresses agregar y borrar sin regargar la pagina desde edicion de usuario por JS front
// 17. una botella de vino vacia
// 18. soft delete de usuarios

// Cambio a la base de datos
// Agregar campo apartment number

<% if (locals.user) { %>
    <a href="/usuarios/perfil" class="hero-cart-link"><img src="/upload/profile-pictures/<%=locals.user.image%>"  class="bo-profile"></a>
    <% } %> 

//para editar desde visitor

// db.User.findByPk(res.locals.id, {
//     order:[['name','ASC']],
//     include: [{
//         association: "roles",
//         attributes: ["name"]
// },
// {
//     association: "addresses",
//     attributes: {exclude:["id", "user_id"]}
// }],
//     attributes: {exclude:["role_id"]},
//     raw: true,
//     nested: true
// })
// .then((resultado) => {
//     if (resultado){
//      return   res.render ('./users/user-profile', {user: resultado});
//         } else {
//         res.send ('El usuario que buscás no existe.')
//         }

// })
// .catch(error => {console.log(error)}) // agarra el error
// },

// cambie var 25 a 50 en imagen 