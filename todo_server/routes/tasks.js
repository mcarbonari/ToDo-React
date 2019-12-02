var express = require('express');
var router = express.Router();
var Task = require('../models/task');

router.get('/', async function(req, res, next){
  try {
    let results = await Task.getAll(req.user.id);
    res.status(200).send(results);
  } catch(e) {
    res.status(500).send(e);
  }
});




module.exports = router;