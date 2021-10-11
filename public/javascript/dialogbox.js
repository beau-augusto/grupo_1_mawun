$('.botonesInventario3').on('click', function(event){
    let id = event.currentTarget.id
    localStorage.setItem("deleteID", id)
     $('#dialogbox').dialog("open");
    event.preventDefault();

})

    $('#dialogbox').dialog({
                title: "Confirmar borrado",
                modal: true,
                height: 200,
                width: 367,
               // position: { my: 'top', at: 'top+150' },
                open: function(event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            },
                resizable: false,
                draggable: false,
                buttons: [
                    {
                        text: "Cancelar",
                        click: function () {
                            $(this).dialog('close')
        
                        }
                    },
                    {
                        text: "Confirmar",
                        click: function () {
                            $(this).dialog('close');
                            let deleteID = localStorage.deleteID
                            console.log(`.${deleteID}`);
                            $(`.${deleteID}`).submit();
                     
                }}
                ],
                autoOpen: false,
                show: {
                    effect: 'fade',
                    duration: 175
                },
                hide: {
                    effect: "fade",
                    duration: 175
                }
            })


