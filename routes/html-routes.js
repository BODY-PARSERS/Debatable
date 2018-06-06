// ============================================================================================
// DEPENDENCIES
// ============================================================================================
var path = require("path");
var db = require("../models");

// ============================================================================================
// ROUTES
// ============================================================================================
module.exports = function(app){
    
    app.get("/", function(request, response){
        response.render("index")
    });
    app.get("/userhome", function(request, response){
        response.render("userhome")
    });
    app.get("/signup", function(request, response){
        response.render("signup")
    });
    app.get("/login", function(request, response){
        response.render("login")
    });
    app.get("/createdebate", function(request, response){
        response.render("createdebate")
    });
    // join debate 
    app.get("/join", function(request, response){
        db.Debate.findAll({
            where:{
                status: "open"
            }
        }).then(function(data){
            var viewObject = {
                className: "join",
                pageName: "Join",
                debates: data
            }
            response.render("showdebates", viewObject)
        })
    });
    // continue debate 
    app.get("/continue", function(request, response){
        db.Debate.findAll({
            where:{
                status: "ongoing"
            }
        }).then(function(data){
            var viewObject = {
                className: "continue",
                pageName: "Continue",
                debates: data
            }
            response.render("showdebates", viewObject)
        })
    });
    // explore debates 
    app.get("/explore", function(request, response){
        db.Debate.findAll({
            where:{
                status: "closed"
            }
        }).then(function(data){
            var viewObject = {
                className: "explore",
                pageName: "Explore",
                debates: data
            }
            response.render("showdebates", viewObject)
        })
    });

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

};