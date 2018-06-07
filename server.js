// ============================================================================================
// DEPENDENCIES
// ============================================================================================
var dotenvResult = require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set Up App to Use Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

    //----------------------------------Debate MSG-------------------
    app.get('/debate', function(req, res){
      res.sendFile(__dirname + '../debatePage.html');
      });
    
        io.on('connection', function(socket){
          socket.on('chat message', function(msg){
              io.emit('chat message', msg);
          });
        });
    //----------------------------------------------------------

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



