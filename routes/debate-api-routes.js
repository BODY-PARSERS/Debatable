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
            userId: request.body.userId
        }
        db.Debate.create(newDebate).then(function(result){
            console.log("--------------------");
            console.log("Create New Debate!");
            result.addUsers(request.body.userId);
            // console.log(result);
            response.json(result);
        }).catch(function(error){
            console.log(error)
        })
    });

    app.put("/api/debates", function (request, response) {
        db.Debate.findOne({
            where: {
                id: request.body.debateId
            }
        }).then(function (result) {
            
            db.Debate.findAndCountAll({
                include: [db.User],
                where: { id: request.body.debateId }
            }).then(function (joinResults) {
                debateUserCount = joinResults.count
                console.log(debateUserCount);
            
                if (debateUserCount < 2) {
                    result.addUsers(request.body.userId);
                    console.log(result);
                    response.json(result);
                    console.log(joinResults.rows[0].Users[0].dataValues.id)
                    debateCreatorId = joinResults.rows[0].Users[0].dataValues.id
                    
                    if (debateCreatorId != request.body.userId){
                        debateUserCount += 1;
                        if (debateUserCount = 2) {
                            result.update({ status: "ongoing" })
                        }
                    }

                } else {
                    console.log("Error Occurred!")
                }
            })
    
        }).catch(function (error) {
            console.log(error)
        })


    });


};

