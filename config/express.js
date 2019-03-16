const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');

module.exports = function (app) {
  app.use(body_parser());
  app.use(cookie_parser());
}
