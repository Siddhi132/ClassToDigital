function selectImage(imageId) {
    // Reset border for all images
    const images = document.querySelectorAll('.formimg');
    images.forEach(image => {
        image.style.border = '5px solid transparent';
    });
    // Add border to selected image
    const selectedImage = document.getElementById(imageId);
    selectedImage.style.border = '5px solid #000000';
}

function submitForm() {
    var selectedImage = document.querySelector('input[name="imagePicker"]:checked');
    // console.log(selectedImage);
    selectedImage = selectedImage.value; // Get the value property after null check
    if (selectedImage === 'student') {
        document.getElementById('studentForm').classList.remove('hidden');
        document.querySelector('.role').value = 'student';
    } else if (selectedImage === 'mentor') {
        document.getElementById('mentorForm').classList.remove('hidden');
        document.querySelector('.role').value = 'mentor';
    }
    else if (selectedImage === 'admin') {
        document.getElementById('adminForm').classList.remove('hidden');
        document.querySelector('.role').value = 'admin';
    } else if (selectedImage === 'company') {
        document.getElementById('companyForm').classList.remove('hidden');
        document.querySelector('.role').value = 'company';
    }
    document.getElementById('imagePickerForm').classList.add('hidden');
    let btn = document.getElementById('submitbtn');
    btn.classList.add('hidden');
}

//for Student Form 
function studentCheckPassword() {
    var passwordInput = document.getElementById('student-password');
    var password = passwordInput.value;
    var passwordValidationMsg = document.getElementById('student-password-validation-msg');
    console.log("Check Password");
    // Define the regular expression pattern for password validation
    var pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8}$/
    
;

    if (pattern.test(password)) {
        // If password matches the pattern, show success message
        passwordValidationMsg.innerText = 'Password meets the criteria,you have create strong password..!';
        passwordValidationMsg.style.color = 'green';
    } else {
        // If password doesn't match the pattern, show error message
        passwordValidationMsg.innerText = 'Password have least 8 characters,at least 1 numeric character,at least 1 lowercase letter,at least 1 uppercase letter and at least 1 special character ';
        passwordValidationMsg.style.color = 'red';
    }
}

function studentCheck() {
    if (document.getElementById('student-password').value === "" || document.getElementById('student-confirm_password').value === "" || (document.getElementById('student-password').value === "" && document.getElementById('student-confirm_password').value == "")) {
        document.getElementById('student-message').style.color = 'red';
        document.getElementById('student-message').innerHTML = 'Password Should not null';
    }
    else if (document.getElementById('student-password').value ==
        document.getElementById('student-confirm_password').value) {
        document.getElementById('student-message').style.color = 'green';
        document.getElementById('student-message').innerHTML = 'Password matching';
    }
    else {
        document.getElementById('student-message').style.color = 'red';
        document.getElementById('student-message').innerHTML = 'Password not matching';
    }
    console.log(document.getElementById('student-password').value + " " + document.getElementById('student-confirm_password').value);
}


//for mentor form
function mentorCheckPassword() {
    var passwordInput = document.getElementById('mentor-password');
    var password = passwordInput.value;
    var passwordValidationMsg = document.getElementById('mentor-password-validation-msg');
    console.log("Check Password");
    // Define the regular expression pattern for password validation
    var pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8}$/
;

    if (pattern.test(password)) {
        // If password matches the pattern, show success message
        passwordValidationMsg.innerText = 'Password meets the criteria,you have create strong password..!';
        passwordValidationMsg.style.color = 'green';
    } else {
        // If password doesn't match the pattern, show error message
        passwordValidationMsg.innerText = 'Password have 8 characters,at least 1 numeric character,at least 1 lowercase letter,at least 1 uppercase letter and at least 1 special character ';
        passwordValidationMsg.style.color = 'red';
    }
}
function mentorCheck() {
    if (document.getElementById('mentor-password').value === "" || document.getElementById('mentor-confirm_password').value === "" || (document.getElementById('mentor-password').value === "" && document.getElementById('mentor-confirm_password').value == "")) {
        document.getElementById('mentor-message').style.color = 'red';
        document.getElementById('mentor-message').innerHTML = 'Password Should not null';
    }
    else if (document.getElementById('mentor-password').value ==
        document.getElementById('mentor-confirm_password').value) {
        document.getElementById('mentor-message').style.color = 'green';
        document.getElementById('mentor-message').innerHTML = 'Password matching';
    }
    else {
        document.getElementById('mentor-message').style.color = 'red';
        document.getElementById('mentor-message').innerHTML = 'Password not matching';
    }
    console.log(document.getElementById('mentor-password').value + " " + document.getElementById('mentor-confirm_password').value);
}


