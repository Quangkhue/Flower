var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('./baseSchema');

var schema = BaseSchema();
schema.add({
    username: String,
    password: String,
    email: String,
    address: Schema.Types.Mixed
});

var User = mongoose.model("user", schema);

module.exports = User;
