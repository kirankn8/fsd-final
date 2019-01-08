const projectSchema = require('../models/project.model');
const logger = require('../../logger');

exports.list_projects = function (req, res) {
    projectSchema.find({}).populate('manager parentTasks.childTasks.user').exec(function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        res.json(proj);
    });
}

exports.get_project = function (req, res) {
    projectSchema.findById(req.params.id, function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        res.json(proj);
    });
}

exports.save_project = function (req, res) {
    var projectInstance = new projectSchema(req.body);
    projectInstance.save(function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        res.status(201).json(proj);
    });
}

exports.update_project = function (req, res) {
    projectSchema.findById(req.params.id, function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        proj.project = req.body.project;
        proj.startDate = req.body.startDate;
        proj.endDate = req.body.endDate;
        proj.priority = req.body.priority;
        proj.manager = req.body.manager;
        proj.save(function (err, proj) {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            res.json(proj);
        });
    });
}

exports.delete_project = function (req, res) {
    projectSchema.findByIdAndDelete(req.params.id, function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        res.json(proj);
    });
}