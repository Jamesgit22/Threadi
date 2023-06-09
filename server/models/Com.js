const {Schema, model, SchemaTypes} = require('mongoose');

const comSchema = new Schema({
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
    default: 0
  },
  parent: {
    type: SchemaTypes.ObjectId,
    required: true,
    refPath: 'parentType'
  },
  parentType: {
    type: String,
    required: true,
    enum: ['Review', 'Com', 'Thread']
  },
  coms: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Com'
    }
  ],
});

const Com = model('Com', comSchema);

module.exports = Com;
