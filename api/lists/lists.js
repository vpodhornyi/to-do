const express = require("express");
const db = require('../../db/db');
const conf = require('../../config/server');
const isValid = require('../../validation/is-valid');
const listsSchema = require('../../validation/schemas/lists');

const router = express.Router();

router.get("/lists", async function (request, res) {
  res.render('lists-create', {
    title: 'Create Lists',
    content: ''
  })
});

router.get("/lists/:id", async function (req, res, next) {
  const lists = await db.findOne(req.params.id, conf.database.dbName, conf.database.collectionLists);

  if (lists)
    res.render('lists-show', { lists: lists });
  else
    next();
});

router.post("/api/lists",
  isValid(listsSchema),
  async function (req, res) {
    const id = await db.insertOne(conf.database.collectionLists, req.body);

    if (id)
      res.send({ type: 'success', message: 'Lists have been saved!', id: id });
    else
      res.status(500).send({ type: 'error', message: 'Something broke!' });
  });

router.put("/api/lists/:id",
  isValid(listsSchema),
  async function (req, res) {
    const data = await db.updateOne(req.params.id, conf.database.dbName, conf.database.collectionLists, req.body);

    if (data)
      res.send({ type: 'success', message: 'Lists have been updated!' });
    else
      res.status(500).send({ type: 'error', message: 'Something broke!' });
  });

router.delete("/api/lists/:id", async function (req, res) {
  const data = await db.deleteOne(req.params.id, conf.database.dbName, conf.database.collectionLists);

  if (data)
    res.send({ type: 'success', message: 'Lists have been deleted!' });
  else
    res.status(500).send({ type: 'error', message: 'Something broke!' });
});

module.exports = router;