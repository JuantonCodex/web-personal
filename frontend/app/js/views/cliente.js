var Backbone = require('backbone'),
	$ = require('jquery'),
	Mustache = require('mustache.js');
	
module.exports = Backbone.View.extend({
	className: 'cliente',
	events: {
		'click .wrapper-img': 'explosion'
	},

	template_mst: $('#cliente-template').html(),

	initialize: function(){
		this.listenTo(this.model, 'change', this.render, this);
	},

	render: function(){
		var cliente = this.model.toJSON();
		var html_rendered = Mustache.render(this.template_mst, cliente);

		this.$el.html(html_rendered);
		return this;
	},

	explosion: function(e){
		Backbone.Home.fnEfectoExplosion(e);
	}
});
