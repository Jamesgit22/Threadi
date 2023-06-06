const { Schema } = require('mongoose');

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

module.exports = reviewSchema;
