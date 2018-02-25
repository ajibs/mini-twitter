const Tweet = require('../models/Tweet');
const User = require('../models/User');
const Comment = require('../models/Comment');

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
  const baseData = {
    likes: 2,
    author: '5a92b7fdcb71600d68a94013',
  };
  const tweetText = [
    { _id: '58c05f928060197ca0b52d59', tweetContent: 'Lunch was fantastic. I rode the dragons afterwards.' },
    { _id: '58c05c208060197ca0b52d58', tweetContent: 'Winter is here.' },
    { _id: '58c05bcd8060197ca0b52d57', tweetContent: 'The weather is sooo cold. I miss the heat' },
    { _id: '58c057838060197ca0b52d54', tweetContent: 'Deep work has really helped me improve and made me happier' },
    { _id: '58c03a958060197ca0b52d50', tweetContent: 'I am taking back the 7 kingdoms right after I defeat the night king' },
    { _id: '58c03a428060197ca0b52d4f', tweetContent: 'I love John Snow!' },
    { _id: '58c039ee8060197ca0b52d4e', tweetContent: 'Being Queen is not as much fun as you would think.' },
    { _id: '58c039938060197ca0b52d4d', tweetContent: 'Enjoy the journey' },
  ];

  const tweets = await tweetText.map(singleTweet => Object.assign({}, baseData, singleTweet));

  await Tweet.remove({}, () => {
    tweets.forEach((tweet) => {
      new Tweet(tweet).save();
    });
  });

  const users = [{
    _id: '5a92b7fdcb71600d68a94013',
    local: {
      firstName: 'daenerys targaryen',
      email: 'motherofdragons@queen.com',
      password: '1997f002c3db624',
    },
  }, {
    _id: '5a92b7fdcb71600d68a94014',
    local: {
      firstName: 'John Snow',
      email: 'aegon@winterfell.com',
      password: 'wkdfjf002c3db624',
    },
  }];
  await User.remove({}, () => {
    users.forEach((user) => {
      new User(user).save();
    });
  });

  const comments = [{
    _id: '58c03ac18060197ca0b52d51',
    author: '5a92b7fdcb71600d68a94014',
    reply: 'I hope to join you one day',
    tweet: '58c05f928060197ca0b52d59',
  }, {
    _id: '58c03af28060197ca0b52d52',
    author: '5a92b7fdcb71600d68a94014',
    reply: 'It shall not be long',
    tweet: '58c05c208060197ca0b52d58',
  }];
  await Comment.remove({}, () => {
    comments.forEach((comment) => {
      new Comment(comment).save();
    });
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
};
