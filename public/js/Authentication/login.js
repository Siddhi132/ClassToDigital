const $emailLogin = $('#emaillogin');
const $phoneLogin = $('#phonelogin');
const $loginWithOTPBtn = $('#loginWithOTPBtn');
const $loginWithEmailBtn = $('#loginWithEmailBtn');
const $getOTPValueBtn = $('#getOTPValueBtn'); // Add the "Get OTP" button
const $otpInput = $('#otp'); // Get the OTP input field
const $verifyOTPBtn = $('#verifyOTPBtn'); // Get the "Verify OTP" button

// Add click event listener to "Login with OTP" link
$loginWithOTPBtn.click(() => {
    // Hide email login and show phone login
    $emailLogin.hide();
    $phoneLogin.show();
    $loginWithOTPBtn.hide();
    $loginWithEmailBtn.show();
    $("#getOTPValueBtn").click(function () {
        console.log("Click get otp button ");
        // Get the phone number entered by the user
        const phone = $("#phone").val();
        // console.log(phone);
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        if (phone === "" || !phoneRegex.test(phone)) {
            console.log("Phone no is null");
            $("#otpStatus").text("Please Enter a valid number").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
        }
        else {
            document.getElementById('otpContainer').style.display = 'block';
            // Make an AJAX request to the server
            $.ajax({
                url: "/api/setTextMessage",
                method: "POST",
                data: { phone: phone }, // Pass the phone number as data
                success: function (response) {
                    // Handle success response from the server
                    console.log(response);
                    $("#otpStatus").text("OTP sent successfully,Plese verify otp").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
                },
                error: function (error) {
                    // Handle error response from the server
                    console.log(error); // You can customize the handling of the error here
                    $("#otpVerificationStatus").text("OTP does not sent. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
                }
            });
        }
    });
    //button desable
    $("#loginForm input[type=submit]").prop("disabled", true);
    // Attach click event handler to the verify OTP button
    $("#verifyOTPBtn").on("click", function () {
        // Get the OTP value entered by the user
        console.log("Click verify otp button ");
        var otpValue = $("#otp").val();
        // Make an Ajax post request to the server to verify the OTP
        $.ajax({
            url: "/api/verifyOtp",
            method: "POST",
            data: { otp: otpValue }, // Pass the OTP value as data
            success: function (data) {
                // Check if the OTP is verified successfully
                if (data.success) {
                    // Display success message
                    $("#otpVerificationStatus").text("OTP verified successfully").css("visibility", "visible").removeClass("text-danger").addClass("text-success");
                    $("#loginForm input[type=submit]").prop("disabled", false);
                } else {
                    // Display error message
                    $("#otpVerificationStatus").text("OTP verification failed. Please try again.").css("visibility", "visible").removeClass("text-success").addClass("text-danger");
                }
            },
            error: function (error) {
                // Handle error response from the server
                console.log(error); // You can customize the handling of the error here
            }
        });
    });
});

// Add click event listener to "Login with Email" link
$loginWithEmailBtn.click(() => {
    //Hide email login and show phone login
    $emailLogin.show();
    $phoneLogin.hide();
    $loginWithOTPBtn.show();
    $loginWithEmailBtn.hide();
    $("#loginForm input[type=submit]").prop("disabled", false);//enable button if hide
});