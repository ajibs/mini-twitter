const Tweet = require('../models/Tweet');

exports.showSignup = (req, res) => {
  res.render('signup', {
    title: 'Signup',
  });
};


exports.showLogin = (req, res) => {
  res.render('login', {
    title: 'Login',
  });
};


exports.validateSignup = (req, res, next) => {
  req.checkBody('email', 'You must supply an email address!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req.checkBody('firstName', 'You must supply a firstName!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('signup', {
      title: 'Signup',
      flashes: req.flash(),
    });
    return; // stop the fn running
  }
  next(); // there were no errors
};

exports.showProfile = async (req, res) => {
  const tweets = await Tweet
    .find({})
    .populate('author')
    .sort({ _id: -1 }) // sort according to the most recent
    .limit(5);

  res.render('profile', {
    title: 'Profile',
    tweets,
  });
};
