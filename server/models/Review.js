const { Schema, model } = require('mongoose');
const User = require('./User');
const Comment = require('./Comment');

const reviewSchema = new Schema({
  author: User.schema,
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
  comments: [Comment.schema],
});

const Review = model('Review', reviewSchema);

module.exports = Review;
