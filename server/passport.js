const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./configuration');
const User = require('./models/user');


//Passport will get the token from JWT_SECRET and decode it 
//JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
   secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        //find the users specified in token
        const user = await User.findById(payload.sub);
        //If user doesn't exist, handle it
        if (!user) {
            return done(null, false);
        }
        //Else, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

//GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
        try {
              console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        //Check if current user exists in database, check entire collection
      const existingUser = await User.findOne({ "google.id": profile.id });
            if (existingUser) {
                console.log('User exists in db');
            return done(null, existingUser);
            }
            console.log('user doesnt exist, creating a new one');
            //If new account
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        await newUser.save();
        done(null, newUser);
        } catch (error) {
            done(error, false, error.message);
        } 
}));


//FACEBOOK OAUTH STRATEGY
passport.use('facebookToken', new FacebookTokenStrategy({
   clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
        try {
              console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        //Check if current user exists in database, check entire collection
       const existingUser = await User.findOne({ "facebook.id": profile.id });
            if (existingUser) {
                console.log('User exists in db');
            return done(null, existingUser);
            }
            console.log('user doesnt exist, creating a new one');
            //If new account
        const newUser = new User({
            method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
        });
        await newUser.save();
        done(null, newUser);
        } catch (error) {
            done(error, false, error.message);
        } 
}));



//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
                    
        //find the user given email
        const user = await User.findOne({ "local.email": email });
        //If not, handle it
        if (!user) {
            return done(null, false);
        }
        //If user found, check if the pwd is correct
        const isMatch = await user.isValidPassword(password);
       

        //If not, handle it
        if (!isMatch) {
            return done(null, false);
        }
        //else, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }

}
));
