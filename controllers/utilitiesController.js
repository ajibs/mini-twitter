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
    { _id: '58c039938060197ca0b52d4d', tweetContent: 'Lunch was fantastic. I rode the dragons afterwards.' },
    { tweetContent: 'Winter is here.' },
    { tweetContent: 'The weather is sooo cold. I miss the heat' },
    { tweetContent: 'Deep work has really helped me improve and made me happier' },
    { tweetContent: 'I am taking back the 7 kingdoms right after I defeat the night king' },
    { tweetContent: 'I love John Snow!' },
    { tweetContent: 'Being Queen is not as much fun as you would think.' },
    { tweetContent: 'Enjoy the journey' },
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
    _id: '58c03ada8060197ca0b52d52',
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

  const comment = {
    _id: '58c03ac18060197ca0b52d51',
    author: '58c03ada8060197ca0b52d52',
    reply: 'You tend to forget such words of wisdom when at war!',
    tweet: '58c039938060197ca0b52d4d',
  };
  await Comment.remove({}, () => {
    // users.forEach((user) => {
      new Comment(comment).save();
    // });
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
};
