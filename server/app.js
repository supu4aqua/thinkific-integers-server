const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoPath = 'mongodb+srv://mongo-users:2pF8CcARdXybOKaJ@thinkific-users-mongodb.pw95m.mongodb.net/<dbname>?retryWrites=true&w=majority'

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(mongoPath, { useNewUrlParser: true , useUnifiedTopology: true});


const app = express();
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

module.exports = app;