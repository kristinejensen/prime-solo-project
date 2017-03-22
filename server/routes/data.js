var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


router.get('/volunteer', function (req, res){
  console.log('getting skills');
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function(err, client, done){
    client.query('SELECT * from volunteers WHERE email=$1',[userEmail], function(err, result){
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
