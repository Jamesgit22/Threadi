const {Schema, model, SchemaTypes} = require('mongoose');

const threadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
  },
  reviews: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Review'
    }
  ],
  coms: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Com'
    }
  ]
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;
