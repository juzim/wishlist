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
    archivedAt: Date
});

var Wish = mongoose.model('wishes', wishSchema);

router.use(function (req, res, next) {
  var sess = req.session;

  if (!sess.user) {
    res.json({ success: false, error: 'No session active' });
    return;
  }
  next();
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

    if (wish == null) {
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

    if (wish == null) {
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

    if (wish == null) {
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

router.put('/wish', function(req, res, next) {
  var sess = req.session;

  Wish.findOne({_id: req.body.id}, function (err, wish) {
    if (err) {
      console.error('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish == null) {
      res.json({ success: false, error: 'Wunsch nicht gefunden' });
      return;
    }

    if (wish.addedBy != sess.user.name && sess.user.isAdmin != true) {
      res.json({ success: false, error: 'Nicht genügend Rechte um Wunsch zu ändern' });
      return;
    }

    wish.for = req.body.for;
    wish.addedBy = req.body.addedBy;
    wish.text = req.body.text;
    wish.comment = req.body.comment;
    wish.price = req.body.price;
    wish.url = req.body.url;

    wish.save(function (err, w1) {
      if (err) {
        console.error(err);
        res.json({ success: false, error: err });
        return;
      }
    });

    console.log('Wish updated');

    res.json({
      success: true,
      wish: wish
    });
  });
});


router.post('/wish', function(req, res, next) {
  var sess=req.session, now = new Date();

  var wish = new Wish({
    for: req.body.for,
    addedBy: req.body.addedBy,
    text: req.body.text,
    comment: req.body.comment,
    boughBy: null,
    price: req.body.price,
    url: req.body.url,
    chippedIn: {},
    group: sess.user.group,
    addedAt: now
  });

  wish.save(function (err, w1) {
    if (err) {
      console.error(err);
      res.json({ success: false, error: err });
      return;
    }
  });

  console.log('Wish created');

  res.json({
    success: true,
    wish: wish
  });
});

router.delete('/wish', function(req, res, next) {
  var sess = req.session;

  Wish.findOne({_id: req.body.id}, function (err, wish) {
    if (err) {
      console.error('Error: ' + err);
      res.json({ success: false, error: err });
      return;
    }

    if (wish == null) {
      console.log('Wish not found for deletion');
      res.json({
        success: true
      });
    }

    if (wish.addedBy != sess.user.name && sess.user.isAdmin != true) {
      res.json({ success: false, error: 'Nicht genügend Rechte um Wunsch zu löschen'});
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
  var user = sess.user;

  console.log('Getting users');

  User.find({"group": user.group}).lean().select({'name': 1, 'imageUrl': 1}).exec(function (err, users) {
      if (err) {
        console.log('Error: ' + err);

        res.json({ success: false, error: err });
      }

      console.log('Found ' + users.length + ' users in group ' + user.group + ', getting wishes');

      Wish.find({"group": user.group}, function (err, wishes) {
        if (err) {
          console.log('Error: ' + err);
          res.json({ success: false, error: err });
        }

        spoilerfreeWishes = wishes.filter(function (wish) {
          var isForOtherAndNotArchived = wish.for != user.name && wish.archivedAt === undefined;
          var isOwnWish = wish.for === user.name && wish.addedBy === user.name;

          return isOwnWish || isForOtherAndNotArchived;
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

    if (wish == null) {
      res.json({ success: false, error: 'Wunsch nicht gefunden' });
      return;
    }

    var action = null;

    if (!wish.grabbedBy || wish.grabbedBy === undefined) {
      console.log('grapping');
      wish.grabbedBy = req.query.user;
      action = 'grabbed';
    } else if (wish.grabbedBy === req.query.user) {
      console.log('un-grapping');
      wish.grabbedBy = null;
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

module.exports = router;
