$(document).ready(function(){

    // On-click event of the sign-up button
    $(document).on("click", "#sign-up-dropdown", function(event){
        event.preventDefault();
        console.log("you clicked sign-up");
        $(".landing-page").hide();
        $(".user-home-page").hide();
        $(".sign-up-box").show();
    })

    // On-click event of the go-to-homepage button
    $(document).on("click", "#user-home-page-dropdown", function (event) {
        event.preventDefault();
        console.log("you clicked go to home page");
        $(".landing-page").hide();
        $(".sign-up-box").hide();
        $(".user-home-page").show();
    })

    // On-click event of the home button
    $(document).on("click", "#home-button", function(event){
        event.preventDefault();
        console.log("you clicked home");
        $(".sign-up-box").hide();
        $(".user-home-page").hide();
        $(".landing-page").show();
    })
    
    // On-click event of the Join Button
    $(document).on("click", "#home-button", function(event){
        event.preventDefault();
        console.log("you clicked home");
        $(".page").hide();
        $(".user-home-page").hide();
        $(".landing-page").show();
    })

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