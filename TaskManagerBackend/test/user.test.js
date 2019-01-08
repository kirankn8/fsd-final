var request = require('supertest');
var app = require('../index.js');
var userId;

describe('POST /user', function () {
    it('Create user with empty req', function (done) {
        request(app).post('/api/user').expect(500, done);
    });
});

describe('get /user/:id', function () {
    it('Get user which does not exist', function (done) {
        request(app).post('/api/user/5c1a9255329f8431447bfc62').expect(404, done);
    });
});

describe('POST /user', function () {
    it('Create new user', function (done) {
        request(app).post('/api/user')
            .send({
                firstName: 'Sample First Name',
                lastName: 'Sample Last Name',
                employeeId: '112121',
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                userId = res.body._id;
                done();
            });
    });
});

describe('GET /user/:id', function () {
    it('Get existing user', function (done) {
        request(app).get('/api/user/' + userId)
            .expect(200, done);
    });
});

describe('GET illegal /user/:id', function () {
    it('Get user with illegal id', function (done) {
        request(app).get('/api/user/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});

describe('PUT /user/:id', function () {
    it('Modify existing user', function (done) {
        request(app).put('/api/user/' + userId)
            .send({
                firstName: 'Sample First Name1',
                lastName: 'Sample Last Name1',
                employeeId: '11212112121',
            })
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

describe('PUT illegal /user/:id', function () {
    it('Modify existing user with illegal object', function (done) {
        request(app).put('/api/user/' + userId)
            .send({
                firstName: { a: 3 },
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('DELETE /user/:id', function () {
    it('Delete existing user', function (done) {
        request(app).delete('/api/user/' + userId)
            .expect(200, done);
    });
});