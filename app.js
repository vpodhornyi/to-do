const express = require("express");
const detect = require('detect-port');
const bodyParser = require('body-parser');
const conf = require('./config/server');
const index = require('./api/index/index');
const notes = require('./api/notes/notes');
const lists = require('./api/lists/lists');
const page404 = require('./api/404/404');

const app = express();
const port = conf.port;


app.use('/', express.static('assets'));
app.use('/notes', express.static('assets'));
app.use('/lists', express.static('assets'));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/', notes);
app.use('/', lists);
app.use('/', page404);


detect(port, (err, _port) => {
  if (err) {
    console.log(err);
  }

  if (port === _port) {
    app.listen(port, function () {
      console.log(`Server running on port - ${port}.`);
    });
  }
});


module.exports = app;