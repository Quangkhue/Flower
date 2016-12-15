var mongoose = require('mongoose');
var BaseSchema = require('./baseSchema')

var schema = BaseSchema();
schema.add({
    name: String
});

module.exports = mongoose.model("category", schema);
