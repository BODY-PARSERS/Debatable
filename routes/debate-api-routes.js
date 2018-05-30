// ============================================================================================
// DEPENDENCIES
// ============================================================================================
var db = require("../models");

// ============================================================================================
// ROUTES
// ============================================================================================
module.exports = function(app){

    app.post("/api/debates", function(request, response){
        newDebate = {
            topic: request.body.topic,
        }
        db.Debate.create(newDebate).then(function(result){
            console.log("--------------------");
            console.log("Create New Debate!");
            result.addUsers(request.body.userId);
            console.log(result);
            response.json(result);
        }).catch(function(error){
            console.log(error)
        })

        

    });



};