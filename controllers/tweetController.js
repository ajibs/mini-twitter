const Tweet = require('../models/Tweet');
const mail = require('../handlers/mail');

exports.showHome = async (req, res) => {
  const tweets = await Tweet
    .find({})
    .populate('author')
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


exports.showTweetDetails = async (req, res) => {
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
  const tweet = await Tweet
    .findOne({ _id: req.params.id })
    .populate('author');

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
  const tweets = await Tweet
    .find({})
    .populate('author')
    .sort({ _id: -1 })
    .limit(18);

  res.render('explore', {
    title: 'Explore',
    tweets,
  });
};


exports.notification = async (req) => {
  // get user email from main tweet ID
  const tweet = await Tweet
    .findOne({ _id: req.params.id })
    .populate('author');

  // Send user an email with the Tweet URL
  const tweetDetailsURL = `http://${req.headers.host}/tweet/${tweet._id}`;
  await mail.send({
    recipient: tweet.author.local.email,
    filename: 'reply-notification',
    subject: 'Reply Notification',
    tweetDetailsURL,
  });
};


exports.incrementLikes = async (req, res) => {
  const tweet = await Tweet.findOne({ _id: req.params.id });

  if (!tweet) {
    req.flash('failed', 'Error! Tweet not found');
    res.redirect('back');
    return;
  }

  tweet.likes += 1;
  await tweet.save();

  req.flash('success', 'Your like has been registered');
  res.redirect('back');
};


exports.validateTweet = (req, res, next) => {
  req.checkBody('tweetContent', 'You must supply tweet content!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('profile', {
      title: 'Profile',
      flashes: req.flash(),
    });
    return; // stop the fn running
  }
  next(); // there were no errors
};
