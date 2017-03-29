var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');

//voluteer search query
router.get('/volunteer', function (req, res) {
  console.log('hit volunteer search route');
});

module.exports = router;
