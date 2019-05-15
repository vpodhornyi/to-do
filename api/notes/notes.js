const express = require("express");
const db = require('../../db/db');
const conf = require('../../config/server').database;
const isValid = require('../../validation/is-valid');
const notesSchema = require('../../validation/schemas/notes');

const router = express.Router();

router.get('/notes', function (req, res) {
  res.render('notes-create', {
    title: 'Create Notes',
  })
});

router.get("/notes/:id", async function (req, res, next) {

  const notes = await db.findOne(req.params.id, conf.dbName, conf.collectionNotes);

  if (notes)
    res.render('notes-show', { notes });
  else
    next();
});

router.post("/api/notes",
  isValid(notesSchema),
  async function (req, res) {

    const id = await db.insertOne(conf.collectionNotes, req.body);

    if (id)
      res.send({ type: 'success', message: 'Notes have been saved!', id: id });
    else
      res.status(500).send({ type: 'error', message: 'Something broke!' });
  });


router.put("/api/notes/:id",
  isValid(notesSchema),
  async function (req, res) {

    const data = await db.updateOne(req.params.id, conf.dbName, conf.collectionNotes, req.body);

    if (data)
      res.send({ type: 'success', message: 'Notes have been updated!' });
    else
      res.status(500).send({ type: 'error', message: 'Something broke!' });
  });

router.delete("/api/notes/:id", async function (req, res) {

  const data = await db.deleteOne(req.params.id, conf.dbName, conf.collectionNotes);

  if (data)
    res.send({ type: 'success', message: 'Notes have been deleted!' });
  else
    res.status(500).send({ type: 'error', message: 'Something broke!' });
});

module.exports = router;