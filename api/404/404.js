const express = require("express");

const router = express.Router();

router.use("*", function (req, res) {
  res.status(404).render('404');
});


module.exports = router;