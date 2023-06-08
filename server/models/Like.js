const { Schema } = require('mongoose');
const User = require('./User');

const likeObjectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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

const likeSchema = new Schema({
    likes: [likeObjectSchema],
});


module.exports = likeSchema;
