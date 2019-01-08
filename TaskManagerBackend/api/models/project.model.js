var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    project: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: +new Date() + 24 * 60 * 60 * 1000 },
    priority: { type: Number, min: 0, max: 30, required: true },
    manager: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    parentTasks: [{
        parentTask: { type: String, required: true },
        childTasks: [{
            task: { type: String, required: true },
            startDate: { type: Date, default: Date.now },
            endDate: { type: Date, default: +new Date() + 24 * 60 * 60 * 1000 },
            priority: { type: Number, min: 0, max: 30, required: true },
            status: { type: String, enum: ['Start', 'Complete'], default: 'Start' },
            user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
        }],
    }],
});

module.exports = mongoose.model('Project', projectSchema);