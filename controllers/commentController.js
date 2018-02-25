const mongoose = require('mongoose');
const tweetController = require('./tweetController');
const { catchErrors } = require('../handlers/errorHandlers');

const Comment = mongoose.model('Comment');

exports.addComment = async (req, res) => {
  const tweetID = req.params.id;

  req.body.author = req.user._id;
  req.body.tweet = tweetID;

  await (new Comment(req.body)).save();

  catchErrors(tweetController.notification(req, res));

  req.flash('success', 'Comment Saved!');
  res.redirect(`/tweet/${tweetID}`);
};
