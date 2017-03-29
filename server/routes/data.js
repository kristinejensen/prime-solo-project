var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


//populates volunteer profile with existing user data || adds a new user to the db
router.get('/volunteer', function (req, res) {
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM volunteers WHERE email=$1;', [userEmail], function (err, result) {
      done();
      if (err) {
        console.log('Error completing query', err);
        res.sendStatus(500);
      } else if (result.rows.length == 0) {
        pg.connect(connectionString, function (err, client, done) {
          client.query('INSERT INTO volunteers (name, email, linkedin, bio) VALUES ($1, $2, $3, $4) RETURNING id;', ['Add your name', userEmail, 'Add your LinkedIn profile', 'Add your bio'], function (err, result) {
            done();
            if (err) {
              console.log('Error inserting new volunteer user', err);
              res.sendStatus(500);
            } else {
              client.query('INSERT INTO volunteer_skills (volunteer_id, skill_id) VALUES ($1, $2), ($1, $2), ($1, $2) RETURNING volunteer_id;', [result.rows[0].id, 47],
              function (err, result) {
                if (err) {
                  console.log('Error adding default skills', err);
                  res.sendStatus(500);
                } else {
                  client.query('INSERT INTO volunteer_causes (volunteer_id, cause_id) VALUES ($1, $2), ($1, $2), ($1, $2) RETURNING volunteer_id;', [result.rows[0].volunteer_id, 23],
                  function(err, result){
                    if (err){
                      console.log('Error adding default causes', err);
                      res.sendStatus(500);
                    } else {
                      client.query('INSERT INTO availability (morning, afternoon, evening, weekdays, weekends, open, volunteer_id) VALUES ($1, $2, $3, $4, $5, $6, $7);', [false, false, false, false, false, false, result.rows[0].volunteer_id],
                      function(err, result){
                        if(err){
                          console.log('Error adding default availability', err);
                          res.sendStatus(500);
                        } else {
                          res.send({email: userEmail});
                        }
                      });
                    }
                  });
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

//populates volunteer profile with skill data on page load
router.get('/volunteer/skills', function(req, res){
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM volunteers JOIN volunteer_skills ON volunteer_skills.volunteer_id=volunteers.id JOIN skills ON volunteer_skills.skill_id=skills.id WHERE email=$1;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get skills on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

//populates volunteer profile with availability data on page load
router.get('/volunteer/availability', function(req, res){
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM availability JOIN volunteers ON volunteers.id=availability.volunteer_id WHERE email=$1;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get availability on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

//populates volunteer profile with cause data on page load
router.get('/volunteer/causes', function(req, res){
  console.log('get causes route hit');
  var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM volunteers JOIN volunteer_causes ON volunteer_causes.volunteer_id=volunteers.id JOIN causes ON volunteer_causes.cause_id=causes.id WHERE email=$1;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get causes on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

//updates "about me" section
router.put('/volunteer/aboutMe/:id', function (req, res) {
  var volunteerId = req.params.id;
  var volunteerObject = req.body;
  pg.connect(connectionString, function (err, client, done) {
    client.query('UPDATE volunteers SET name=$1, email=$2, linkedin=$3, bio=$4 WHERE id=$5;',
    [volunteerObject.name, volunteerObject.email, volunteerObject.linkedin, volunteerObject.bio, volunteerId], function (err, result) {
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

//inserts skills
router.post('/volunteer/skills/:id', function (req, res) {
  var volunteerId = req.params.id;
  var volunteerObject = req.body;
  pg.connect(connectionString, function (err, client, done){
    client.query('INSERT INTO volunteer_skills (skill_id, volunteer_id) VALUES ($1, $2);',
    [volunteerObject.id, volunteerId], function (err, result){
      done();
      if(err){
        console.log('Error inserting skill');
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  });
});

//inserts causes
router.post('/volunteer/causes/:id', function (req, res) {
  var volunteerId = req.params.id;
  var volunteerObject = req.body;
  pg.connect(connectionString, function (err, client, done){
    client.query('INSERT INTO volunteer_causes (cause_id, volunteer_id) VALUES ($1, $2);',
    [volunteerObject.id, volunteerId], function (err, result){
      done();
      if(err){
        console.log('Error inserting cause');
        res.sendStatus(500);
      }else{
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
    client.query('UPDATE availability SET morning=$1, afternoon=$2, evening=$3, weekdays=$4, weekends=$5, open=$6, volunteer_id=$7;',
    [availabilityObject.morning, availabilityObject.afternoon, availabilityObject.evening, availabilityObject.weekdays, availabilityObject.weekends, availabilityObject.open, volunteerId], function (err, result) {
      done();
      if (err) {
        console.log('Error updating availability', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

module.exports = router;
