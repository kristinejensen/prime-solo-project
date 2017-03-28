var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');

//populates skills drop down list
router.get('/skillList', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM skills', function (err, result) {
      done();
      if (err) {
        console.log('Error completing query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

//populates causes drop down list
router.get('/causeList', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM causes', function (err, result) {
      done();
      if (err) {
        console.log('Error completing cause list query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

module.exports = router;
