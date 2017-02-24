$(document).ready(function() {


    $(document.body).on('click', '.header-dados-receita', function(event) {
        targetBody = $(this).closest('.box-tab').find('.body-page')[0]
        $(targetBody).slideToggle('slow')
    });

    $(document.body).on('click', '.btn-dados-receita', function(event) {

        camposDados = $(this).closest('.body-page').find('input')
        valido = true
        for ( i = 0 ; i < camposDados.length ; i++ ) {
            // debugger
            if ( camposDados[i].value == "" ) {
                valido = false
            }
        }
        if ( valido ) {
            targetBody = $(this).closest('.box-tab').find('.body-page')[0]
            $(targetBody).slideToggle('slow')
            bodyNext = $('.btn-dados-producao').closest('.box-tab').find('.body-page')[0]
            $(bodyNext).slideToggle('slow')
            $('#box-producao').toggleClass('box-blur')
        }else {
            alert('Preencha todos os campos !!!')
        }
    });

    $(document.body).on('click', '.btn-dados-producao', function(event) {
        targetBody = $(this).closest('.box-tab').find('.body-page')[0]
        $(targetBody).slideToggle('slow')
        $(this).closest('#box-producao').toggleClass('box-blur')

    });


});