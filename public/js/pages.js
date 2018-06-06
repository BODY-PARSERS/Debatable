$(document).ready(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Changing Page Session//
////////////////////////////////////////////////////////////////////////////////////////////////////////

    var defaultPage = sessionStorage.getItem('defaultPage')
    var userId = localStorage.getItem("userId")
    var userName = localStorage.getItem("userName")

    if (defaultPage == 'home') {
        console.log('you clicked home');
        $(".page-view").hide();
        $(".landing-page").show();
        sessionStorage.clear();
    } else if (defaultPage == 'create-debate') {
        console.log('you clicked create debate')
        $(".page-view").hide();
        $(".create-debate-box").show();
        sessionStorage.clear();
    } else if (defaultPage == 'sign-up') {
        console.log('you clicked sign up')
        $(".page-view").hide();
        $(".sign-up-box").show();
        sessionStorage.clear();
    } else if (defaultPage == 'user-home') {
        console.log("you clicked go to user home page");
        if(userId){
            $(".page-view").hide();
            $(".user-home-page").show();
            sessionStorage.clear();
        }else{
            alert("Please Sign In");
            sessionStorage.setItem('defaultPage', 'log-in');
            location.href = '/' 
        }
    } else if (defaultPage == 'log-in') {
        console.log("you clicked go to log in page");
        $(".page-view").hide();
        $(".log-in-box").show();
        sessionStorage.clear();
    }

    // On-click event of the sign-up button
    $(document).on("click", "#sign-up-dropdown", function(event){
        event.preventDefault();
        sessionStorage.setItem('defaultPage', 'sign-up');
        location.href = '/'
    })
    // On-click event of the login button
    $(document).on("click", "#log-in-dropdown", function(event){
        event.preventDefault();
        sessionStorage.setItem('defaultPage', 'log-in');
        location.href = '/'
    })

    // On-click event of the go-to-homepage button
    $(document).on("click", "#user-home-page-dropdown", function (event) {
        event.preventDefault();
        sessionStorage.setItem('defaultPage', 'user-home');
        location.href = '/'
    })

    // On-click event of the home button
    $(document).on("click", "#home-button", function(event){
        event.preventDefault();
        sessionStorage.setItem('defaultPage', 'home')
        location.href = '/';
    })

    // On-click event for create debate button
    $(document).on("click", ".create-debate-button", function (event) {
        event.preventDefault();
        sessionStorage.setItem('defaultPage', 'create-debate');
        location.href = '/'
    })
    
    // On-click event of the join button
    $(document).on("click", ".join-debate-button", function(event){
        event.preventDefault();
        console.log("you clicked join debates");
        $(".page-view").hide();
        location.href = '/join'
    })

    // On-click event of the continue button
    $(document).on("click", ".continue-debate-button", function (event) {
        event.preventDefault();
        console.log("you clicked continue debates");
        $(".page-view").hide();
        location.href = '/continue'
    })

    // On-click event of the explore button
    $(document).on("click", ".explore-debate-button", function (event) {
        event.preventDefault();
        console.log("you clicked explore debates");
        $(".page-view").hide();
        location.href = '/explore'
    })

////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Handling Sign Up Form Submission
    $(document).on("submit", "#sign-up-form", function(event){
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

        $("#username-input").val("");
        $("#email-input").val("");
        $("#password-input").val("");


        $.post("/api/users", newUser)
            .then( function(result){
                console.log("User Added!");
                console.log(result);
            }).catch(function(error){
                console.log("There was an error:")
                console.log(error)
            })

    })

    // Handling Log In Form Submission
    $(document).on("submit", "#log-in-form", function(event){
        event.preventDefault();
        console.log("you clicked submit!")
        var nameInput = $("#log-in-username").val().trim();
        var passwordInput = $("#log-in-password").val().trim();

        console.log(nameInput,passwordInput);

        $("#log-in-username").val("");
        $("#log-in-password").val("");


        $.get("/api/users/"+nameInput+"/"+passwordInput)
            .then( function(result){
                console.log("Login Attempted!");
                console.log(result);
                localStorage.setItem('userId', result.id)
                localStorage.setItem('userName', result.username)
                sessionStorage.setItem('defaultPage', 'user-home')
                location.href = '/';

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