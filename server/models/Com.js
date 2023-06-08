const { Schema } = require('mongoose');
const User = require('./User');

const comObjectSchema = new Schema({
  author: User,
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
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
