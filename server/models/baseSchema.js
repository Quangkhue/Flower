var util = require('util');
var mongoose = require('mongoose');

var BaseSchema = function() {
    var schema = new mongoose.Schema({
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
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
            this.createdAt = new Date();
            this.updatedAt = this.createdAt;
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
