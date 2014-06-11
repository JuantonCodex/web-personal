var Backbone = require('backbone'),
	$ = require('jquery');
	Handlebars = require('handlebars'),
	Handlebars = Handlebars.Handlebars;

module.exports = Backbone.View.extend({
	className: 'cliente',
	events: {
		'click .wrapper-img': 'explosion'
	},

	template: Handlebars.compile($("#cliente-template").html()),
	initialize: function(){
		this.listenTo(this.model, 'change', this.render, this);
	},

	render: function(){
		var cliente = this.model.toJSON();
		var html = this.template(cliente);
		this.$el.html(html);
		return this;
	},

	explosion: function(e){
		Backbone.Home.fnEfectoExplosion(e);
	}
});