const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const tweetSchema = new mongoose.Schema(
  {
    tweetContent: {
      type: String,
      trim: true,
      required: 'Please enter content for the tweet!',
    },
    created: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: 'Tweet should have a valid User!',
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

/*
Add a virtual field to find
comments where tweet._id = comment.tweet
*/
tweetSchema.virtual('comments', {
  ref: 'Comment', // What model to link
  localField: '_id', // field on the tweet schema
  foreignField: 'tweet', // Field on the Comment schema
});

module.exports = mongoose.model('tweet', tweetSchema);
