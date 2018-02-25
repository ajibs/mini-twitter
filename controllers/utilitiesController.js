const Experience = require('../models/Experience');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { window } = (new JSDOM(''));
const DOMPurify = createDOMPurify(window);

exports.validateTweet = (req, res, next) => {
  req.checkBody('tweetContent', 'You must supply tweet content!').notEmpty();

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


exports.seedDB = async (req, res) => {
  // create demo data
  const demo = {
    title: 'Clubbing at Quilox',
    summary: 'Party with the stars',
    location: 'lagos, nigeria',
    price: 500,
    date: '2017-12-27T00:00:00.000Z',
    fullDescription: 'Enjoy the best of Lagos night life, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet',
  };

  Experience.remove({}, () => { // empty database then save documents
    let i = 0;
    while (i < 25) {
      const tour = new Experience(demo);
      tour.save();
      i++;
    }
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
};
