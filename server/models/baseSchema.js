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

    schema.pre('save', function setId(next){
        if(!this._id){
            var id =  mongoose.Types.ObjectId();
            this._id = id;
            this.id = id.toString();
        }

        next();
    });

    schema.pre('update', function setUpdatedAt(){
        this.update({},{ $set: { updatedAt: new Date() } });
    });

    return schema;
}
module.exports = BaseSchema;
