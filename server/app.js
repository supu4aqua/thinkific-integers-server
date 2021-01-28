const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/UserAuthentication',
  { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true });

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));

module.exports = app;

