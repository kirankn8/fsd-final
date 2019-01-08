var request = require('supertest');
var app = require('../index.js');
var projectId;
var project;

describe('POST /project', function () {
    it('Create project with empty req', function (done) {
        request(app).post('/api/project').expect(500, done);
    });
});

describe('get /project/:id', function () {
    it('Get project which does not exist', function (done) {
        request(app).post('/api/project/5c1a9255329f8431447bfc62').expect(404, done);
    });
});

describe('POST /project', function () {
    it('Create new project', function (done) {
        request(app).post('/api/project')
            .send({
                endDate: +new Date() + 24 * 60 * 60 * 1000,
                project: "Test Project",
                startDate: Date.now,
                priority: 23,
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                projectId = res.body._id;
                done();
            });
    });
});

describe('GET /project/:id', function () {
    it('Get existing project', function (done) {
        request(app).get('/api/project/' + projectId)
            .expect(200, done);
    });
});

describe('GET illegal /project/:id', function () {
    it('Get project with illegal id', function (done) {
        request(app).get('/api/project/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});

describe('PUT /project/:id', function () {
    it('Modify existing project', function (done) {
        request(app).put('/api/project/' + projectId)
            .send({
                endDate: +new Date() + 24 * 60 * 60 * 1000,
                project: "Test Project1",
                startDate: Date.now,
                priority: 30,
            })
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

describe('PUT illegal /project/:id', function () {
    it('Modify existing project with illegal object', function (done) {
        request(app).put('/api/project/' + projectId)
            .send({
                project: { a: 3 },
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('POST /project/:id/task', function () {
    it('Add new parentTask', function (done) {
        request(app).post('/api/project/' + '1212131' + '/task')
            .send()
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                done();
            });
    });
});

describe('POST /project/:id/task', function () {
    it('Add new parentTask', function (done) {
        request(app).post('/api/project/' + projectId + '/task')
            .send({
                parentTask: 'Parent Task1',
                childTasks: []
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                project = res.body;
                done();
            });
    });
});

describe('PUT /project/:id/task', function () {
    it('Update existing parentTask', function (done) {
        request(app).put('/api/project/' + projectId + '/task/' + project.parentTasks[0]._id)
            .send({
                parentTask: 'Parent Task4',
                childTasks: []
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                project = res.body;
                done();
            });
    });
});

describe('GET /project/:id', function () {
    it('Get existing project', function (done) {
        request(app).get('/api/project/' + projectId)
            .expect(200, function (err, res) {
                project = res.body;
                console.log(project);
                done();
            });
    });
});

describe('POST /project/:id/task/:parentTaskId', function () {
    it('Add child task for parentTask', function (done) {
        request(app).post('/api/project/' + projectId + '/task/' + project.parentTasks[0]._id)
            .send({
                task: 'New Task',
                startDate: Date.now,
                endDate: +new Date() + 24 * 60 * 60 * 1000,
                priority: 19,
                user: null,
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                project = res.body;
                console.log(project);
                done();
            });
    });
});

describe('GET /project/:id', function () {
    it('Get existing project', function (done) {
        request(app).get('/api/project/' + projectId)
            .expect(200, function (err, res) {
                project = res.body;
                console.log(project);
                done();
            });
    });
});

describe('PUT /project/:id/task/:parentTaskId/child/:childTaskId', function () {
    it('Update child task for parentTask', function (done) {
        request(app)
            .put('/api/project/' + projectId + '/task/' + project.parentTasks[0]._id + '/child/' + project.parentTasks[0].childTasks[0]._id)
            .send({
                task: 'Update New Task',
                startDate: Date.now,
                endDate: +new Date() + 24 * 60 * 60 * 1000,
                priority: 1,
                user: null,
            })
            .set('Accept', 'application/json')
            .expect(200, function (err, res) {
                project = res.body;
                console.log(project);
                done();
            });
    });
});

describe('PUT /project/:id/task/:parentTaskId/child/:childTaskId/completed', function () {
    it('Mark child task as completed', function (done) {
        request(app)
            .put('/api/project/' + projectId + '/task/' + project.parentTasks[0]._id + '/child/' + project.parentTasks[0].childTasks[0]._id + '/completed')
            .send({})
            .set('Accept', 'application/json')
            .expect(200, function (err, res) {
                project = res.body;
                console.log(project);
                done();
            });
    });
});

describe('DELETE /project/:id/task/:parentTaskId/child/:childTaskId', function () {
    it('Delete existing child task of parent task', function (done) {
        request(app).delete('/api/project/' + projectId + '/task/' + project.parentTasks[0]._id + '/child/' + project.parentTasks[0].childTasks[0]._id)
            .expect(200, done);
    });
});

describe('DELETE /project/:id/task/:parentTaskId', function () {
    it('Delete existing parent task of a project', function (done) {
        request(app).delete('/api/project/' + projectId + '/task/' + project.parentTasks[0]._id)
            .expect(200, done);
    });
});

describe('DELETE /project/:id', function () {
    it('Delete existing project', function (done) {
        request(app).delete('/api/project/' + projectId)
            .expect(200, done);
    });
});

describe('DELETE illegal /project/:id', function () {
    it('Delete non-existing project', function (done) {
        request(app).delete('/api/project/' + 'projectId')
            .expect(500, done);
    });
});