/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    // si el input de la pregunta y de la respuesta no están vacíos agrego la pregunta.
    if ((pregunta.length > 0) && (respuestas.length > 0)) {
      this.modelo.agregarPregunta(pregunta, respuestas);
    }
  },
  editarPregunta: function(id, nuevaPregunta) {
    this.modelo.editarPregunta(id, nuevaPregunta);
  },

  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },

  borrarTodasLasPreguntas: function() {
    this.modelo.borrarTodasLasPreguntas();
  },

  agregarVoto: function(pregunta,respuestaSeleccionada) {
    // se agrega el voto solo si seleccioné una opcion.
    if (respuestaSeleccionada !== undefined) {
        this.modelo.agregarVoto(pregunta,respuestaSeleccionada);
    }
  }
};
