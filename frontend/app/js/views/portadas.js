var Backbone = require('backbone'),
	$ = require('jquery'),
	PortadaView = require('../views/portada');
	PortadaProgressView = require('../views/portada_progress');

module.exports = Backbone.View.extend({
	el: $('#portafolio'),

	initialize: function(){
		this.listenTo(this.collection, "add", this.addOne, this);
		this.listenTo(this.collection, "reset", this.render, this);
	},

	render: function(){
		console.log("Limpio #portafolio y reseteo la coleccion de portadas");
		this.$el.empty();
		//this.addAll();
	},

	addOne: function(portada){

		var estado = portada.attributes.estado;
		var portadaView;

		if(estado == "progress"){
			portadaView = new PortadaProgressView({ model:portada });
		}else{
			portadaView = new PortadaView({ model:portada });
		}

		this.$el.append(portadaView.render().el);
	},

	addAll: function(){
		// console.log(this.collection);
		this.collection.forEach(this.addOne, this);
	}

});
