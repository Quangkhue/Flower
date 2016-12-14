var util = require('util');
var mongoose = require('mongoose');

var BaseSchema = function() {
    var schema = new mongoose.Schema({
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        },
        id: String
    });

    return schema;
}

module.exports = BaseSchema;
