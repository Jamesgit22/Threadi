const {Schema, model, SchemaTypes} = require('mongoose');

const likeSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    likedContent: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'parentType'
    },
    parentType: {
        type: String,
        required: true,
        enum: ['Review', 'Com', 'Thread']
    }
});

const Like = model('Like', likeSchema);

module.exports = Like;
