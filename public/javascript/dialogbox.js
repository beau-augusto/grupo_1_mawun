
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
                    $('.borrarUsuario').trigger("click",function(){
                        return true
                });
            }
        }
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

    $('.borrarUsuario').on('click', function(event){
       var source = event.target.id;
      console.log(source);
        $('#dialogbox').dialog("open");
       event.preventDefault();
    })
    