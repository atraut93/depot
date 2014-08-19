var Project = require('../models/project'),
    User = require('../models/user'),
    express = require('express'),
    router = express.Router();

router.route('/projects')
  .get(function (req, res) {
    Project.find(function (err, projects) {
      if (err) {
        return res.send(err);
      }

      res.json(projects);
    });
  })
  .post(function (req, res) {
    var project = new Project(req.body);

    project.save(function (err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Project Added Successfully'});
    });
  });

router.route('/projects/:id')
  .get(function (req, res) {
    Project.findOne({ _id: req.params.id }, function (err, project) {
      if (err) {
        return res.send(err);
      }

      res.json(project);
    });
  })
  .delete(function (req, res) {
    //TODO: cascade deletion of all associated versions
    Project.remove({ _id: req.params.id }, function (err) {
      if (err) {
        return res.send(err);
      }
   
      res.send({ message: 'Successfully deleted' });
    });
  });

module.exports = router;
