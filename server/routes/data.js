var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


//populates volunteer profile with existing user data || adds a new user to the db
router.get('/volunteer', function(req, res){
  console.log('getting volunteer');
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function(err, client, done){
    client.query('SELECT * FROM volunteers WHERE email=$1', [userEmail], function(err, result){
      done();
      if(err){
        console.log('Error completing query', err);
        res.sendStatus(500);
      }else if(result.rows.length == 0){
        pg.connect(connectionString, function(err, client, done){
          client.query('INSERT INTO volunteers (email) VALUES ($1)', [userEmail], function(err, result){
            done();
            if(err){
              console.log('Error inserting new volunteer user', err);
              res.sendStatus(500);
            }else{
              res.send({email: userEmail});
            }
          });
        });
      }else{
        res.send(result.rows[0]);
      }
    });
  });
});

//populates skills list on the volunteer profile page
router.get('/skillList', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    client.query('SELECT * FROM skills', function(err, result){
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

//populates causes list on the volunteer profile page
router.get('/causeList', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    client.query('SELECT * FROM causes', function(err, result){
      done();
      if(err){
        console.log('Error completing cause list query', err);
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
  pg.connect(connectionString, function(err, client, done){
    client.query('DELETE FROM volunteers WHERE id=$1',[volunteerId], function(err, result){
      done();
      if(err){
        console.log('Error completing delete about me query', err);
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  });
});

router.put('/volunteer/aboutMe/:id', function(req, res){
  log('hit my about me put route')
  // var volunteerId = req.params.id;
  // var volunteerObject = req.body
  // console.log(req.body);
  // pg.connect(connectionString, function(err, client, done){
  //   client.query('DELETE FROM volunteers WHERE id=$1',[volunteerId], function(err, result){
  //     done();
  //     if(err){
  //       console.log('Error completing delete about me query', err);
  //       res.sendStatus(500);
  //     }else{
  //       res.sendStatus(200);
  //     }
  //   });
  // });
});











module.exports = router;
