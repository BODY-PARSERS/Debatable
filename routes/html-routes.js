// ============================================================================================
// DEPENDENCIES
// ============================================================================================
var path = require("path");

// ============================================================================================
// ROUTES
// ============================================================================================
module.exports = function(app){
    // Home Route
    app.get("/", function(request, response){
        response.sendFile(path.join(__dirname,"../public/home.html"))
    });
    // Sign-In Route
    app.get("/sign-in", function(request, response){
        response.sendFile(path.join(__dirname,"../public/login.html"))
    });

};