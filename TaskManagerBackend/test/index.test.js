var request = require('supertest');
var app = require('../index.js');

describe('GET /', function () {
    it('Test Health Check Point', function (done) {
        request(app).get('/api/').expect('The app is up and running!', done);
    });
});

describe('GET /users', function () {
    it('Get list of users', function (done) {
        request(app).get('/api/users').expect(200, done);
    });
});

describe('GET /projects', function () {
    it('Get list of projects', function (done) {
        request(app).get('/api/projects').expect(200, done);
    });
});
