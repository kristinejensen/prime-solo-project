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
      }
    });
  });
});

//clears "about me" section to prep for update
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

//updates "about me" section
router.put('/volunteer/aboutMe/:id', function(req, res){
  var volunteerId = req.params.id;
  var volunteerObject = req.body;
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO volunteers (name, email, linkedin, bio) VALUES ($1, $2, $3, $4)',
    [volunteerObject.name, volunteerObject.email, volunteerObject.linkedin, volunteerObject.bio], function(err, result){
      done();
      if(err){
        console.log('Error completing update about me query', err);
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  });
});

//clears skills section to prep for update
router.delete('/volunteer/skills/:id', function(req, res){
  var volunteerId = req.params.id;
  pg.connect(connectionString, function(err, client, done){
    client.query('DELETE FROM skills WHERE volunteer_id=$1',[volunteerId], function(err, result){
      done();
      if(err){
        console.log('Error completing delete skills query', err);
        res.sendStatus(500);
      }else{
        console.log('Success completing delete skills query');
        res.sendStatus(200);
      }
    });
  });
});

// //updates skills section
// router.put('/volunteer/skills/:id', function(req, res){
//   var volunteerId = req.params.id;
//   var volunteerObject = req.body;
//   pg.connect(connectionString, function(err, client, done){
//     client.query('INSERT INTO skills (skill, volunteer_id) VALUES ($1, $2)',
//     [volunteerObject.skillOne.skill, volunteerId], function(err, result){
//       done();
//       if(err){
//         console.log('Error inserting skill one query', err);
//         res.sendStatus(500);
//       }else{
//         res.sendStatus(200);
//       }
//     });
//   });
//   pg.connect(connectionString, function(err, client, done){
//     client.query('INSERT INTO skills (skill, volunteer_id) VALUES ($1, $2)',
//     [volunteerObject.skillTwo.skill, volunteerId], function(err, result){
//       done();
//       if(err){
//         console.log('Error inserting skill one query', err);
//         res.sendStatus(500);
//       }else{
//         res.sendStatus(200);
//       }
//     });
//   });
//   pg.connect(connectionString, function(err, client, done){
//     client.query('INSERT INTO skills (skill, volunteer_id) VALUES ($1, $2)',
//     [volunteerObject.skillThree.skill, volunteerId], function(err, result){
//       done();
//       if(err){
//         console.log('Error inserting skill one query', err);
//         res.sendStatus(500);
//       }else{
//         res.sendStatus(200);
//       }
//     });
//   });
// });

//clears causes section to prep for update
router.delete('/volunteer/causes/:id', function(req, res){
  var volunteerId = req.params.id;
  pg.connect(connectionString, function(err, client, done){
    client.query('DELETE FROM causes WHERE volunteer_id=$1',[volunteerId], function(err, result){
      done();
      if(err){
        console.log('Error completing delete causes query', err);
        res.sendStatus(500);
      }else{
        console.log('Success completing delete causes query');
        res.sendStatus(200);
      }
    });
  });
});






module.exports = router;
