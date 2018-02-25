const Tweet = require('../models/Tweet');
const User = require('../models/User');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { window } = (new JSDOM(''));
const DOMPurify = createDOMPurify(window);

exports.validateTweet = (req, res, next) => {
  req.checkBody('tweetContent', 'You must supply tweet tweetContent!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const error = errors.map(err => err.msg);
    res.json({
      status: 400,
      message: 'Create Post Error',
      body: req.body,
      error,
    });
    return; // stop the fn running
  }
  next(); // there were no errors
};


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
  const data = [
    { tweetContent: 'Lunch was fantastic. I had some bacon and bread' },
    { tweetContent: 'At Chaser, we only hire the best developers. Join us today' },
    { tweetContent: 'The weather is so cold. I miss the heat' },
    { tweetContent: 'Deep work has really helped me improve and made me happier' },
    { tweetContent: 'Netflix and chill' },
    { tweetContent: 'I love ice-cream' },
    { tweetContent: 'The best people work really hard' },
    { tweetContent: 'Enjoy the journey' },
  ];

  const demo = await data.map(singleTweet => Object.assign({}, baseData, singleTweet));

  await Tweet.remove({}, () => {
    demo.forEach((tweet) => {
      new Tweet(tweet).save();
    });
  });

  res.json({
    status: 200,
    message: 'database seeded successfully',
  });
};
