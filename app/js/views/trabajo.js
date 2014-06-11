var Backbone = require('backbone'),
	$ = require('jquery');
	Handlebars = require('handlebars'),
	Handlebars = Handlebars.Handlebars;

module.exports = Backbone.View.extend({
	className: 'trabajo',
	
	template: Handlebars.compile($('#trabajo-template').html()),

	initialize: function(){
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function(){
		var trabajo = this.model.toJSON();
		var html = this.template(trabajo);
		this.$el.html(html);
		return this;
	}
});