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
            include: [db.User],
            where:{
                status: "ongoing"
            }
        }).then(function(data){
            for (var i = 0 ; i < data.length; i++) {
                var specificDebateUsersId = []
                for (var j = 0; j < data[i].Users.length; j++) {
                    specificDebateUsersId.push(data[i].Users[j].id)
                } 
                data[i]["debateusersId"] = specificDebateUsersId.toString()
            }
            var viewObject = {
                className: "continue",
                pageName: "Continue",
                debates: data,
                numberofdebates: data.length
            }
            response.render("showdebates", viewObject)
        })
    });
    // explore debates 
    app.get("/explore", function(request, response){
        db.Debate.findAll({}).then(function(data){
            // data.forEach(console.log(data[0].Users[0].id))
            var viewObject = {
                className: "explore",
                pageName: "Explore",
                debates: data
            }
            response.render("showdebates", viewObject)
        })
    });
    
    // join specific debate page
    app.get("/joinspecificdebate", function (request, response) {
            response.render("joinspecificdebates")
    });

    // explore specific debate page
    app.get("/explorespecificdebate", function (request, response) {
        response.render("explorespecificdebates")
    });

    // continue specific debate page
    app.get("/explorespecificdebate", function (request, response) {
        response.render("continuespecificdebates")
    });
    
};