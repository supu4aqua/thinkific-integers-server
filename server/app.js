const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const mongoPath = //process.env.DATABASE_URL;
  'mongodb://mongo-users:2pF8CcARdXybOKaJ@thinkific-users-mongodb-shard-00-00.pw95m.mongodb.net:27017,thinkific-users-mongodb-shard-00-01.pw95m.mongodb.net:27017,thinkific-users-mongodb-shard-00-02.pw95m.mongodb.net:27017/UserAuthentication?ssl=true&replicaSet=atlas-3ztqu7-shard-0&authSource=admin&retryWrites=true&w=majority'
  
//'mongodb+srv://mongo-users:2pF8CcARdXybOKaJ@thinkific-users-mongodb.pw95m.mongodb.net/ThinkificUsers?retryWrites=true&w=majority&ssl=true'



//mongoose.Promise = global.Promise;
try {
  mongoose.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connection successful');
} catch (error) { handleError(error); }
  /*  .then(() => {
        console.log('start');
    })
    .catch(err => {
        console.error('App starting error:', err.stack);
        process.exit(1)
    }); */

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