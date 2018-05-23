// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Star Wars Characters (DATA)
// =============================================================
var reservations = [
  {
    routeName: "ravenwills",
    name: "Raven Wills",
    phoneNumber: "5127799614",
    email: "raven.wills@gmail.com",
    uniqueID: "raven"
  },
  {
    routeName: "erikamats",
    name: "Erika Matsumoto",
    phoneNumber: "5124444444",
    email: "erikamatsumoto@utexas.edu",
    uniqueID: "erika"
  },
  {
    routeName: "kevinpena",
    name: "Kevin Pena",
    phoneNumber: "5125555555",
    email: "kevin.pena@gmail.com",
    uniqueID: "kevin"
  }
];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});
app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});
// Displays all characters
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});
// Displays a single character, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
  var chosen = req.params.reservation;
  console.log(chosen);
  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }
  return res.json(false);
});
// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newreservation = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newreservation.routeName = newreservation.name
    .replace(/\s+/g, "")
    .toLowerCase();
  console.log(newreservation);
  characters.push(newreservation);
  res.json(newreservation);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
