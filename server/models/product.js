var mongoose = require('mongoose');
var BaseSchema = require('./baseSchema');
var Schema = mongoose.Schema;

var schema = BaseSchema();
schema.add({
    name: String,
    imgUrls: [String],
    description: String,
    cats: [{ type: Schema.Types.ObjectId, ref: 'category' }]
});

var Product = mongoose.model("product", schema);

Product.getProductsByCatIds = function(catIds){
    return Product.find({catIds: {$in: catIds}}).exec();
}

module.exports = Product;
