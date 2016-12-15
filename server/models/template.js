var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('baseschema');

var schema = BaseSchema();
schema.add({
    content: String,
    isHtml: {type: Boolean, default: true}
});

module.exports = mongoose.model("template", schema);
