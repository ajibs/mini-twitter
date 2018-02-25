const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!',
  },
  reply: {
    type: String,
    required: 'Comment cannot be Empty!',
  },
  tweet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet',
    required: 'You must supply a tweet!',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});


function autopopulate(next) {
  this.populate('author');
  next();
}

commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);


module.exports = mongoose.model('Comment', commentSchema);
