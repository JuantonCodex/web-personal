var Backbone = require('backbone'),
	ClienteModel = require('../models/cliente');

module.exports = Backbone.Collection.extend({
	model: ClienteModel
});
