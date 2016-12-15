var mongoose = require('mongoose');
var BaseSchema = require('./baseSchema')

var schema = BaseSchema();
schema.add({
    name: String,
    imgUrls: [String],
    description: String,
    catIds: [String]
});

module.exports = mongoose.model("product", schema);
