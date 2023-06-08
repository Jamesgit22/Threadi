const {Schema, model, SchemaTypes} = require('mongoose');

const parentObjectSchema = new Schema({
    review: {
        type: SchemaTypes.ObjectId,
        ref: 'Review'
    },
    thread: {
        type: SchemaTypes.ObjectId,
        ref: 'Thread'
    },
    comment: {
        type: SchemaTypes.ObjectId,
        ref: 'Com'
    }
});

const parentSchema = new Schema({
    parent: [parentObjectSchema],
});

const Parent = model('Parent', parentSchema);

module.exports = Parent;
