var Backbone = require('backbone'),
	$ = require('jquery'),
	PortadasCollection = require('../collections/portadas'),
	PortadasView = require('../views/portadas'),
	TrabajosCollection = require('../collections/trabajos'),
	TrabajosView = require('../views/trabajos'),
	PortadaModel = require('../models/portada'),
	TrabajoModel = require('../models/trabajo');

module.exports = Backbone.Router.extend({
	routes: {
		'': 'index',
		':name': 'work'
	},

	initialize: function(){

		this.current = {};
		this.jsonData = {};
		this.contadorProyectos = 0;

		this.portadas = new PortadasCollection();
		this.portadasView = new PortadasView({ collection:this.portadas });

		this.trabajos = new TrabajosCollection();
		this.trabajosView = new TrabajosView({ collection:this.trabajos });

		Backbone.history.start();
	},

	index: function(){
		this.trabajos.reset();
		this.fetchData();
		$('#btn-portafolio-behance').show();
	},

	work: function(name){
		$('#btn-portafolio-behance').hide();
		this.portadas.reset();

		if(Object.keys(this.jsonData).length === 0){

			console.log("Cargo la data JSON porque estoy accediendo directamente a un trabajo");
			var self = this;
			this.fetchData("detalle").done(function(){
				self.addTrabajo(name);
			});

		}else{
			console.log("Hago uso de ls data JSON ya cargada");
			this.addTrabajo(name);
		}
	},

	fetchData: function(recurso){
		var self = this;
		this.contadorProyectos = 0;

		//Cargar Data
		return $.getJSON('data/portafolio.json').then(function(data){
			self.jsonData = data;
			self.totalProyectos = Object.keys(self.jsonData).length;

			if(recurso != "detalle"){
				for(var name in data){
					if(data.hasOwnProperty(name)){
						self.addPortada(name, data[name]);
					}
				}
			}
		});
	},

	addPortada: function(name, data){

		//Agrego a la colección de portadas un modelo de portada
		this.portadas.add(new PortadaModel({
			nombre: name,
			url: data.url,
			imagen_portada: data.img_portada,
			estado: data.estado
		}));
		this.contadorProyectos++;
		if(this.contadorProyectos == this.totalProyectos){
			Backbone.Portafolio.fnAnimacionProgress();
		}
	},

	addTrabajo: function(url){
		// Obtenemos el objeto en base a la url
		var name;
		for (var node in this.jsonData) {
			if (this.jsonData[node].url === url) {
				name = node;
			}
		}

		this.current.trabajo = this.jsonData[name];
		var trabajo = this.current.trabajo;

		var listaImagenes = [];
		function getImagenes(){
			for(var i in trabajo.img_slide){
				if(trabajo.img_slide.hasOwnProperty(i)){
					listaImagenes.push({url:trabajo.img_slide[i]});
				}
			}
		}
		getImagenes();

		$('.share-button').html('');
		$(document).attr('title', 'Proyecto: '+name);
		this.trabajos.add(new TrabajoModel({
			titulo: name,
			url: trabajo.url,
			categoria: trabajo.categoria,
			imagenes_slide: listaImagenes,
			texto: trabajo.detalle.texto,
			compatibilidad: trabajo.detalle.compatibilidad,
			tecnologias: trabajo.detalle.tecnologias
		}));

		Backbone.Portafolio.fnSlide();
		var timerShareButton = setInterval(function(){
			if(FB){
				FB.XFBML.parse();
				clearInterval(timerShareButton);
				console.log('clear');
			}
		},500);
	}

});
