// config/database.js
var host = 'localhost';
var sleep = 1000;
var timer;
var dbname = 'uwO3mypu';
var mongoose = require('mongoose');
var db = mongoose.createConnection();

db.on('error', function () {
  // error on startup
  console.error('conn error will retry', arguments);

  // limit our retries
  connect.time += sleep;
  if (connect.time > 10000) return console.error('giving up');
  db.db.close();
  timer = setTimeout(connect, sleep);
});

db.on('open', function () {
  clearTimeout(timer);
  console.error('opening');
});

db.on('connected', function () {
  console.error('connected to th db');
});

function connect () {
  console.error("calling db.open");
  db.open(host,dbname);
}
connect.time = 0;
connect();

module.exports.db = db;