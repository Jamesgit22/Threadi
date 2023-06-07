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
  reviews: [{
    reviewer: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }]
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;
