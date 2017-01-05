var mongoose = require('mongoose');
var BaseSchema = require('./baseSchema')

var schema = BaseSchema();
schema.add({
    name: String,
    imgUrl: String
});

var Category = mongoose.model("category", schema);
module.exports = Category;
