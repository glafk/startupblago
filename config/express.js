const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const express = require('express');

module.exports = function (app) {
  app.use(body_parser());
  app.use(cookie_parser());
  app.set('view engine', 'jade');
  app.set('views', './views');
  app.use(express.static('./public/'))
}
