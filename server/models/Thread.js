const {Schema, model, SchemaTypes} = require('mongoose');

const threadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    required: true,
    default: 0
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
