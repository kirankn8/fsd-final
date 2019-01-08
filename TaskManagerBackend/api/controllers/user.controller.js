const userSchema = require('../models/user.model');
const logger = require('../../logger');

exports.list_users = function (req, res) {
    userSchema.find({}, function (err, users) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        res.json(users);
    });
}

exports.get_user = function (req, res) {
    userSchema.findById(req.params.id, function (err, docs) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        res.json(docs);
    });
}

exports.save_user = function (req, res) {
    var userInstance = new userSchema(req.body);
    userInstance.save(function (err, user) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        res.status(201).json(user);
    });
}

exports.update_user = function (req, res) {
    userSchema.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, user) => {
            if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
            return res.json(user);
        }
    );
}

exports.delete_user = function (req, res) {
    userSchema.findByIdAndDelete(req.params.id, function (err, user) {
        if (err) { logger.error(err); res.status(500).json({ msg: 'Something broke!', err: err }); }
        res.json(user);
    });
}