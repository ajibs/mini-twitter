/**
 * config file for passport.js
 */

// load dependencies
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  /**
   * for persistent login sessions
   * passport needs ability to serialize and unserialize users out of session
   */

  // serialize user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // strategy for local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (req, email, password, done) => {
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
      // check if user email already exists in DB
      User.findOne({ 'local.email': email }, async (err, existingUser) => {
        if (err) {
          return done(err);
        }

        if (existingUser) {
          // email exists in DB
          return done(null, false, req.flash('signupMessage', 'That email already exists'));
        }

        /**
         * check if the user is already logged in
         * user is logged in; use exisiting account details
         * else create entirely new user
         */
        const localUser = req.user ? req.user : new User();
        localUser.local.email = email;
        localUser.local.password = localUser.generateHash(password);
        localUser.local.firstName = req.body.firstName;
        try {
          await localUser.save();
          return done(null, localUser, req.flash('message', 'Local account signup successful'));
        } catch (e) {
          console.error(e);
        }

        // function gets here means local signup failed
        return done(null, false, req.flash('message', 'local account signup failed'));
      });
    });
  }));


  // local strategy for login
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true,
  }, (req, email, password, done) => {
    process.nextTick(() => {
      // check if email exists
      User.findOne({ 'local.email': email }, (err, user) => {
        if (err) {
          return done(err);
        }

        // wrong email
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'email is incorrect'));
        }

        // wrong password
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Password is incorrect'));
        }

        // login successful
        return done(null, user, req.flash('success', 'You are now logged in'));
      });
    });
  }));
};
