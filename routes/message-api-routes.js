// ============================================================================================
// DEPENDENCIES
// ============================================================================================
var db = require("../models");

// ============================================================================================
// ROUTES
// ============================================================================================
module.exports = function(app){

    app.post("/api/messages", function(request, response){
        newMessage = {
            user_id: request.body.userId,
            debate_id: request.body.debateId,
            content: request.body.content
        }
        db.Message.create(newMessage).then(function(result){
            console.log("--------------------");
            console.log("Create New Message!");
            response.json(result);
        }).catch(function(error){
            console.log(error)
        })
    });

    app.get("/api/messages/:debateId", function(request, response){
        db.Message.findAll({
            where: {
                debate_id: request.params.debateId
            }
        }).then(function(data){
            console.log(data)
            response.json(data)
        }).catch(function(error){
            console.log(error)
            response.send(error);
        })
    })

};