$(document).ready(function() {

    $(document.body).on('click', '.toggle-valida', function(event) {

        //

        line = $(this).closest('.row')[0]
        campos = $(line).find('.producao')
        valido = true
        dadosIngredientes = []

        for ( i = 0 ; i < campos.length ; i++ ) {
            if ($(campos[i]).find('input')[0]) {
                conteudo = $(campos[i]).find('input')[0].value
                dadosIngredientes.push(conteudo)
                if(conteudo == '') {
                    valido = false
                }
                if(i == (campos.length -1)) {
                    if(valido) {


                        if ( $('.custoKilo')[0].value.length > 0 ) {


                            //Calculando o peso liquido de todos os ingredientes
                            liqTotalParcial = parseInt($('.info-receita.producao-result')[4].textContent)
                            pesoLiqTotal = liqTotalParcial + parseInt(dadosIngredientes[3])
                            $('.info-receita.producao-result')[4].textContent = pesoLiqTotal

                            //Calculando o peso bruto de todos os ingredientes
                            brutoTotalParcial = parseInt($('.info-receita.producao-result')[3].textContent)
                            pesoBrutoTotal = brutoTotalParcial + parseInt(dadosIngredientes[2])
                            $('.info-receita.producao-result')[3].textContent = pesoBrutoTotal

                            //Calculando o peso liquedo por cada porcao
                            pesoLiqFinal = parseInt($('.info-receita.producao-result')[4].textContent)
                            liqPorPorcao = pesoLiqFinal / parseInt($('.qtdPorcao').val())
                            $('.info-receita.producao-result')[2].textContent = liqPorPorcao

                            //Calculando o peso bruto por cada porcao
                            pesoBrutoFinal = parseInt($('.info-receita.producao-result')[3].textContent)
                            liqPorPorcao = pesoBrutoFinal / parseInt($('.qtdPorcao').val())
                            $('.info-receita.producao-result')[1].textContent = liqPorPorcao

                            //Calculando o fator de coccao total
                            coccaoY = parseInt($('.pesoPorcao').val()) / parseInt($('.info-receita.producao-result')[4].textContent)
                            $('.info-receita.producao-result')[0].textContent = coccaoY

                            $('.info-receita.producao-result')[5].textContent = $('.custoTotalIngr').val()+' R$'

                            lineHTML =  '<div class="col-md-2 col-sm-2 validate val-name"   >'+dadosIngredientes[0]+'</div>'+
                                        '<div class="col-md-2 col-sm-2 validate val-medida" >'+dadosIngredientes[1]+'</div>'+
                                        '<div class="col-md-2 col-sm-2 validate val-bruto"  >'+dadosIngredientes[2]+'</div>'+
                                        '<div class="col-md-2 col-sm-2 validate val-liquido">'+dadosIngredientes[3]+'</div>'+
                                        '<div class="col-md-2 col-sm-2 validate val-coccao" >'+dadosIngredientes[4]+'</div>'+
                                        '<div class="col-md-1 col-sm-1 validate valorTotal" >'+$('.custoTotalIngr').val()+' R$</div>'
                                        $('.producao-custo').closest('.row').remove()
                                        $('.linha-ingredientes').html(lineHTML)
                            $(this).find('button').toggle()

                        }else {
                            alert('Preencha o ingrediente por completo !!!')
                        }

                    }
                    else {
                        alert('Preencha o ingrediente por completo !!!')
                    }
                }
            }else {
                valSelect = $(campos[i]).find('select')[0].value
                dadosIngredientes.push(valSelect)
            }

        }


    });

    $(document.body).on('keypress', '.info-receita.producao input', function(event) {

        if (  this.name != "nomeIngrediente" ) {
            tecla = event.keyCode
            if((tecla>47 && tecla<58)) return true;
            else
                if (tecla==8 || tecla==0) return true;
                    else  return false;
        }

    });

    $(document.body).on('blur', '.custoKilo', function(event) {
        custoTotal = ( parseInt($('.brutoCoccao').val()) * parseInt(this.value) ) / 1000
        $('.custoTotalIngr')[0].value = custoTotal
    });

    $(document.body).on('blur', '.info-receita.producao input', function(event) {
        if ( this.name == "pesoLiquidoPercapto" ) {
            coccao = $('.brutoCoccao').val() / $('.liquidoCoccao').val()
            $('.valorCoccao')[0].value = coccao
        }
    });

    $(document.body).on('click', '.drop-line', function(event) {
        $(this).closest('.producao-box').remove()
    });

    $(document.body).on('click', '.options-js', function(event) {

        botao = $('.toggle-valida').find('button.btn-success')[0].style.display
        if ( botao != 'block' ) {
            $.ajax({
                url: '../use-page/factory.html',
                type: 'GET',
                success: function(res){
                    var content = document.createElement('DIV')
                    content.innerHTML = res
                    var ingrediente = $(content).find(".producao-box")[0]
                    $('#body-ingrediente').append(ingrediente)
                }
            });
        }else {
            alert('Preencha e valide todas as informacoes do ultimo ingrediente !!!')
        }

    });


});