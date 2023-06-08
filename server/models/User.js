const {Schema, model, SchemaTypes} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-zA-Z0-9_-]{3,16})$/,
    },
    password: {
      type: String,
      required: true,
      match: /^([a-zA-Z0-9!@#$%^&*-+=_`~]{8,24})$/,
    },
    email: {
      type: String,
      required: true,
      match: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
    },
    friends: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'User',
      }
    ],
    likes: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Like'
      },
    ],
    coms: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Com'
      }
    ],
    reviews: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Review'
      }
    ],
    userThreads: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Thread'
      }
    ],
    savedThreads: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Thread'
      }
    ]
  },
  {
    // access virtual
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
