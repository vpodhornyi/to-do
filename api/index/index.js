const express = require("express");
const db = require('../../db/db');
const conf = require('../../config/server');

const router = express.Router();

router.get("/", async function (request, res) {
  const notesArr = await db.findMany(conf.database.dbName, conf.database.collectionNotes);
  const listsArr = await db.findMany(conf.database.dbName, conf.database.collectionLists);

  res.render('index', { notesArr, listsArr });
});

module.exports = router;