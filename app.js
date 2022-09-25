const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { notFoundController } = require('./controllers/notFoundController');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '632e261f157a94c41b41c765',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', notFoundController);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
