var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let results = await User.getAll();
    res.status(200).send(results);
  } catch(e) {
    res.status(500).send(e);
  }
});

module.exports = router;
