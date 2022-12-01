require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, errors, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/users');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { notFoundController } = require('./controllers/notFoundController');
const auth = require('./middlewares/auth');
// const cors = require('./middlewares/cors');
const { REGEX, SERVER_ERROR_CODE } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

// app.use(cors);
const allowedCors = [
  'https://olgatovstaya.mesto.nomoredomains.club',
  'http://olgatovstaya.mesto.nomoredomains.club',
  'http://localhost:3000',
];

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX),
  }),
}), createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', notFoundController);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === SERVER_ERROR_CODE ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
