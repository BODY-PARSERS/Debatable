$(document).ready(function () {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Changing Page Session
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // global variables
    var userId = sessionStorage.getItem("userId")
    var userName = sessionStorage.getItem("userName")

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Load Everything about the join specific debate page
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    var joinDebateTopic = sessionStorage.getItem("joinDebateTopic")
    var joinDebateMessageNum = sessionStorage.getItem("joinDebateMessageNum")

    $("#join-debate-topic").html(joinDebateTopic)

    for(var j = 0; j < joinDebateMessageNum; j++) {
        joinDebateMessageDiv = $("<div>").addClass("debate-message-box").text(sessionStorage.getItem("joinDebateMessage"+j))
        $("#join-message-display").append(joinDebateMessageDiv);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Load Everything about the explore specific debate page
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    var exploreDebateTopic = sessionStorage.getItem("exploreDebateTopic")
    var exploreDebateMessageNum = sessionStorage.getItem("exploreDebateMessageNum")

    $("#explore-debate-topic").html(exploreDebateTopic)

    for (var j = 0; j < exploreDebateMessageNum; j++) {
        exploreDebateMessageDiv = $("<div>").addClass("debate-message-box").text(sessionStorage.getItem("exploreDebateMessage" + j))
        $("#explore-message-display").append(exploreDebateMessageDiv);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Nav Bar on-click events
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Go to user homepage
    $(document).on("click", "#user-home-page-dropdown", function (event) {
        console.log("you clicked go to user home page");
        if (userId) {
            location.href = "/userhome"
        } else {
            alert("Please Sign In");
            location.href = "/login"
        }
    })

    // Log off
    $(document).on("click", "#log-off-dropdown", function (event) {
        console.log("you clicked log off");
        if (userId) {
            sessionStorage.removeItem("userId")
            sessionStorage.removeItem("userName")
            alert("Logged off successfully!")
            location.href = "/"
        } else {
            alert("Please Sign In");
            location.href = "/login"
        }
    })

    // Create Debate Button
    $(document).on("click", "#create-debate-button", function (event) {
        console.log("you clicked create");
        if (userId) {
            location.href = "/createdebate"
        } else {
            alert("Please Sign In");
            location.href = "/login"
        }
    })

    // Join Debate Button
    $(document).on("click", "#join-debate-button", function (event) {
        console.log("you clicked join");
        if (userId) {
            location.href = "/join"
        } else {
            alert("Please Sign In");
            location.href = "/login"
        }
    })

    // Continue Debate Button
    $(document).on("click", "#continue-debate-button", function (event) {
        console.log("you clicked continue");
        if (userId) {
            location.href = "/continue"
        } else {
            alert("Please Sign In");
            location.href = "/login"
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Handling Sign Up Form Submission
    $(document).on("submit", "#sign-up-form", function (event) {
        event.preventDefault();
        console.log("you clicked submit!")
        var nameInput = $("#username-input").val().trim();
        var emailInput = $("#email-input").val().trim();
        var passwordInput = $("#password-input").val().trim();

        console.log(nameInput, emailInput, passwordInput);

        var newUser = {
            username: nameInput,
            password: passwordInput,
        }

        $("#username-input").val("");
        $("#email-input").val("");
        $("#password-input").val("");


        $.post("/api/users", newUser)
            .then(function (result) {
                console.log("User Added!");
                console.log(result);
                alert("You have created your account successfully!")
                location.href = "/login"
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
                alert("Error occurred! Please try again!")
            })

    })

    // Handling Log In Form Submission
    $(document).on("submit", "#log-in-form", function (event) {
        event.preventDefault();
        console.log("you clicked submit!")
        var nameInput = $("#log-in-username").val().trim();
        var passwordInput = $("#log-in-password").val().trim();

        console.log(nameInput, passwordInput);

        $("#log-in-username").val("");
        $("#log-in-password").val("");


        $.get("/api/users/" + nameInput + "/" + passwordInput)
            .then(function (result) {
                console.log(result);
                if (result) {
                    console.log("Login succesful!");
                    console.log("You are logged in as: ", result.username);
                    sessionStorage.setItem('userId', result.id);
                    sessionStorage.setItem('userName', result.username);
                    location.href = "/userhome";
                } else {
                    console.log("login failed....");
                    alert("Username and/or Password Incorrect")
                }
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

    })

    // Handling Creating Debate Form Submission
    $(document).on("click", "#create-debate", function (event) {

        event.preventDefault();
        console.log("you clicked submit!")
        var topicInput = $("#topic-input").val().trim();
        var userId = sessionStorage.getItem('userId')

        console.log(topicInput);
        console.log(userId);

        var newDebate = {
            userId: userId,
            topic: topicInput
        }

        $("#topic-input").val("");

        $.post("/api/debates", newDebate)
            .then(function (result) {
                console.log("Debate Added!");
                alert("Debate Created")
                console.log(result);

            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

    })

    // Handling Join Debate Button
    $(document).on("click", ".join-button", function (event) {

        event.preventDefault();

        console.log("you clicked join!")
        var debateId = $(this).data("debateid");
        console.log("debate ID: ", debateId);
        console.log("your user ID: ", userId);

        sessionStorage.setItem("joinDebateId", debateId)

        var newDebate = {
            userId: userId,
            debateId: debateId
        }

        $.ajax({
            url: 'api/debates',
            type: 'PUT',
            data: newDebate
        }).then(function (result) {
                console.log("debate updated!!!")
                console.log(result);
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

        $.get("api/debates/" + debateId)
            .then(function (result) {
                console.log(result);
                sessionStorage.setItem("joinDebateTopic", result.topic)
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

        $.get("api/messages/" + debateId)
            .then(function (result) {
                console.log(result);
                sessionStorage.setItem("joinDebateMessageNum", result.length)
                for (var i = 0; i < result.length; i++) {
                    sessionStorage.setItem("joinDebateMessage" + i, result[i].content)
                }
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

        location.href = '/joinspecificdebate'
        
    })

    // Handling Explore Debate Button
    $(document).on("click", ".explore-button", function (event) {

        event.preventDefault();

        console.log("you clicked join!")
        var debateId = $(this).data("debateid");
        console.log("debate ID: ", debateId);
        console.log("your user ID: ", userId);

        sessionStorage.setItem("exploreDebateId", debateId)

        $.get("api/debates/" + debateId)
            .then(function (result) {
                console.log(result);
                sessionStorage.setItem("exploreDebateTopic", result.topic)
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

        $.get("api/messages/" + debateId)
            .then(function (result) {
                console.log(result);
                sessionStorage.setItem("exploreDebateMessageNum", result.length)
                for (var i = 0; i < result.length; i++) {
                    sessionStorage.setItem("exploreDebateMessage" + i, result[i].content)
                }
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

        location.href = '/explorespecificdebate'

    })

    // Handling Join Debate Posting Message Button
    $(document).on("click", "#join-post-button", function (event) {

        event.preventDefault();
        console.log("you clicked post");
        var content = $("#join-message-input").val().trim();
        var userId = sessionStorage.getItem("userId");
        var debateId = sessionStorage.getItem("joinDebateId")
        var userName = sessionStorage.getItem("userName")

        var newMessage = {
            userId: userId,
            debateId: debateId,
            content: userName + ": " + content
        }

        $("#join-message-input").val("");

        $.post("api/messages", newMessage)
            .then(function (result) {
                console.log("Message Added!");
                console.log(result);
            }).catch(function (error) {
                console.log("There was an error:")
                console.log(error)
            })

            setTimeout(() => {
                $.get("api/messages/" + debateId)
                    .then(function (result) {
                        console.log(result);
                        sessionStorage.setItem("joinDebateMessageNum", result.length)
                        for (var i = 0; i < result.length; i++) {
                            sessionStorage.setItem("joinDebateMessage" + i, result[i].content)
                        }
                    }).catch(function (error) {
                        console.log("There was an error:")
                        console.log(error)
                    })

                location.href = "/joinspecificdebate"
            }, 100);

    })

});
