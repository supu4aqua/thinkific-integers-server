const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const mongoPath = process.env.DATABASE_URL;

//mongoose.Promise = global.Promise;
try {
  mongoose.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connection successful');
} catch (error) { handleError(error); }

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

app.get('/', (req, res) => { res.send('Hello from Express!')

module.exports = app;