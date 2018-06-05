$(document).ready(function(){

    // On-click event of the sign-up button
    $(document).on("click", "#sign-up-dropdown", function(event){
        event.preventDefault();
        console.log("you clicked sign-up");
        $(".page-view").hide();
        $(".sign-up-box").show();
    })

    // On-click event of the go-to-homepage button
    $(document).on("click", "#user-home-page-dropdown", function (event) {
        event.preventDefault();
        console.log("you clicked go to home page");
        $(".page-view").hide();
        $(".user-home-page").show();
    })

    // On-click event of the home button
    $(document).on("click", "#home-button", function(event){
        event.preventDefault();
        console.log("you clicked home");
        $(".page-view").hide();
        $(".landing-page").show();
    })

    // On-click event for create debate button
    $(document).on("click", ".create-debate-button", function (event) {
        event.preventDefault();
        console.log("you clicked home");
        $(".page-view").hide();
        $(".create-debate-box").show();
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

    // Handling Creating Debate Form Submission
    $(document).on("click", "#create-debate", function (event) {
        event.preventDefault();
        console.log("you clicked submit!")
        var topicInput = $("#topic-input").val().trim();

        console.log(topicInput);

        var newDebate = {
            topic: topicInput,
        }

        $.post("/api/debates", newDebate)
            .then(function (result) {
                console.log("Debate Added!");
                console.log(result);
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

    })


});