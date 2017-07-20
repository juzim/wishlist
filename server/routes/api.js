var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var session = require('express-session');
var User = mongoose.model('users');
var fs = require('fs');

var wishSchema = mongoose.Schema({
    for: String,
    text: String,
    comment: String,
    addedBy: String,
    grabbedBy: String,
    price: String,
    url: String,
    chippedIn: {},
    group: Number,
    addedAt: Date,
    archivedAt: Date,
    archivedBy: String,
    grabbedAt: Date,
    priority: String
});

var Wish = mongoose.model('wishes', wishSchema);

router.use(function (req, res, next) {
  var sess = req.session;

  if (!sess.user) { //@todo revert
    console.log('no user');

    // res.sendStatus(401);
    // return;
    User.findOne({key: 'foo'}, function (err, user) {
          if (err) {
            console.log('Error: ' + err);
            res.render('login', { title: 'Superspecial Wishlist 2.0', message: 'Fehler: ' + err });
            return;
          } else if (!user) {
            console.log('No user found with key ' + req.query.key);
            res.render('login', { title: 'Superspecial Wishlist 2.0', message: 'Kein Benutzer für Schlüssel gefunden'});
            return;
          }

          user.key = null;
          sess.user = user;
          console.log('Session started for: ' + user.name);
          next();


        });
  } else {

      console.log('user: ' + user.name);

      next();

  }
});

