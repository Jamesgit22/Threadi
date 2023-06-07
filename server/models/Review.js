const { Schema, model } = require('mongoose');
const User = require('./User');
const Com = require('./Com');

const authorSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });
  
  const comSchema = new Schema({
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Com'
    }
  });
  
  
  const reviewSchema = new Schema({
    author: authorSchema,
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
    comments: [comSchema],
  });
  

const Review = model('Review', reviewSchema);

module.exports = Review;
