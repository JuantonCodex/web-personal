var Backbone = require('backbone'),
	$ = require('jquery'),
	Mustache = require('mustache.js');

module.exports = Backbone.View.extend({
	className: 'trabajo',
	
	template: $('#trabajo-template').html(),

	initialize: function(){
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function(){
		var trabajo = this.model.toJSON();
		var html_rendered = Mustache.render(this.template, trabajo);
		this.$el.html(html_rendered);
		return this;
	}
});