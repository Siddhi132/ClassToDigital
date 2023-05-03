$("#studentsignupForm input[type=submit]").prop("disabled", true);
$("#mentorsignupForm input[type=submit]").prop("disabled", true);
$("#adminsignupForm input[type=submit]").prop("disabled", true);

// Modify the click event handler for the "Get OTP" button
$("#student-getOTPBtn").click(function () {
    console.log("Click get otp button ");
    // Get the phone number entered by the user
    const phone = $("#student-phone").val();
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (phone === "" || !phoneRegex.test(phone)) {
        // console.log("Phone no is null");
        $("#student-otpStatus").text("Please Enter a valid number").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
    } else {
        document.getElementById("student-otpContainer").style.display = "block";
        // Make an AJAX request to the server
        $.ajax({
            url: "/api/setTextMessage",
            method: "POST",
            data: { phone: phone }, // Pass the phone number as data
            success: function (response) {
                // Handle success response from the server
                console.log(response); 
                $("#student-otpStatus").text("OTP sent successfully,Plese verify otp").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
            },
            error: function (error) {
                // Handle error response from the server
                console.log(error);
                $("#student-otpStatus").text("OTP does not sent. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
            }
        });
    }
});

// Attach click event handler to the verify OTP button
$("#student-verifyOtpBtn").on("click", function () {
    console.log("Click verify otp button ");
    var otpValue = $("#student-otp").val();
    // Make an Ajax post request to the server to verify the OTP
    $.ajax({
        url: "/api/verifyOtp",
        method: "POST",
        data: { otp: otpValue }, // Pass the OTP value as data
        success: function (data) {
            // Check if the OTP is verified successfully
            if (data.success) {
                // Display success message
                $("#student-otpVerificationStatus").text("OTP verified successfully").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
                $("#studentsignupForm input[type=submit]").prop("disabled", false);
            } else {
                // Display error message
                $("#student-otpVerificationStatus").text("OTP verification failed. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
            }
        },
        error: function (error) {
            // Handle error response from the server
            console.log(error);
        }
    });
});


//For Mentor
$("#mentor-getOTPBtn").click(function () {
    console.log("Click get otp button ");
    const phone = $("#mentor-phone").val();
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (phone === "" || !phoneRegex.test(phone)) {
        $("#mentor-otpStatus").text("Please Enter a valid number").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
    } else {
        document.getElementById("mentor-otpContainer").style.display = "block";
        $.ajax({
            url: "/api/setTextMessage",
            method: "POST",
            data: { phone: phone },
            success: function (response) {
                console.log(response);
                $("#mentor-otpStatus").text("OTP sent successfully,Plese verify otp").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
            },
            error: function (error) {
                console.log(error);
                $("#mentor-otpStatus").text("OTP does not sent. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
            }
        });
    }
});

$("#mentor-verifyOtpBtn").on("click", function () {
    console.log("Click verify otp button ");
    var otpValue = $("#mentor-otp").val();
    $.ajax({
        url: "/api/verifyOtp",
        method: "POST",
        data: { otp: otpValue },
        success: function (data) {
            if (data.success) {
                $("#mentor-otpVerificationStatus").text("OTP verified successfully").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
                $("#mentorsignupForm input[type=submit]").prop("disabled", false);
            } else {
                $("#mentor-otpVerificationStatus").text("OTP verification failed. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});


//For Admin
$("#admin-getOTPBtn").click(function () {
    console.log("Click get otp button ");
    const phone = $("#admin-phone").val();
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (phone === "" || !phoneRegex.test(phone)) {
        $("#admin-otpStatus").text("Please Enter a valid number").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
    } else {
        document.getElementById("admin-otpContainer").style.display = "block";
        $.ajax({
            url: "/api/setTextMessage",
            method: "POST",
            data: { phone: phone },
            success: function (response) {
                console.log(response);
                $("#admin-otpStatus").text("OTP sent successfully,Plese verify otp").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
            },
            error: function (error) {
                console.log(error);
                $("#admin-otpStatus").text("OTP does not sent. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
            }
        });
    }
});

$("#admin-verifyOtpBtn").on("click", function () {
    console.log("Click verify otp button ");
    var otpValue = $("#admin-otp").val();
    $.ajax({
        url: "/api/verifyOtp",
        method: "POST",
        data: { otp: otpValue },
        success: function (data) {
            if (data.success) {
                $("#admin-otpVerificationStatus").text("OTP verified successfully").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
                $("#adminsignupForm input[type=submit]").prop("disabled", false);
            } else {
                $("#admin-otpVerificationStatus").text("OTP verification failed. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});

