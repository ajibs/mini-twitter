const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');

exports.addComment = async (req, res) => {
  const tweetID = req.params.id;

  req.body.author = req.user._id;
  req.body.tweet = tweetID;

  await (new Comment(req.body)).save();

  req.flash('success', 'Comment Saved!');
  res.redirect(`/tweet/${tweetID}`);
};
