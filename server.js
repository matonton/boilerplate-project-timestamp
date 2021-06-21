// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:year-:month-:date", function (req, res) {
  var y = Number(req.params.year);
  var m = Number(req.params.month) - 1;
  var d = Number(req.params.date);
  var date = new Date(y, m, d);
  
  
  var unix = date.getTime();
  var utc = date.toUTCString();
  res.json({ unix: unix, utc: utc });
});

// your first API endpoint... 
app.get("/api/:unix", function (req, res) {
  console.log(req.params.unix);
  var date = new Date(Number(req.params.unix));
  console.log(date);
  var unix = date.getTime();
  var utc = date.toUTCString();
  console.log(utc);
  res.json({ unix: unix, utc: utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
