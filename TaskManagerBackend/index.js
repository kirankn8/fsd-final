const express = require('express');
const routes = require('./api/routes');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./config');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const app = express();

logger.info('Connecting with MongoDB: ' + config.mongodb);
mongoose.connect(config.mongodb, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    logger.info('MongoDB connection succesfully established')
});

//  Middlewares
app.use(session({
    key: 'e_session_cookie',
    secret: 'session_cookie_secret',
    resave: false,
    saveUninitialized: false
}));
app.use(morgan('common', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('session_cookie_secret'));
app.use(cors({
    origin: [
        "http://localhost:4200"
    ],
    credentials: true
}));

// Routes
app.use('/api', routes);

app.listen(config.serverport, () => {
    logger.info('Task Manager Backend is listening on port: ' + config.serverport)
});

module.exports = app;