const {Schema, model, SchemaTypes} = require('mongoose');

const threadSchema = new Schema({
  title: {
    type: String,
    default: 'No title.'
  },
  timestamp: {
    type: String,
    default: Date.now()
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
  description: {
    type: String,
    default: "No description"
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
