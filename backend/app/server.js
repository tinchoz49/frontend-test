const db = require('./db');
const schema = require('./db/schema');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validate = require('express-jsonschema').validate;
const app = express();
const log = require('pino')();

app.disable('x-powered-by');

app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  log.info(req);
  next();
});

app.get('/events', function (req, res, next) {
  db
    .findAll()
    .then(events => res.json({ events }))
    .catch(next);
});

app.get('/events/featured', function (req, res, next) {
  db
    .featured()
    .then(events => res.json({ events }))
    .catch(next);
});

app.get('/events/:id', function (req, res, next) {
  db
    .finById(req.params.id)
    .then(event => {
      if (event) {
        res.json({event: event});
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
});

app.post('/events', validate({ body: schema }), function (req, res, next) {
  if (!req.body.event) {
    return res.sendStatus(400);
  }

  db
    .create(req.body.event)
    .then(event => res.json({ event }))
    .catch(next);
});

module.exports = app;
