var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var login = require('./routes/login');
var data = require('./routes/data');
var list_data = require('./routes/list_data');
var search = require('./routes/search');
var portDecision = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());


app.use('/list_data', list_data);
app.use('/search', search);

app.use(decoder.token);

/* Whatever you do below this is protected by your authentication. */

app.use('/login', login);
app.use('/data', data);

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
