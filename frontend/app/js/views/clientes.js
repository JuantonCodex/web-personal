var Backbone = require('backbone'),
	$ = require('jquery'),
	ClienteView = require('../views/cliente');

module.exports = Backbone.View.extend({
	el: $('.lista-clientes'),
	initialize: function(){
		this.listenTo(this.collection, "add", this.addOne, this);	
	},

	render: function(){
		this.collection.forEach(this.addOne, this);
	},

	addOne: function(cliente){
		var clienteView2 = new ClienteView({ model:cliente });
		this.$el.append(clienteView2.render().el);
	}

});