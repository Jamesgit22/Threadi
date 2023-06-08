const {Schema, model, SchemaTypes} = require('mongoose');

const likeObjectSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
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

const likeSchema = new Schema({
    likes: [likeObjectSchema],
});

const Like = model('Like', likeSchema);

module.exports = Like;
