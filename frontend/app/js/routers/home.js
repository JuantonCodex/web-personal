var Backbone = require('backbone'),
	$ = require('jquery'),
	ClientesCollection = require('../collections/clientes'),
	ClientesView = require('../views/clientes'),
	ClienteModel = require('../models/cliente');

module.exports = Backbone.Router.extend({
	routes: {
		'': 'index'
	},

	initialize: function(){

		this.current = {};
		this.jsonData = {};

		this.clientes = new ClientesCollection();
		this.clientelist = new ClientesView({ collection: this.clientes });
		Backbone.history.start();
	},

	index: function(){
		//Creamos las colecciones y vistas que se necesitan en el Home
		this.fetchData();
	},

	fetchData: function(){
		var self = this;

		//Load Data
		return $.getJSON('data/home.json').then(function(data){
			self.jsonData = data;

			for(var name in data){
				if(data.hasOwnProperty(name)){
					self.addClientes(name, data[name]);
				}
			}
		});
	},
	addClientes: function(name, data){
		this.current.cliente = this.jsonData[name];
		this.current.cliente.clientes.forEach(this.addCliente, this);
	},

	addCliente: function(cliente){

		this.clientes.add(new ClienteModel({
			imagen: cliente.imagen,
			textoAlt: cliente.textoAlt
		}));
	}

});
