var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose');
var db = mongoose.connection;
// var ExpressBrute = require('express-brute');
// var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
//
// // No more than 1000 login attempts per day per IP
// var globalBruteforce = new ExpressBrute(store, {
//     freeRetries: 2,
//     proxyDepth: 1,
//     attachResetToRequest: false,
//     refreshTimeoutOnRequest: false,
//     minWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
//     maxWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
//     lifetime: 24*60*60, // 1 day (seconds not milliseconds)
//     failCallback: failCallback,
//     handleStoreError: handleStoreError
// });

var userSchema = mongoose.Schema({
    name: String,
    key: String,
    email: String,
    isAdmin: Boolean,
    group: Number,
    imageUrl: String
});


var failCallback = function (req, res, next, nextValidRequestDate) {
  console.log('Too many attempts');
    req.flash('error', "You've made too many failed attempts in a short period of time, please try again "+moment(nextValidRequestDate).fromNow());
    res.redirect('/login'); // brute force protection triggered, send them back to the login page
};

var handleStoreError = function (error) {
    console.log(error); // log this error so we can figure out what went wrong
    // cause node to exit, hopefully restarting the process fixes the problem
    throw {
        message: error.message,
        parent: error.parent
    };
}

//
var User = mongoose.model('users', userSchema);

router.get('/', function(req, res, next) {
  var sess = req.session;

  console.log('New request');

  if (sess.user) {
    console.log('Session found for user ' + sess.user.name);

    res.render('index', { title: 'Superspecial Wishlist 2.0' });
    return;
  }

  console.log('No Session active');
  res.render('login', { title: 'Superspecial Wishlist 2.0', message: req.query.message });
  return;
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Superspecial Wishlist 2.0'});
});

/* GET login. */
router.post('/login', function(req, res, next) {
  // globalBruteforce.prevent, // error 429 if we hit this route too often
    // function (req, res, next) {
      var sess = req.session;

      if (!req.body.key) {
        console.log('No key given');
        res.render('login', { title: 'Superspecial Wishlist 2.0', message: 'Bitte Schlüssel eingeben'});
        return;
      } else {
        User.findOne({key: req.body.key}, function (err, user) {
          if (err) {
            console.log('Error: ' + err);
            res.render('login', { title: 'Superspecial Wishlist 2.0', message: 'Fehler: ' + err });
            return;
          } else if (!user) {
            console.log('No user found with key ' + req.query.key);
            res.render('login', { title: 'Superspecial Wishlist 2.0', message: 'Kein Benutzer für Schlüssel gefunden'});
            return;
          }

          sess.user = user;
          console.log('Session started for: ' + user.name);
          res.redirect('/');
        });
      }
    // }
});

/* GET logout. */
router.get('/logout', function(req, res, next) {
  var sess = req.session;

  req.session.destroy(function(err) {
    res.redirect('/?message=Erfolgreich%20abgemeldet');
  })
});

module.exports = router;
