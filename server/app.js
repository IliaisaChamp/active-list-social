require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');

const sessionParser = require('./session');

const app = express();

app.use(logger('dev'));
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(sessionParser);

const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const taskRouter = require('./routes/taskRouter');

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.use((req, res, next) => next(createError(404)));

const server = http.createServer(app);

module.exports = server;
