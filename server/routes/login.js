var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var userEmail = req.decodedToken.email;
    // Check the user's level of permision based on their email
    client.query('SELECT * FROM volunteers', function(err, results){
      done();
      if(err){
        console.log('Error completing query', err);
        res.sendStatus(500);
      }else{
        res.send(results.rows);
      }
    });
  })
});

module.exports = router;
