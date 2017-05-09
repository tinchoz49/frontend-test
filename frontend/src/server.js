import express from 'express';
import fs from 'fs';
import pino from 'pino';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterProvider } from 'react-router5';
import { default as baseRouter } from './router';
import App from './components/app';
import Main from './components/main';
import { toJS } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import jsonStringifySafe from 'json-stringify-safe';
import EventStore from './stores/event-store';
import UiStore from './stores/ui-store.js';

useStaticRendering(true);

const app = express();
const log = pino();

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.get('*', (req, res, next) => {
  const eventStore = EventStore();
  const uiStore = UiStore();

  const router = baseRouter.clone();

  router.start(req.originalUrl, function done(error, state) {
    if (error) {
      log.error(error);
      res.status(500).send(error);
      return;
    }

    log.info(state);

    const fetchData = Main.components[state.name].fetchData(eventStore, state.params);
    const readTpl = new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname,'../build/index.html'), 'utf8', function(err, text){
        if (err) {
          reject(err);
        } else {
          resolve(text);
        }
      });
    });

    Promise
      .all([readTpl, fetchData])
      .then((results) => {
        let html = results[0];

        const vdom = renderToString(
          <RouterProvider router={ router }>
            <App eventStore={ eventStore } uiStore={ uiStore }/>
          </RouterProvider>
        );

        html = html.replace('__SSR', vdom);
        html = html.replace('window.__STATE', `window.__STATE = ${jsonStringifySafe(toJS(eventStore, true))};`);

        res.send(html);
      })
      .catch(err => {
        if (err.message === 'redirect') {
          res.redirect('/');
          return;
        }
        next();
      });
  });
});

const server = app.listen(process.env.PORT || 3001, () => {
  const host = server.address().address;
  const port = server.address().port;

  log.info('Universal app listening at http://%s:%s', host, port);
});