router.post('/wish/chipIn', function(req, res, next) {
  if (!req.body.user || !req.body.id) {
    console.error('Missing data');
    res.json({ success: false, error: 'Missing data' });
    return;
  }

  Wish.findOne({_id: req.body.id}, function (err, wish) {
    if (err) {
      console.error();('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish === null) {
      res.json({ success: false, error: 'Wunsch nicht gefunden' });
      return;
    }

    if (wish.chippedIn === undefined) {
      wish.chippedIn = {};
    }

    wish.chippedIn[req.body.user] = true;

    wish.save(function (err, w1) {
      if (err) {
        console.error(err);
        res.json({ success: false, error: err });
        return;
      }
    });
    wish.markModified('chippedIn');

    console.log('Wish updated, chipped in');

    res.json({
      success: true,
      wish: wish
    });
  });
});

router.delete('/wish/chipIn', function(req, res, next) {
  if (!req.body.user || !req.body.id) {
    console.error('Missing data');
    res.json({ success: false, error: 'Missing data' });
    return;
  }

  Wish.findOne({_id: req.body.id}, function (err, wish) {
    if (err) {
      console.error('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish === null) {
      res.json({ success: false, error: 'Wunsch nicht gefunden' });
      return;
    }

    if (wish.chippedIn === undefined) {
      wish.chippedIn = {};
    }

    wish.chippedIn[req.body.user] = false;

    wish.markModified('chippedIn');
    console.log(wish);

    wish.save(function (err, w1) {
      if (err) {
        console.error(err);
        res.json({ success: false, error: err });
        return;
      }
    });

    console.log('Wish updated, chipped out');

    res.json({
      success: true,
      wish: wish
    });
  });
});

router.post('/wish/archive', function(req, res, next) {
  if (!req.body.id || !req.body.userName) {
    console.error('Missing data');
    res.json({ success: false, error: 'Missing data' });
    return;
  }

  Wish.findOne({_id: req.body.id}, function (err, wish) {
    if (err) {
      console.error();('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish === null) {
      res.json({ success: false, error: 'Wunsch nicht gefunden' });
      return;
    }

    wish.archivedAt = new Date();
    wish.archivedBy = req.body.userName;

    wish.save(function (err, w1) {
      if (err) {
        console.error(err);
        res.json({ success: false, error: err });
        return;
      }
    });

    console.log('Wish archived');

    res.json({
      success: true,
      wish: wish
    });
  });
});

router.post('/wish/archiveOld', function(req, res, next) {
  // @todo check if admin
  if (!req.body.id) {
    console.error('Missing data');
    res.json({ success: false, error: 'Missing data' });
    return;
  }

  Wish.findOne({_id: req.body.id}, function (err, wish) {
    if (err) {
      console.error();('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish === null) {
      res.json({ success: false, error: 'Wunsch nicht gefunden' });
      return;
    }

    wish.archivedAt = new Date();

    wish.save(function (err, w1) {
      if (err) {
        console.error(err);
        res.json({ success: false, error: err });
        return;
      }
    });

    console.log('Wish archived');

    res.json({
      success: true,
      wish: wish
    });
  });
});

router.put('/wish/:id', function(req, res, next) {
  var sess = req.session;

  if (!req.params.id) {
    console.error('no id given, params are ' + JSON.stringify(req.params));
    res.json({ success: false, error: 'Wish id missing' });
    return;
  }

  Wish.findOne({_id: req.params.id}, function (err, wish) {
    if (err) {
      console.error('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish === null) {
      res.json({ success: false, error: 'Wunsch nicht gefunden' });
      return;
    }

    if (wish.addedBy !== sess.user.name && sess.user.isAdmin !== true) {
      res.json({ success: false, error: 'Nicht genügend Rechte um Wunsch zu ändern' });
      return;
    }

    wish.text = req.body.text;
    wish.comment = req.body.comment;
    wish.price = req.body.price;
    wish.url = req.body.url;
    wish.priority = req.body.priority;

    wish.save(function (err, w1) {
      if (err) {
        console.error(err);
        res.json({ success: false, error: err });
        return;
      }
      console.log('Wish updated');
      wish.id = wish._id

      res.json({
        success: true,
        wish: wish
      });
    });
  });
});


router.post('/wish', function(req, res, next) {
  var sess=req.session, now = new Date();

  var wish = new Wish({
    for: req.body.for,
    addedBy: sess.user.name, // @todo use id
    text: req.body.text,
    comment: req.body.comment,
    boughBy: null,
    price: req.body.price,
    url: req.body.url,
    chippedIn: {},
    group: sess.user.group,
    addedAt: now,
    priority: req.body.priority
  });

// @todo add validation

  wish.save(function (err, w1) {
    if (err) {
      console.error(err);
      res.json({ success: false, error: err });
      return;
    }
    console.log('New wish created');
    wish.id = wish._id
    res.json({
      success: true,
      wish: wish
    });
  });


});

router.delete('/wish/:id', function(req, res, next) {
  var sess = req.session;

  if (!req.params.id) {
    console.error('no id given, params are ' + JSON.stringify(req.params));
    res.json({ success: false, error: 'Wish id missing' });
    return;
  }
  
  console.log('Request to delete wish with id ' + req.params.id)
  Wish.findOne({_id: req.params.id}, function (err, wish) {
    if (err) {
      console.error('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish === null) {
      console.log('Wish not found for deletion');
      res.json({
        success: true
      });
      return
    }

    if (wish.addedBy !== sess.user.name && sess.user.isAdmin !== true) {
      res.json({ success: false, error: 'Nicht genügend Rechte um Wunsch zu archivieren'});
      return;
    }

    wish.remove(function (err, w1) {
      if (err) {
        console.error(err);
        res.json({ success: false, error: err });
        return;
      }
    });

    console.log('Wish deleted');

    res.json({
      success: true
    });
  });
});

/* GET user page. */
router.get('/lists', function(req, res, next) {
  var sess=req.session;
  // @todo revert4
  // var user = sess.user;

  var user = {};
  console.log(user);
  user.group = 1;
  user.key = 'foo';
  user.name = 'J';
  console.log('Getting users');

  User.find({"group": user.group}).lean().select({'name': 1, 'imageUrl': 1, 'announcement': 1}).exec(function (err, users) {
      if (err) {
        console.log('Error: ' + err);

        res.json({ success: false, error: err });
      }

      console.log('Found ' + users.length + ' users in group ' + user.group + ', getting wishes');
// @todo filter in query
      Wish.find({"group": user.group}, function (err, wishes) {
        if (err) {
          console.log('Error: ' + err);
          res.json({ success: false, error: err });
        }

        spoilerfreeWishes = wishes.filter(function (wish) {
          var isForOther = wish.for !== user.name;
          var isOwnWish = wish.for === user.name && wish.addedBy === user.name;

          return isOwnWish || isForOther;
        });

        wishes.forEach(function (wish, i, wishes) {
          if (wish.for === user.name) {
            wish.grabbedBy = null;
            wish.grabbedAt = null;
          }
          wish.id = wish._id
        });

        res.json({
          success: true,
          wishes: spoilerfreeWishes,
          user: sess.user,
          allUsers: users
        });
      });
    });
});

router.get('/grap', function(req, res, next) {
  if (!req.query.id || !req.query.user) {
    res.json({ success: false, error: 'missing query data' });
    return;
  }

  Wish.findOne({_id: req.query.id}, function (err, wish) {
    if (err) {
      console.log('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish === null) {
      res.json({ success: false, error: 'Wunsch nicht gefunden' });
      return;
    }

    var action = null;

    if (!wish.grabbedBy || wish.grabbedBy === undefined) {
      console.log('grapping');
      wish.grabbedBy = req.query.user;
      wish.grabbedAt = new Date();
      action = 'grabbed';
    } else if (wish.grabbedBy === req.query.user) {
      console.log('un-grapping');
      wish.grabbedBy = null;
      wish.grabbedAt = null;
      action = 'ungrabbed';
    } else {
      console.error('wish already grabbed by different user');
    }

    wish.save(function (err, w1) {
      if (err) {
        res.json({ success: false, error: 'Wunsch nicht gefunden' });
      } else {
        console.log('Wish grab status saved');
        res.json({
          success: true,
          action: action,
          wish: wish
        });
      }
    });
  });
});

router.put('/user', function(req, res, next) {
  if (!req.body.id) {
    console.error('Missing id');
    res.json({ success: false, error: 'Missing id' });
    return;
  }

  let fields = JSON.parse(req.body.fields);
  console.log(fields);
  console.log(fields.announcement);

  User.findOne({"_id": req.body.id}, function (err, user) {
      if (err) {
        console.log('Error: ' + err);

        res.json({ success: false, error: err });
      }

      if (user === null) {
        res.json({ success: false, error: 'User nicht gefunden' });
        return;
      }

      if (user._id !== req.session.user._id) {
        res.json({ success: false, error: 'Du darfst diesen User nicht ändern' });
        return;
      }

      console.log('User found: ' + user);
      // user = user.toObject();
      //
      // Object.assign(user, fields);

      var this_key = 'test';
      var push = {};

      for (var key in fields) {
        if (fields.hasOwnProperty(key)) {
          push[key] = fields[key];
        }
      }

      user.update(push, function (err, w1) {
        if (err) {
          console.error(err);
          res.json({ success: false, error: err });
          return;
        }
        User.findOne({"_id": req.body.id}, function (err, nuser) {
          console.log('User updated: ' + nuser);
          req.session.user = nuser;
          nuser.key = null;
          res.json({ success: true, user: nuser });
        });

      });
    });

});

module.exports = router;
