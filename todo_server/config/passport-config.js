var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;
JWTStrategy = passportJWT.Strategy;

var User = require('../models/user');
var bcrypt = require('bcrypt');
var config = require('./config');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function(email, password, done) {
    User.find.by.email(email).then((user) => {
      if (user.length == 0) {
        return done(null, false, { message: 'Email ou senha incorretos' });
      }
      if(!bcrypt.compareSync(password, user[0].password) ) {
        return done(null, false, { message: 'Email ou senha incorretos' });
      }
      return done(null, user[0]);
    }).catch(function(e) {
      return done(null, null, {message: e.message});
    });
    
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : config.jwtSecret
},
function (jwtPayload, done) {
  console.log(jwtPayload);
  return User.find.by.id(jwtPayload.id)
      .then(user => {
        return done(null, {id: user[0].id});
      })
      .catch(err => {
          return done(err);
      });
}
));