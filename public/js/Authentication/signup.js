$("#studentsignupForm input[type=submit]").prop("disabled", true);
$("#mentorsignupForm input[type=submit]").prop("disabled", true);
$("#adminsignupForm input[type=submit]").prop("disabled", true);
$("#companysignupForm input[type=submit]").prop("disabled", true);

// ========================================== (1) Student Form OTP Handdler ===========================================

// Get country code from API
{
const phoneInputField = document.querySelector("#student-phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

// Modify the click event handler for the "Get OTP" button
$("#student-getOTPBtn").click(function () {

    const phoneNumber = phoneInput.getNumber();
    document.getElementById("student-phone").value = `${phoneNumber}`

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
}

// ========================================== (2) Mentor Form OTP Handdler ===========================================

// Get country code from API
{
    const phoneInputField = document.querySelector("#mentor-phone");
        const phoneInput = window.intlTelInput(phoneInputField, {
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
//For Mentor
$("#mentor-getOTPBtn").click(function () {
    const phoneNumber = phoneInput.getNumber();
    document.getElementById("mentor-phone").value = `${phoneNumber}`

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
}

// ========================================== (3) Admin Form OTP Handdler ===========================================

// Get country code from API
{
    const phoneInputField = document.querySelector("#admin-phone");
        const phoneInput = window.intlTelInput(phoneInputField, {
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
//For Admin
$("#admin-getOTPBtn").click(function () {

    const phoneNumber = phoneInput.getNumber();
    document.getElementById("admin-phone").value = `${phoneNumber}`

    console.log("Click get otp button ");
    const phone =$("#admin-phone").val();
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
}

// ========================================== (4) Company Form OTP Handdler ===========================================

// Get country code from API
{
    const phoneInputField = document.querySelector("#company-phone");
        const phoneInput = window.intlTelInput(phoneInputField, {
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });

//For Company
$("#company-getOTPBtn").click(function () {
    const phoneNumber = phoneInput.getNumber();
    document.getElementById("company-phone").value = `${phoneNumber}`

    console.log("Click get otp button ");
    const phone = $("#company-phone").val();
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (phone === "" || !phoneRegex.test(phone)) {
        $("#company-otpStatus").text("Please Enter a valid number").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
    } else {
        document.getElementById("company-otpContainer").style.display = "block";
        $.ajax({
            url: "/api/setTextMessage",
            method: "POST",
            data: { phone: phone },
            success: function (response) {
                console.log(response);
                $("#company-otpStatus").text("OTP sent successfully,Plese verify otp").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
            },
            error: function (error) {
                console.log(error);
                $("#company-otpStatus").text("OTP does not sent. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
            }
        });
    }
});

$("#company-verifyOtpBtn").on("click", function () {
    console.log("Click verify otp button ");
    var otpValue = $("#company-otp").val();
    $.ajax({
        url: "/api/verifyOtp",
        method: "POST",
        data: { otp: otpValue },
        success: function (data) {
            if (data.success) {
                $("#company-otpVerificationStatus").text("OTP verified successfully").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
                $("#companysignupForm input[type=submit]").prop("disabled", false);
            } else {
                $("#company-otpVerificationStatus").text("OTP verification failed. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});
}
