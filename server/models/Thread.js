const reviewSchema = require('./Review');

const threadSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        reviews: [reviewSchema]
    }
);

module.exports = threadSchema;