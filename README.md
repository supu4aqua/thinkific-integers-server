## Notes
### Front End
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Axios](https://www.npmjs.com/package/react-axios)

### Back End
* [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

### Production
* [Heroku](https://www.heroku.com/)
* [Vercel](https://vercel.com/)



## Date
Feb 3, 2020

## Location of deployed application
App - <a href="https://user-integers.vercel.app/" target="_blank">https://user-integers.vercel.app/</a>
Backend/Server -  <a href="https://user-integers-api.herokuapp.com" target="_blank">https://user-integers-api.herokuapp.com</a>

## Time spent
7-8 hours. Apart from implementing, this includes setting up the local environment with MongoDB and Node, deploying the app to heroku and vercel. Also spent some time reviewing the OAuth Implementation.

## Assumptions made
- Made assumptions for API endpoints, Database name, Deployed application name, Database selection (MongoDB), Database table columns and their data type
- Current Integer is named 'current_integer' in database
- App will return current integer when user logs in

## Shortcuts/Compromises made
Yes
- All work is done over master branch. As best practices, work should be done in seperate branch each time and then deployed to master branch.
- Used bootstrap to style the app
- Test cases not created

## Stretch goals attempted
Local authentication is working and returns current integer when user sign in. 
Tried OAuth with Facebook and Google from client. Results are not consistent and need some work.
Though it works fine when using your own generated token for FB and Google and tested with the API on Postman.

## Instructions to run assignment locally
-Client Installation
* Clone this repository:
    * `git clone https://github.com/supu4aqua/thinkific-integers-client.git`
* Move into folder:
    * `cd thinkific-integers-client/`
* Run `npm install`
* Run `npm start`
* Rename .env.sample to .env
* Set environemnt variables in .env file
* In browser, navigate to `localhost:3000` or your specified port

-Server Installation
* You will need these programs installed
    * [Git](https://git-scm.com/)
    * [Node.js](https://nodejs.org/en/)
    * [npm](https://www.npmjs.com/)
    * [MongoDB](https://www.mongodb.com/)
* You can also create a cluster at https://www.mongodb.com/ instead of installing MongoDb on local system
* Clone this repository:
    * `git clone https://github.com/supu4aqua/thinkific-integers-server.git`
* Move into folder:
    * `cd thinkific-integers-server/`
* Run `npm install`
* Rename .env.sample to .env
* Set environemnt variables in .env file
* Run `npm start` (or `npm run dev` to run with nodemon which auto-restarts on save changes)

## What did you not include in your solution that you want us to know about?
I couldn't complete the Facebook and Google OAuth from client side. I need to learn OAuth more to fix it.

## Other information about your submission that you feel it's important that we know if applicable.
It's written in Notes section above.

## Your feedback on this technical challenge
Assignment was well explained and documented.

### API Overview
```
.
├── /users/signup
│   └── POST
│       └── /
├── /users/oauth/google
│   └── POST
│       └── /
├── /users/oauth/facebook
│   └── POST
│       └── /
├── /users/signin
│   └── POST
│       └── /
├── /users/v1/current
│   └── GET
│       ├── /
│   └── PUT
│       └── ?current_integer=
├── /users/v1/next
│   └── GET
│       ├── /
