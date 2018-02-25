const Tweet = require('../models/Tweet');

exports.showHome = async (req, res) => {
  const tweets = await Tweet.find({})
    .sort({ _id: -1 }) // sort according to the most recent
    .limit(3);

  res.render('index', {
    title: 'Home',
    tweets,
  });
};


exports.addNewTweet = async (req, res) => {
  req.body.author = req.user._id;
  await (new Tweet(req.body)).save();

  req.flash('success', 'Tweet Created Successfully');
  res.redirect('/profile');
};


exports.showSingleTweet = async (req, res) => {
  const tweet = await Tweet
    .findOne({ _id: req.params.id })
    .populate('author comments');

  if (!tweet) {
    req.flash('failed', 'Error! Tweet not found');
    res.redirect('back');
    return;
  }

  res.render('tweet-details', {
    title: 'Single Tweet',
    tweet,
  });
};


exports.showReplyField = async (req, res) => {
  const tweet = await Tweet.findOne({ _id: req.params.id });

  if (!tweet) {
    req.flash('failed', 'Error! Tweet not found');
    res.redirect('back');
    return;
  }

  res.render('reply-tweet', {
    title: 'Reply Tweet',
    tweet,
  });
};


exports.showExplore = async (req, res) => {
  const tweets = await Tweet.find({})
    .sort({ _id: -1 })
    .limit(18);

  res.render('explore', {
    title: 'Explore',
    tweets,
  });
};
