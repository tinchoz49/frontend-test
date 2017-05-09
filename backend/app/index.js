const app = require('./server');
const pino = require('pino')();

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  pino.info('Events app listening at http://%s:%s', host, port);
});
