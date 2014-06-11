var Backbone = require('backbone'),
	TrabajoModel = require('../models/trabajo');

module.exports = Backbone.Collection.extend({
	model: TrabajoModel
});
