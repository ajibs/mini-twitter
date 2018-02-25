const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');
const utilitiesController = require('../controllers/utilitiesController');
const commentController = require('../controllers/commentController');

const { catchErrors } = require('../handlers/errorHandlers');


const router = express.Router();


router.get('/', catchErrors(tweetController.showHome));

router.get('/signup', userController.showSignup);
router.post(
  '/signup',
  userController.validateSignup,
  authController.signup,
);

router.get('/login', userController.showLogin);
router.post('/login', authController.login);


router.get('/logout', authController.logout);

router.get(
  '/profile',
  authController.isLoggedIn,
  catchErrors(userController.showProfile),
);


router.post(
  '/create-tweet',
  authController.isLoggedIn,
  utilitiesController.validateTweet,
  utilitiesController.sanitizeData,
  catchErrors(tweetController.addNewTweet),
);


router.get('/tweet/:id', catchErrors(tweetController.showTweetDetails));

router.get(
  '/tweet/reply/:id',
  authController.isLoggedIn,
  catchErrors(tweetController.showReplyField),
);
router.post(
  '/tweet/reply/:id',
  authController.isLoggedIn,
  utilitiesController.sanitizeData,
  catchErrors(commentController.addComment),
);


router.get('/explore', catchErrors(tweetController.showExplore));
router.post(
  '/tweet/likes/:id',
  authController.isLoggedIn,
  catchErrors(tweetController.incrementLikes),
);

router.get('/seed', catchErrors(utilitiesController.seedDB));


module.exports = router;