//for admin form
function adminCheckPassword() {
    var passwordInput = document.getElementById('admin-password');
    var password = passwordInput.value;
    var passwordValidationMsg = document.getElementById('admin-password-validation-msg');
    console.log("Check Password");

    // Define the regular expression pattern for password validation
    var pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8}$/
;

    if (pattern.test(password)) {
        // If password matches the pattern, show success message
        passwordValidationMsg.innerText = 'Password meets the criteria,you have create strong password..!';
        passwordValidationMsg.style.color = 'green';
    } else {
        // If password doesn't match the pattern, show error message
        passwordValidationMsg.innerText = 'Password have 8 characters,at least 1 numeric character,at least 1 lowercase letter,at least 1 uppercase letter and at least 1 special character ';
        passwordValidationMsg.style.color = 'red';
    }
}
function adminCheck() {
    if (document.getElementById('admin-password').value === "" || document.getElementById('admin-confirm_password').value === "" || (document.getElementById('admin-password').value === "" && document.getElementById('admin-confirm_password').value == "")) {
        document.getElementById('admin-message').style.color = 'red';
        document.getElementById('admin-message').innerHTML = 'Password Should not null';
    }
    else if (document.getElementById('admin-password').value ==
        document.getElementById('admin-confirm_password').value) {
        document.getElementById('admin-message').style.color = 'green';
        document.getElementById('admin-message').innerHTML = 'Password matching';
    }
    else {
        document.getElementById('admin-message').style.color = 'red';
        document.getElementById('admin-message').innerHTML = 'Password not matching';
    }
    console.log(document.getElementById('admin-password').value + " " + document.getElementById('admin-confirm_password').value);
}


//for company form
function companyCheckPassword() {
    var passwordInput = document.getElementById('company-password');
    var password = passwordInput.value;
    var passwordValidationMsg = document.getElementById('company-password-validation-msg');
    console.log("Check Password");
    // Define the regular expression pattern for password validation
    var pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8}$/
;

    if (pattern.test(password)) {
        // If password matches the pattern, show success message
        passwordValidationMsg.innerText = 'Password meets the criteria,you have create strong password..!';
        passwordValidationMsg.style.color = 'green';
    } else {
        // If password doesn't match the pattern, show error message
        passwordValidationMsg.innerText = 'Password have 8 characters,at least 1 numeric character,at least 1 lowercase letter,at least 1 uppercase letter and at least 1 special character ';
        passwordValidationMsg.style.color = 'red';
    }
}
function companyCheck() {
    if (document.getElementById('company-password').value === "" || document.getElementById('company-confirm_password').value === "" || (document.getElementById('company-password').value === "" && document.getElementById('company-confirm_password').value == "")) {
        document.getElementById('company-message').style.color = 'red';
        document.getElementById('company-message').innerHTML = 'Password Should not null';
    }
    else if (document.getElementById('company-password').value ==
        document.getElementById('company-confirm_password').value) {
        document.getElementById('company-message').style.color = 'green';
        document.getElementById('company-message').innerHTML = 'Password matching';
    }
    else {
        document.getElementById('company-message').style.color = 'red';
        document.getElementById('company-message').innerHTML = 'Password not matching';
    }
    console.log(document.getElementById('company-password').value + " " + document.getElementById('company-confirm_password').value);
}









