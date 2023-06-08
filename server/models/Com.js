const { Schema } = require('mongoose');
const User = require('./User');

const comObjectSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Parent'
  },
  coms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Com'
    }
  ],
});

const comSchema = new Schema({
  coms: [comObjectSchema],
});


module.exports = comSchema;
