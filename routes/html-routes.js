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
            response.render("joindebates", viewObject)
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
            response.render("continuedebates", viewObject)
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
            response.render("exploredebates", viewObject)
        })
    });
    // specific debate page
    app.get("/specificdebate", function (request, response) {
        db.Message.findAll({
            where:{
                debate_id: "2",
            }
        }).then(function(data){
            var viewObject = {
                content: data.content
            }
            response.render("specificdebate", viewObject)
        })
        
    });
    
};