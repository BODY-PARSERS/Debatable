// ============================================================================================
// DEPENDENCIES
// ============================================================================================
var db = require("../models");

// ============================================================================================
// ROUTES
// ============================================================================================
module.exports = function(app){

    app.post("/api/users", function(request, response){
        newUser = {
            username: request.body.username,
            password: request.body.password
        }
        db.User.create(newUser).then(function(result){
            console.log("done");
            response.json(result);
        }).catch(function(error){
            console.log(error)
        })
    });

    app.get("/api/users/:name/:password", function(request,response){
        
        db.User.findOne({
            where:{
                username: request.params.name,
                password: request.params.password
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