var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('baseSchema');

var schema = BaseSchema();
schema.add({
    createdBy: Schema.Types.ObjectId,
    productId: Schema.Types.ObjectId,
    content: String
});

module.exports = mongoose.model("comment", schema);
