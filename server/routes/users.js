const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

//API Endpoints

  
router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

router.route('/v1/current')
    .get(passportJWT, UsersController.getCurrent);
  
router.route('/v1/next')
  .get(passportJWT, UsersController.getNext);

  router.route('/v1/current')
  .put(passportJWT, UsersController.reset);
    
module.exports = router;