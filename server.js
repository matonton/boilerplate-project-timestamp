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

// TODO: need route for /api
app.get("/api/", function (req, res) {
  var date = new Date();
  var unix = date.getTime();
  var utc = date.toUTCString();
  res.json({ unix: unix, utc: utc });
});

// main API endpoint
app.get("/api/:date", function (req, res) {
  var date;
  // isNaN checks if date is in Unix format, i.e. an integer
  // console.log(isNaN(req.params.date));
  if (!isNaN(req.params.date)) {
    date = new Date(Number(req.params.date));
  // if not, tries to create date out of string
  } else {
    date = new Date(req.params.date);
  }
  // error handling for invalid dates
  if (!date.valueOf()) res.json({ error: "Invalid Date" });
  // prepare JSON response
  var unix = date.getTime();
  var utc = date.toUTCString();
  res.json({ unix: unix, utc: utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
