var Backbone = require('backbone'),
	PortadaModel = require('../models/portada');
	
module.exports = Backbone.Collection.extend({
	model: PortadaModel
});
