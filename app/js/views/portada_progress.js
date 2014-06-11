var Backbone = require('backbone'),
	$ = require('jquery');
	Handlebars = require('handlebars'),
	Handlebars = Handlebars.Handlebars;

module.exports = Backbone.View.extend({
	className: 'work',

	template: Handlebars.compile($('#portada-progress-template').html()),

	initialize: function(){
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function(){
		var portada = this.model.toJSON();
		var html = this.template(portada);
		this.$el.html(html);
		return this;
	}
});