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
        isDeleted: {
            type: Boolean,
            default: false
        },
        id: String
    });

    schema.options.toJSON = {
      transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
    };

    schema.pre('save', function setId(next){
        if(this.isNew){
            this.id = this._id.toString();
        }
        next();
    });

    schema.pre('update', function setUpdatedAt(){
        this.update({},{ $set: { updatedAt: new Date() } });
    });

    return schema;
}
module.exports = BaseSchema;
