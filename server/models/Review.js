const {Schema, model, SchemaTypes} = require('mongoose');

const reviewSchema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  dateWatched: {
    type: String,
    required: true,
  },
  thread: {
    type: SchemaTypes.ObjectId,
    ref: 'Thread'
  },
  coms: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Com'
    }
  ],
});

const Review = model('Review', reviewSchema);

module.exports = Review;
