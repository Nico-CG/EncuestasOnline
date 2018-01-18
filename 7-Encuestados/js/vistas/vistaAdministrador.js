/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;
  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {

  inicializar: function() {
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario()
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    nuevoItem = $('<li>',{
      'class': "list-group-item",
      'id': pregunta.id,
      'text': pregunta.textoPregunta,
    });
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;
    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      var cantidad = 0;
      $('[name="option[]"]').each(function() {
        // si el input de la respuesta no esta vacío agrego la respuesta al arreglo de respuestas.
        if ($(this).val().length > 0 ) {
          var respuesta = $(this).val();
          respuestas.push({'textoRespuesta': respuesta , 'cantidad': cantidad});
        }
      });
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });


/* botones creados por mi sin usar validacionDeFormulario(),

    // creo un input para agregar otra respuesta extra.
    e.botonAgregarRespuesta.click(function() {
      // hago un clon del elemento original.
      var $nuevaRespuesta = $('#optionTemplate').clone(true).removeClass('hide').removeAttr('id');
      // al original lo vuelvo visible si no lo está.
      if ($('#optionTemplate').hasClass('hide')) {
        $('#optionTemplate').removeClass('hide');
        $('#optionTemplate input').val('');
      // agrego los clones.
      }else{
        $nuevaRespuesta.find('input').val('');
        $(e.botonAgregarRespuesta).before($nuevaRespuesta);
      }
    });

    // borro el input de respuesta extra
    e.botonBorrarRespuesta.click(function() {
      // oculto el elemento original.
      if ($(this).parent().is('#optionTemplate')) {
        if (!$('#optionTemplate').hasClass('hide')) {
          $('#optionTemplate').addClass('hide');
          $('#optionTemplate input').val('');
        }
      }
      // borro los clones.
      else{
        $(this).parent().remove();
      }
    });

*/

    e.botonEditarPregunta.click(function() {
      $('.list-group-item').each(function() {
        if ($(this).hasClass('active')) {
          var nuevaPregunta = prompt("Editar pregunta");
          var id = $(this).attr('id');
          contexto.controlador.editarPregunta(id, nuevaPregunta);
        }
      });

    });

    e.botonBorrarPregunta.click(function() {
      $('.list-group-item').each(function() {
        if ($(this).hasClass('active')) {
          var id = $(this).attr('id');
          contexto.controlador.borrarPregunta(id);
        }
      });
    });

    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodasLasPreguntas();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
