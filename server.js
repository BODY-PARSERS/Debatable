// ============================================================================================
// DEPENDENCIES
// ============================================================================================
var express = require("express");
var bodyParser = require("body")

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



