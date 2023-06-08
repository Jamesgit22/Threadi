const {Schema, model, SchemaTypes} = require('mongoose');

const comObjectSchema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    defaultValue: 0
  },
  parent: {
    type: SchemaTypes.ObjectId,
    ref: 'Parent'
  },
  coms: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Com'
    }
  ],
});

const comSchema = new Schema({
  coms: [comObjectSchema],
});

const Com = model('Com', comSchema);

module.exports = Com;
