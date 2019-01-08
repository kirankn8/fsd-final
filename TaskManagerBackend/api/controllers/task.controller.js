const projectSchema = require('../models/project.model');
const logger = require('../../logger');

exports.set_project_parenttask = function (req, res) {
    projectSchema.findByIdAndUpdate(req.params.id, { $push: { parentTasks: req.body } }, { new: true }
        , function (err, proj) {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            res.status(201).json(proj);
        });
}

exports.update_project_parenttask = function (req, res) {
    projectSchema.update(
        { "_id": req.params.id, "parentTasks._id": req.params.parentTaskId },
        {
            "$set": {
                "parentTasks.$.parentTask": req.body.parentTask,
            }
        },
        { new: true },
        function (err, docs) {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            res.json(docs);
        }
    );
}

exports.delete_project_parenttask = function (req, res) {
    projectSchema.findById(req.params.id, function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        proj.parentTasks.id(req.params.parentTaskId).remove();
        proj.save(function (err) {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            res.json(proj);
        });
    });
}

exports.set_project_parent_childtask = function (req, res) {
    projectSchema.update(
        { "_id": req.params.id, "parentTasks._id": req.params.parentTaskId },
        {
            "$push": {
                "parentTasks.$.childTasks": req.body
            }
        },
        { new: true },
        function (err, docs) {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            res.status(201).json(docs);
        }
    );
}

exports.update_project_parent_childtask = function (req, res) {
    projectSchema.findById(req.params.id, function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        var childTask = proj.parentTasks.id(req.params.parentTaskId).childTasks.id(req.params.childTaskId);
        childTask.set(req.body);
        proj.save(function (err) {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            res.json(proj);
        });
    });
}

exports.delete_project_parent_childtask = function (req, res) {
    projectSchema.findById(req.params.id, function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        proj.parentTasks.id(req.params.parentTaskId).childTasks.id(req.params.childTaskId).remove();
        proj.save(function (err) {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            res.json(proj);
        });
    });
}

exports.mark_project_task_completed = function (req, res) {
    projectSchema.findById(req.params.id, function (err, proj) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        var childTask = proj.parentTasks.id(req.params.parentTaskId).childTasks.id(req.params.childTaskId);
        childTask.status = 'Complete';
        proj.save(function (err) {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            res.json(proj);
        });
    });
}