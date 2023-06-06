const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');


const threadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  threadAuthor: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  reviews: [reviewSchema],
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;
