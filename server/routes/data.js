var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');

// router.get('/skills', function (req, res){
//   console.log('getting skills');
//   pool.connect()
//     .then(function (client) {
//       client.query('SELECT * FROM skills')
//         .then(function (result) {
//           client.release();
//           res.send(result.rows);
//         })
//         .catch(function (err) {
//           console.log('error on SELECT', err);
//           res.sendStatus(500);
//         });
//     });
// });

module.exports = router;
