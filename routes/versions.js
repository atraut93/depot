var Version = require('../models/version'),
    Project = require('../models/project'),
    Parser = require('../parser'),
    express = require('express'),
    multiparty = require('multiparty'),
    path = require('path'),
    router = express.Router();

router.route('/projects/:projectId/versions')
  .get(function (req, res) {
    Project
      .findOne({ _id: req.params.projectId })
      .populate({ path: 'versions', model: 'Version' })
      .exec(function (err, project) {
        if (err) {
          return res.send(err);
        }
     
        res.json(project.versions);
      });
  })
  .post(function (req, res) {
    //TODO: Add version to project
    return;
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
      if (err) {
        return res.send(err);
      }

      //TODO: move apk to correct download location if parse is successful
      uploadedFile = files.upload[0];
      filePath = path.resolve(uploadedFile.path);

      if (!filePath || path.extname(filePath) !== '.apk') {
        return res.send({ error: 'You must upload an apk.' });
      }
      Parser.parseApk(filePath, fields.name, function (err, data) {
        if (err) {
          return res.send(err);
        }
        var version = new Version(data);
        version.save(function (err, ver) {
          if (err) {
            return res.send(err);
          }

          res.json(ver);
        })
      });
    });
  });

router.route('/projects/:projectId/versions/:versionId')
  .get(function (req, res) {
    Version.findOne({ _id: req.params.versionId }, function (err, version) {
      if (err) {
        return res.send(err);
      }

      res.json(version);
    })
  })
  .delete(function (req, res) {
    //TODO: remove version and delete associated apk from filesystem
  });

router.route('/projects/:projectId/versions/:versionId/releaseNotes')
  .post(function (req, res) {
    Version.findOne({ _id: req.params.versionId }, function (err, version) {
      if (err) {
        return res.send(err);
      }

      version.releaseNotes = req.body.notes;
      version.save(function (err, updatedVersion) {
        if (err) {
          return res.send(err);
        }

        res.json(updatedVersion);
      });
    })
  });

module.exports = router;
