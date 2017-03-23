var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


router.get('/volunteer', function (req, res){
  console.log('getting volunteer');
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function(err, client, done){
    client.query('SELECT * from volunteers WHERE email=$1',[userEmail], function(err, result){
      done();
      if(err){
        console.log('Error completing query', err);
        res.sendStatus(500);
      }else{
        res.send(result.rows);
      }
    });
  });
});

router.get('/skillList', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    client.query('SELECT * from skills', function(err, result){
      done();
      if(err){
        console.log('Error completing query', err);
        res.sendStatus(500);
      }else{
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});

router.get('/causeList', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    client.query('SELECT * from causes', function(err, result){
      done();
      if(err){
        console.log('Error completing query', err);
        res.sendStatus(500);
      }else{
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});


module.exports = router;
