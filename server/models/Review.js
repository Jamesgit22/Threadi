const {Schema, model, SchemaTypes} = require('mongoose');

const reviewSchema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: String,
    required: true,
    default: new Date()
  },
  type: {
    type: String,
    required: true
  },
  image: {
    type: String
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
  date: {
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
