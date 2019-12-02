var express = require('express');
var router = express.Router();
var Task = require('../models/task');


router.post('/', async function(req, res, next) {
  try {
    req.body.user_id = req.user.id;
    let result = await Task.create(req.body);
    res.status(201).send({task: result, message: 'Tarefa salva com sucesso'});
  } catch(e) {
    res.status(500).send(e);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let result = await Task.update(req.params.id, req.body);
    res.status(201).send({task: result, message: 'Tarefa salva com sucesso'});
  } catch(e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    let results = await Task.find.by.id(req.params.id);
    res.status(200).send(results[0]);
  } catch(e) {
    res.status(500).send(e);
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    let results = await Task.delete(req.params.id);
    console.log(results);
    res.status(200).send(results);
  } catch(e) {
    res.status(500).send(e);
  }
})

module.exports = router;