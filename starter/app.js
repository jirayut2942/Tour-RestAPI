const { resolveSoa } = require('dns');
const express = require('express');
const { Module } = require('module');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRouter');
const usersRouter = require('./routes/userRouter');

// Middleware
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'deverlopment') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
