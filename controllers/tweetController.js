const Experience = require('../models/Experience');
const Tweet = require('../models/Tweet');

exports.showHome = async (req, res) => {
  const tours = await Experience.find({})
    .sort({ _id: -1 }) // sort according to the most recent
    .limit(3);

  res.render('index', {
    title: 'Home',
    tours,
  });
};


exports.addNewTweet = async (req, res) => {
  req.body.author = req.user._id;
  await (new Tweet(req.body)).save();

  req.flash('success', 'Tweet Created Successfully');
  res.redirect('/profile');
};


exports.showSingleTour = async (req, res) => {
  const tour = await Experience.findOne({ _id: req.params.id });

  if (!tour) {
    req.flash('failed', 'Error! Tour not found');
    res.redirect('back');
    return;
  }

  res.render('tour-details', {
    title: 'Tour Details',
    tour,
  });
};
