const {Schema, model, SchemaTypes} = require('mongoose');

const reviewSchema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
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
  },
  dateWatched: {
    type: Date,
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
