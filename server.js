// ============================================================================================
// DEPENDENCIES
// ============================================================================================
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");

// Require our models
var db = require("./models");

// ============================================================================================
// CONFIGURE EXPRESS APP
// ============================================================================================
// initialize app
var app = express();
// set up port
var PORT = process.env.PORT || 8080;
// static directory
app.use(express.static("public"))

// Set Up App to Use Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// ============================================================================================
// ROUTES
// ============================================================================================
require("./routes/html-routes")(app);
require("./routes/user-api-routes")(app);
require("./routes/message-api-routes")(app);
require("./routes/debate-api-routes")(app);

// ============================================================================================
// SYNC SEQUELIZE MODELS AND START EXPRESS APP
// ============================================================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });



