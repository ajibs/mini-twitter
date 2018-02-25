const Tweet = require('../models/Tweet');
const User = require('../models/User');
const Comment = require('../models/Comment');

const tweetsMock = require('../data/tweets');
const commentsMock = require('../data/comments');
const usersMock = require('../data/users');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { window } = (new JSDOM(''));
const DOMPurify = createDOMPurify(window);

exports.sanitizeData = (req, res, next) => {
  if (req.query.q) {
    req.body = req.query;
  }

  Object.keys(req.body).forEach((key) => {
    req.body[key] = DOMPurify.sanitize(req.body[key]);
  });

  next();
};


// create some demo data
exports.seedDB = async (req, res) => {
  const tweets = await tweetsMock.loadTweets();
  const comments = commentsMock.loadComments;
  const users = usersMock.loadUsers;

  await Tweet.remove({}, () => {
    tweets.forEach((tweet) => {
      new Tweet(tweet).save();
    });
  });

  await User.remove({}, () => {
    users.forEach((user) => {
      new User(user).save();
    });
  });

  await Comment.remove({}, () => {
    comments.forEach((comment) => {
      new Comment(comment).save();
    });
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
};
