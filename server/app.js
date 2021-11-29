require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const sessionParser = require('./session');

const app = express();

app.use(logger('dev'));
app.use(cors({ credentials: true, origin: [process.env.CORS_ORIGIN] }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(sessionParser);

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const taskRouter = require('./routes/taskRouter');
const reportRouter = require('./routes/reportRouter');
const roomRouter = require('./routes/roomRouter');
const spinnerTimeout = require('./middleware/spinnerTimeout');

app.use('/api/users', spinnerTimeout, userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', spinnerTimeout, taskRouter);
app.use('/api/reports', spinnerTimeout, reportRouter);
app.use('/api/rooms', roomRouter);

app.use((req, res, next) => next(createError(404)));

module.exports = app;
