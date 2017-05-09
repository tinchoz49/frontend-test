const fs = require('fs');
const pify = require('pify');
const readdir = pify(fs.readdir);
const readFile = pify(fs.readFile);
const writeFile = pify(fs.writeFile);
const path = require('path');
const eventsDir = path.join(__dirname, 'events');

function _getEvent(eventsDir, fileName) {
  return readFile(path.join(eventsDir, fileName)).then(JSON.parse);
}

function findAll () {
  return readdir(eventsDir)
    .then(events => {
      const list = events.map(fileName => _getEvent(eventsDir, fileName));
      return Promise.all(list);
    });
}

function finById (id) {
  return readdir(eventsDir)
    .then(events => {
      return events.find(fileName => fileName === `${id}.json`);
    })
    .then(fileName => {
      if (fileName) {
        return _getEvent(eventsDir, fileName);
      }

      return false;
    });
}

function create (event) {
  return lastId()
    .then(id => {
      event.id = id + 1;
      const jsonEvent = JSON.stringify(event);
      return writeFile(path.join(eventsDir, `${event.id}.json`), jsonEvent)
        .then(() => event);
    });
}

function featured () {
  return findAll()
    .then(events => {
      return events.filter(event => event.id % 2 === 0);
    });
}

function lastId () {
  return readdir(eventsDir)
    .then(events => {
      return events.map(fileName => Number(fileName.split('.')[0]));
    })
    .then(events => events.sort((a, b) => b > a)[0]);
}

module.exports = {
  findAll: findAll,
  finById: finById,
  featured: featured,
  create: create
};
