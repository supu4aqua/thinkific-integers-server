const User = require('../models/user');
module.exports = {
    signUp: async (req, res, next) => { 
        const { email, password } = req.value.body;

        //check if user exists
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).send({ erro: 'Email already exists' })
        }

        //Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        //Respond with token
        res.json({ user: 'created' });
    },
    signIn: async (req, res, next) => {
        //Generate token
        console.log('UsersController.signIn() called!');    
    },
    secret: async (req, res, next) => {
        console.log('UsersController.secret() called!');    
    }
}