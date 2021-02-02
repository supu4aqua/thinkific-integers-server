const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    //iss: 'Thinkific',
    sub: user.id,
    iat: new Date().getTime(), // current time
    expiresIn: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  //SIGN UP
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password
      }
    });

    await newUser.save();

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  },

  //SIGN IN
  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  //GOOGLE AUTHENTICATION
  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  //FACEBOOK AUTHENTICATION
  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

 //TO VALIDATE IF TOKEN IS VALID OR NOT
  secret: async (req, res, next) => {
    res.json({ secret: "resource" });
  },

  //CURRENT INTEGER
  getCurrent: async (req, res, next) => {
    res.json({ current_integer: req.user.current_integer });
  },

  //NEXT INTEGER
  getNext: async (req, res, next) => {
    var myquery = { _id: req.user._id };
    var newvalues = { $set: { current_integer: req.user.current_integer + 1 } };
    User.updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
    });
    res.json({ next_integer: req.user.current_integer + 1});
  },

  //RESET INTEGER
  reset: async (req, res, next) => {
    var myquery = { _id: req.user._id };
    var newvalues = { $set: req.query };
    User.updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
    });
    res.json(req.query);
  }
}
