// index.js
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', function(req, res){
 const dateString = req.params.date
 const dateStringRegex = /^[0-9]+$/
 const containNumbers = dateStringRegex.test(dateString)

  if(!containNumbers) {
    const unixTimeStamp = Date.parse(dateString)
    const utcDate = new Date(unixTimeStamp).toUTCString()

    console.log(utcDate)

    unixTimeStamp ? res.json({"unix": unixTimeStamp, "utc": utcDate})
                  : res.json({ error: "Invalid Date" })
  } else {
    const unixTimestamp = parseInt(dateString)
    const actualDate = new Date(unixTimestamp)
    const utcDate = actualDate.toUTCString()

    res.json({ unix: unixTimestamp, utc: utcDate })
  }
})
   

// Requests with empty date parameter
app.get('/api/', function(req, res){
  const currentDate  = new Date().toUTCString()
  const currentUnix  = Date.parse(currentDate)

  res.json({ unix: currentUnix, utc: currentDate })

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
