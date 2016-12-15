var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('baseSchema');

var schema = BaseSchema();
schema.add({
    username: String,
    password: String,
    email: String,
    address: Schema.Types.Mixed
});

modules.exports = mongoose.model("user", schema);
