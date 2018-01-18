/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.clavePreguntas= [];
  this.ultimoId = 0;
  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.cargarPreguntas();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length > 0) {
      return this.preguntas[this.preguntas.length-1].id;
    }
    else{
      return this.ultimoId;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  // guarda las preguntas en el localStorage.
  guardar: function(){
    for (var i = 0; i < this.preguntas.length; i++) {
      localStorage.setItem('pregunta'+this.preguntas[i].id, JSON.stringify(this.preguntas[i]));
    }
  },

  // cargo las preguntas del localStorage.
  cargarPreguntas: function(){
    this.preguntasGuardadas = [];
    for (var i = 0; i < localStorage.length; i++) {
      this.clavePreguntas[i] = localStorage.key(i);
      this.preguntasGuardadas[i] = localStorage.getItem(this.clavePreguntas[i]);
      this.preguntas[i]= JSON.parse(this.preguntasGuardadas[i]);
    }
  },

  editarPregunta: function(id, nuevaPregunta) {
    var indice = this.preguntas.findIndex(x => x.id==id);
    this.preguntas[indice].textoPregunta = nuevaPregunta;
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarPregunta: function(id) {
    var indice = this.preguntas.findIndex(x => x.id==id);
    var indice2 = this.clavePreguntas.findIndex(x => x=='pregunta'+id);
    this.preguntas.splice(indice, 1);
    this.clavePreguntas.splice(indice2, 1);
    localStorage.removeItem('pregunta'+id);
    this.preguntaBorrada.notificar();
  },

  borrarTodasLasPreguntas: function() {
    this.preguntas = [];
    this.clavePreguntas = [];
    localStorage.clear();
    this.preguntaBorrada.notificar();
  },

  obtenerPregunta: function(nombrePregunta) {
    var indice = this.preguntas.findIndex(x => x.textoPregunta==nombrePregunta);
    return this.preguntas[indice];
  },

  agregarVoto: function(pregunta,respuestaSeleccionada) {
    var indice = pregunta.cantidadPorRespuesta.findIndex(x => x.textoRespuesta==respuestaSeleccionada);
    pregunta.cantidadPorRespuesta[indice].cantidad++;
    this.guardar();
    this.votoAgregado.notificar();
  }
};
