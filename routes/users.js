var User = require('../models/user'),
    Project = require('../models/project'),
    express = require('express'),
    router = express.Router();

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

      res.send({ message: 'User Added Successfully' });
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
  })
  .delete(function (req, res)  {
    User.remove({ _id: req.params.id }, function (err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'User deleted successfully' })
    });
  });

router.route('/users/:userId/projects')
  .get(function (req, res) {
    User
      .findOne({ _id: req.params.userId })
      .populate({ path: 'projects', model: 'Project' })
      .exec(function (err, user) {
        if (err) {
          return res.send(err);
        }

        res.json(user.projects);
      });
  })
  .post(function (req, res) {
    User.findOne({ _id: req.params.userId }, function (err, user) {
      if (err) {
        return res.send(err);
      }

      if(req.body.projectId) {
        Project.findOne({ _id: req.body.projectId }, function (err, project) {
          if (err) {
            return res.send(err);
          }

          if (user.projects.indexOf(req.body.projectId) != -1) {
            return res.json(user);
          }

          user.projects.push(req.body.projectId);
          user.save(function (err, updatedUser) {
            if (err) {
              return res.send(err);
            }

            res.json(updatedUser);
          })
        })
      } else {
        return res.send({ error: 'A projectId must be specified in the post body.' })
      }
    })
  });

router.route('/users/:userId/projects/:projectId')
  .delete(function (req, res) {
    var removeIndex;
    User.findOne({ _id: req.params.userId }, function (err, user) {
      if (err) {
        return res.send(err);
      }

      removeIndex = user.projects.indexOf(req.params.projectId);
      if (removeIndex != -1) {
        user.projects.splice(removeIndex, 1);
        user.save(function (err, user) {
          if (err) {
            return res.send(err);
          }

          res.json(user);
        })
      }
    });
  });

router.route('/users/authenticate')
  .post(function (req, res) {
    if (!req.body.email || !req.body.password) {
      return res.send({ error: 'Email and password are required.' });
    }

    User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
      if (err) {
        return res.send(err);
      }

      res.json(user);
    });
  });

module.exports = router;
