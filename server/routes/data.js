var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


//populates volunteer profile with existing user data || adds a new user to the db
router.get('/volunteer', function (req, res) {
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM volunteers WHERE email=$1', [userEmail], function (err, result) {
      done();
      if (err) {
        console.log('Error completing query', err);
        res.sendStatus(500);
      } else if (result.rows.length == 0) {
        pg.connect(connectionString, function (err, client, done) {
          client.query('INSERT INTO volunteers (email) VALUES ($1) RETURNING id', [userEmail], function (err, result) {
            done();
            if (err) {
              console.log('Error inserting new volunteer user', err);
              res.sendStatus(500);
            } else {
              client.query('INSERT INTO volunteer_skills (volunteer_id, skill_id) VALUES ($1, $2), ($1, $2), ($1, $2);', [result.rows[0].id, 47],
                function (err, result) {
                  if (err) {
                    console.log('Error inserting new volunteer user', err);
                    res.sendStatus(500);
                  } else {
                    res.send({ email: userEmail });
                  }
                });
            }
          });
        });
      } else {
        res.send(result.rows[0]);
      }
    });
  });
});

//clears "about me" section to prep for update
router.delete('/volunteer/aboutMe/:id', function (req, res) {
  var volunteerId = req.params.id;
  pg.connect(connectionString, function (err, client, done) {
    client.query('DELETE FROM volunteers WHERE id=$1', [volunteerId], function (err, result) {
      done();
      if (err) {
        console.log('Error completing delete about me query', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

//updates "about me" section
router.put('/volunteer/aboutMe/:id', function (req, res) {
  var volunteerId = req.params.id;
  var volunteerObject = req.body;
  pg.connect(connectionString, function (err, client, done) {
    client.query('INSERT INTO volunteers (name, email, linkedin, bio) VALUES ($1, $2, $3, $4)',
      [volunteerObject.name, volunteerObject.email, volunteerObject.linkedin, volunteerObject.bio], function (err, result) {
        done();
        if (err) {
          console.log('Error completing update about me query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  });
});

//clears skills section to prep for update
router.delete('/volunteer/skills/:id', function (req, res) {
  var volunteerId = req.params.id;
  pg.connect(connectionString, function (err, client, done) {
    client.query('DELETE FROM volunteer_skills WHERE volunteer_id=$1', [volunteerId], function (err, result) {
      done();
      if (err) {
        console.log('Error completing delete skills query', err);
        res.sendStatus(500);
      } else {
        console.log('Success completing delete skills query');
        res.sendStatus(200);
      }
    });
  });
});

//updates skills section
router.put('/volunteer/skills/:id', function (req, res) {
  var volunteerId = req.params.id;
  var volunteerObject = req.body;
  pg.connect(connectionString, function (err, client, done) {
    client.query('INSERT INTO volunteer_skills (volunteer_id, skill_id) VALUES ($1, $2), ($3, $4), ($5, $6)',
      [volunteerId, volunteerObject.skillOne.id, volunteerId, volunteerObject.skillTwo.id, volunteerId, volunteerObject.skillThree.id], function (err, result) {
        done();
        if (err) {
          console.log('Error inserting skill query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  });
});

//clears availability section to prep for update
router.delete('/volunteer/availability/:id', function (req, res) {
  console.log('delete availability route hit');
  var volunteerId = req.params.id;
  pg.connect(connectionString, function (err, client, done) {
    client.query('DELETE FROM availability WHERE volunteer_id=$1', [volunteerId], function (err, result) {
      done();
      if (err) {
        console.log('Error completing delete availability query', err);
        res.sendStatus(500);
      } else {
        console.log('Success completing availability causes query');
        res.sendStatus(200);
      }
    });
  });
});

// updates availability section
router.put('/volunteer/availability/:id', function (req, res) {
  var volunteerId = req.params.id;
  var availabilityObject = req.body;
  pg.connect(connectionString, function (err, client, done) {
    client.query('INSERT INTO availability (morning, afternoon, evening, weekdays, weekends, open, volunteer_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [availabilityObject.morning, availabilityObject.afternoon, availabilityObject.evening, availabilityObject.weekdays, availabilityObject.weekends, availabilityObject.open, volunteerId], function (err, result) {
        done();
        if (err) {
          console.log('Error inserting availability query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  });
});

//clears causes section to prep for update
router.delete('/volunteer/causes/:id', function (req, res) {
  var volunteerId = req.params.id;
  pg.connect(connectionString, function (err, client, done) {
    client.query('DELETE FROM volunteer_causes WHERE volunteer_id=$1', [volunteerId], function (err, result) {
      done();
      if (err) {
        console.log('Error completing delete causes query', err);
        res.sendStatus(500);
      } else {
        console.log('Success completing delete causes query');
        res.sendStatus(200);
      }
    });
  });
});

//updates causes section
router.put('/volunteer/causes/:id', function (req, res) {
  var volunteerId = req.params.id;
  var volunteerObject = req.body;
  pg.connect(connectionString, function (err, client, done) {
    client.query('INSERT INTO volunteer_causes (volunteer_id, cause_id) VALUES ($1, $2), ($3, $4), ($5, $6)',
      [volunteerId, volunteerObject.causeOne.id, volunteerId, volunteerObject.causeTwo.id, volunteerId, volunteerObject.causeThree.id], function (err, result) {
        done();
        if (err) {
          console.log('Error inserting causes query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  });
});

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
