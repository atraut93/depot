var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.route('/users')
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err) {
        return res.send(err);
      }

      res.json(users);
    })
  })
  .post(function (req, res) {
    var user = new User(req.body);

    user.save(function (err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'User Added Successfully'});
    });
  });

router.route('/users/:id')
  .get(function (req, res) {
    User.findOne({ _id: req.params.id}, function (err, user) {
      if (err) {
        return res.send(err);
      }

      res.json(user);
    });
  });

router.route('/users/authenticate')
  .post(function (req, res) {
    debugger;
    if (!req.body.email || !req.body.password) {
      return res.send({"error": "Email and password are required."});
    }

    User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
      if (err) {
        return res.send(err);
      }

      res.json(user);
    });
  });

module.exports = router;
