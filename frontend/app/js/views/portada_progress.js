var Backbone = require('backbone'),
	$ = require('jquery'),
	Mustache = require('mustache.js');

module.exports = Backbone.View.extend({
	className: 'work',

	template: $('#portada-progress-template').html(),

	initialize: function(){
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function(){
		var portada = this.model.toJSON();
		var html_rendered = Mustache.render(this.template, portada);

		this.$el.html(html_rendered);
		return this;
	}
});