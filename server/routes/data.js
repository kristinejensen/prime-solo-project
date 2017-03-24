var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


router.get('/volunteer', function(req, res){
  console.log('getting volunteer');
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function(err, client, done){
    client.query('SELECT * FROM volunteers WHERE email=$1', [userEmail], function(err, result){
      done();
      if(err){
        console.log('Error completing query', err);
      // }else if(result.rows.length == 0){
      //   pg.connect(connectionString, function(err, client, done){
      //     client.query('INSERT INTO volunteers (email) VALUES $1', [userEmail], function(err, result){
      //       done();
      //       res.send(result.rows[0]);
      //     });
      //   });
      }else{
        res.send(result.rows[0]);
      } // end of if statement
    }); //end of client.query1
  }); //end of pg.connect 1
}); //end of router.get


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

router.delete('/volunteer/aboutMe/:id', function(req, res){
  var volunteerId = req.params.id;
  console.log('Deleting about me for volunteer id: ', volunteerId);
});


module.exports = router;
