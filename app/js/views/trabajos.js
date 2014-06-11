var Backbone = require('backbone'),
	$ = require('jquery'),
	TrabajoView = require('../views/trabajo');

module.exports = Backbone.View.extend({
	el: $('#portafolio'),

	initialize: function(){
		this.listenTo(this.collection, "add", this.addOne, this);	
		this.listenTo(this.collection, "reset", this.render, this);	
	},

	render: function(){
		console.log("Limpio #portafolio y reseteo la coleccion de trabajos");
		this.$el.empty();
		//this.addAll();
	},

	addOne: function(trabajo){
		var trabajoView = new TrabajoView({ model:trabajo });
		this.$el.append(trabajoView.render().el);
	},

	addAll: function(){
		this.collection.forEach(this.addOne, this);	
	}

});