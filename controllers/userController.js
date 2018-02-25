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
  req.checkBody('username', 'You must supply a name!').notEmpty();
  req.sanitizeBody('username');
  req.checkBody('password', 'Password cannot be blank').notEmpty();

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
  const tweets = await Tweet.find({})
    .sort({ _id: -1 }) // sort according to the most recent
    .limit(5);

  res.render('profile', {
    title: 'Profile',
    tweets,
  });
};
