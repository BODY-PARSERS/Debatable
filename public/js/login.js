$(document).ready(function(){
    
    // Handling Sign Up Form Submission
    $(document).on("submit", "#login-form", function(event){
        event.preventDefault();
        console.log("you clicked submit!")
        var nameInput = $("#username-input").val().trim();
        var emailInput = $("#email-input").val().trim();
        var passwordInput = $("#password-input").val().trim();

        console.log(nameInput,emailInput,passwordInput);

        var newUser = {
            username: nameInput,
            password: passwordInput,
        }

        $.post("/api/users", newUser)
            .then( function(result){
                console.log("User Added!");
                console.log(result);
            }).catch(function(error){
                console.log("There was an error:")
                console.log(error)
            })

    })


});