const { Schema } = require('mongoose');

const parentObjectSchema = new Schema({
    review: {
        type: Schema.Types.ObjectId,
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

module.exports = parentSchema;
