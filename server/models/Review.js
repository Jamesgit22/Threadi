const { Schema, model } = require('mongoose');
const User = require('./User');
const Comment = require('./Comment');

const authorSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });
  
  const commentSchema = new Schema({
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
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
    comments: [commentSchema],
  });
  

const Review = model('Review', reviewSchema);

module.exports = Review;
