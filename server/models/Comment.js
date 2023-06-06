const { Schema, model } = require('mongoose');
const User = require('./User');

const commentObjectSchema = new Schema({
    author: User,
    text: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
    },
  });
  
  const commentSchema = new Schema({
    comments: [commentObjectSchema],
  });
  
  const Comment = model('Comment', commentSchema);

module.exports = Comment;
