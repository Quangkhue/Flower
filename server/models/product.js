var mongoose = require('mongoose');
var BaseSchema = require('./baseSchema');
var Schema = mongoose.Schema;

var schema = BaseSchema();
schema.add({
    name: String,
    imgUrls: [String],
    shortDes: String,
    fullDes: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'comments'}],
    cats: [{ type: Schema.Types.ObjectId, ref: 'category' }]
});

var Product = mongoose.model("product", schema);

Product.getProductsByCatIds = function(catIds){
    return Product.find({cats: {$in: catIds}}).exec();
}

module.exports = Product;
