const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  author: userschema,
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
  comments: [commentSchema],
});

const Review = model('Review', reviewSchema);

module.exports = Review;
