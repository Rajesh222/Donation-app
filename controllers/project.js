const uuidv4 = require('uuid/v4');

const Project = require('../models/Project');

exports.get = function (req, res) {
  Project.get(function (err, projects) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'projects retrieved successfully',
      projects: projects,
    });
  });
};
