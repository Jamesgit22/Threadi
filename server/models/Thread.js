const { Schema, Types, model } = require('mongoose');

const threadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  threadAuthor: {
    type: Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;
