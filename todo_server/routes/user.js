var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');


/* GET users listing. */
router.post('/', async function(req, res, next) {
  try {
    let result = await User.create(req.body);
    res.status(201).send({message: 'Usuário salvo com sucesso'});
  } catch(e) {
    res.status(500).send(e);
  }
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (info) {
        res.status(500).send(info);
      } else {
        user.token = jwt.sign({...user}, config.jwtSecret);
        res.send(user);
      }
    })(req, res)
});

router.put('/:id', async function(req, res, next) {
  try {
    let result = await User.update(req.params.id, req.body);
    res.status(201).send({user: result, message: 'User salvo com sucesso'});
  } catch(e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    let results = await User.find.by.id(req.params.id);
    res.status(200).send(results[0]);
  } catch(e) {
    res.status(500).send(e);
  }
})

module.exports = router;
