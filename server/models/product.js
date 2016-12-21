var mongoose = require('mongoose');
var BaseSchema = require('./baseSchema')

var schema = BaseSchema();
schema.add({
    name: String,
    imgUrls: [String],
    description: String,
    catIds: [String]
});

var Product = mongoose.model("product", schema);

Product.getProductsByCatIds = function(catIds){
    return Product.find({catIds: {$in: catIds}}).exec();
}

module.exports = Product;
