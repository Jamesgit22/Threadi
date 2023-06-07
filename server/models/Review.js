const { Schema, model } = require('mongoose');
const User = require('./User');
const Com = require('./Com');

const reviewSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
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
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Com'
    }
  ],
});


const Review = model('Review', reviewSchema);

module.exports = Review;
