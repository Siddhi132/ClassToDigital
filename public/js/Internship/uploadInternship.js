
fetch("/api/Categories")
    .then(response => response.json())
    .then(data => {
        console.log(data);


        var internshipState = data.data.categories[0].internship.state;
        var internshipCity = data.data.categories[0].internship.city;
        var internshipCategory = data.data.categories[0].internship.category;
        var modeOfInternship = data.data.categories[0].internship.modeOfInternship;
        var typeOfInternship = data.data.categories[0].internship.typeOfInternship;
        var paidUnpaid = data.data.categories[0].internship.paidUnpaid;

        var state = document.getElementById("state");
        var city = document.getElementById("city");
        var category = document.getElementById("category");
        var modeInternship = document.getElementById("modeOfInternship");
        var typeInternship = document.getElementById("typeOfInternship");
        var paidOrUnpaid = document.getElementById("paidOrUnpaid");


        for (var i = 0; i < internshipState.length; i++) {
            var option = document.createElement("option");
            option.text = internshipState[i];
            option.value = internshipState[i];
            state.add(option);
        }

        for (var i = 0; i < internshipCity.length; i++) {
            var option = document.createElement("option");
            option.text = internshipCity[i];
            option.value = internshipCity[i];
            city.add(option);
        }

        for (var i = 0; i < internshipCategory.length; i++) {
            var option = document.createElement("option");
            option.text = internshipCategory[i];
            option.value = internshipCategory[i];
            category.add(option);
        }

        for (var i = 0; i < modeOfInternship.length; i++) {
            var input = document.createElement("input");
            var label = document.createElement("label");
            label.innerText = modeOfInternship[i];
            input.value = modeOfInternship[i];
            input.setAttribute('class', 'ms-4 modeOfInternshipStatus')
            input.setAttribute('type', 'radio')
            input.setAttribute('name', 'modeOfInternship')
            modeInternship.appendChild(input);
            modeInternship.appendChild(label);
        }
        const radio_modeOfInternship = document.querySelectorAll('input[name="modeOfInternship"]');

        for (const radioButton of radio_modeOfInternship) {
            radioButton.addEventListener("change", () => {
                const selected = document.querySelector('input[name="modeOfInternship"]:checked').value;
                console.log(selected)
                if (selected == "Work from home") {
                    document.getElementsByClassName("modeOfInternshipStatus")[0].classList.add("mode-status")
                    document.getElementsByClassName("modeOfInternshipStatus")[1].classList.remove("mode-status")
                    document.getElementsByClassName("modeOfInternshipStatus")[2].classList.remove("mode-status")
                }
                else if (selected == "Office location") {
                    document.getElementsByClassName("modeOfInternshipStatus")[1].classList.add("mode-status")
                    document.getElementsByClassName("modeOfInternshipStatus")[0].classList.remove("mode-status")
                    document.getElementsByClassName("modeOfInternshipStatus")[2].classList.remove("mode-status")
                }
                else if (selected == "Hybrid") {
                    document.getElementsByClassName("modeOfInternshipStatus")[2].classList.add("mode-status")
                    document.getElementsByClassName("modeOfInternshipStatus")[0].classList.remove("mode-status")
                    document.getElementsByClassName("modeOfInternshipStatus")[1].classList.remove("mode-status")
                }
            });
        }

        for (var i = 0; i < typeOfInternship.length; i++) {
            var input = document.createElement("input");
            var label = document.createElement("label");
            label.innerText = typeOfInternship[i];
            input.value = typeOfInternship[i];
            input.setAttribute('class', 'ms-4 typeOfInternshipStatus')
            input.setAttribute('type', 'radio')
            input.setAttribute('name', 'typeOfInternship')
            typeInternship.appendChild(input);
            typeInternship.appendChild(label);
        }
        const radio_typeOfInternship = document.querySelectorAll('input[name="typeOfInternship"]');

        for (const radioButton of radio_typeOfInternship) {
            radioButton.addEventListener("change", () => {
                const selected = document.querySelector('input[name="typeOfInternship"]:checked').value;
                console.log(selected)
                if (selected == "Part time") {
                    document.getElementsByClassName("typeOfInternshipStatus")[0].classList.add("type-status")
                    document.getElementsByClassName("typeOfInternshipStatus")[1].classList.remove("type-status")
                }
                else {
                    document.getElementsByClassName("typeOfInternshipStatus")[1].classList.add("type-status")
                    document.getElementsByClassName("typeOfInternshipStatus")[0].classList.remove("type-status")
                }
            });
        }

        for (var i = 0; i < paidUnpaid.length; i++) {
            var input = document.createElement("input");
            var label = document.createElement("label");
            label.innerText = paidUnpaid[i];
            input.value = paidUnpaid[i];
            input.setAttribute('class', 'stipendstatus ms-4')
            input.setAttribute('type', 'radio')
            input.setAttribute('name', 'paidOrUnpaid')
            paidOrUnpaid.appendChild(input);
            paidOrUnpaid.appendChild(label);

        }
        const radioButtons = document.querySelectorAll('input[name="paidOrUnpaid"]');

        for (const radioButton of radioButtons) {
            radioButton.addEventListener("change", () => {
                const selected = document.querySelector('input[name="paidOrUnpaid"]:checked').value;
                console.log(selected)
                if (selected == "Paid") {
                    document.getElementById("stipenid").style.display = "block"
                    document.getElementById("stipend").value = "";
                    document.getElementsByClassName("stipendstatus")[0].classList.add("Paid-status")
                    document.getElementsByClassName("stipendstatus")[1].classList.remove("Paid-status")
                }
                else {
                    document.getElementById("stipenid").style.display = "none"
                    document.getElementById("stipend").value = 0;
                    document.getElementsByClassName("stipendstatus")[1].classList.add("Paid-status")
                    document.getElementsByClassName("stipendstatus")[0].classList.remove("Paid-status")
                }
            });
        }
    })
    .catch(error => {
        console.log(error);
    })

     function updateperks(checkbox) {
         var resultInput = document.getElementById("perks");
         var currentValue = resultInput.value;
         var checkboxValue = checkbox.value;

         if (checkbox.checked) {
             if (currentValue === "") {
                 resultInput.value = checkboxValue;
             } else {
                 resultInput.value = currentValue + "," + checkboxValue;
             }
         } else {
             var values = currentValue.split(",");
             var index = values.indexOf(checkboxValue);

             if (index !== -1) {
                 values.splice(index, 1);
                 resultInput.value = values.join(",");
             }
         }
     }

  
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0');
     var yyyy = today.getFullYear();

     today = yyyy + '-' + mm + '-' + dd;
     $('#lastDateToApply').attr('min', today);

     
// Closes an alert by removing it from the DOM. If the .fade and .show classes are present on the element, the alert will fade out before it is removed.
$(document).on('click', '.alert .btn-close', function (e) {
    $(this).parent().remove();
});



$('#typeOfCompany').change(function () {
    var typeOfCompany = $(this).val();
    // if typeOfCompany is PVT/LTD or LLP then show input field of CIN number
    if (typeOfCompany == "PVT/LTD" || typeOfCompany == "LLP") {
        $('#cindiv').show();
        $('#cin').val("");
    } else {
        $('#cindiv').hide();
        $('#cin').val("0");
    }

});




$('#previewForm').on('click', function () {
    var companyName = $('#companyName').val();
    var position = $('#position').val();
    var briefDescription = $('#briefDescription').val();
    var state = $('#state').val();
    var city = $('#city').val();
    var paidOrUnpaid = $('.Paid-status').val();
    // this is handdled onClick
    var stipend = $('#stipend').val();
    var duration = $('#duration').val();
    var morw = $('#morw').val();
    var skillsRequired = $('#skillsRequired').val();
    var numberOfOpenings = $('#numberOfOpenings').val();
    var lastDateToApply = $('#lastDateToApply').val();
    var typeOfInternship = $('.type-status').val();
    var typeOfCompany = $('#typeOfCompany').val();
    var modeOfInternship = $('.mode-status').val();
    var category = $('#category').val();
    var rolesAndResponsibilities = $('#rolesAndResponsibilities').val();
    var perks = $('#perks').val();
    var whoCanApply = $('#whoCanApply').val();
    var totalNumberOfApplicants = $('#totalNumberOfApplicants').val();
    var criteriaForSelection = $('#criteriaForSelection').val();

    var previewformdetail = `<table class="table table-borderless">
<tbody>
  <tr>
    <th scope="col">Company Name:</th>
    <td>${companyName}</td>
  </tr>
    <tr>
        <th scope="col">Position:</th>
        <td>${position}</td>
    </tr>
    <tr>
        <th scope="col">Brief Description:</th>
        <td>${briefDescription}</td>
    </tr>
    <tr>
        <th scope="col">State:</th>
        <td>${state}</td>
    </tr>
    <tr>
        <th scope="col">City:</th>

        <td>${city}</td>
    </tr>
    <tr>
        <th scope="col">Paid or Unpaid:</th>
        <td>${paidOrUnpaid}</td>
    </tr>
    <tr>
        <th scope="col">Stipend:</th>
        <td>${stipend}</td>
    </tr>
    <tr>
        <th scope="col">Duration:</th>
        <td>${duration}</td>
    </tr>
    <tr>
    <th scope="col">Months or Weeks:</th>
    <td>${morw}</td>
</tr>
    <tr>
        <th scope="col">Skills Required:</th>
        <td>${skillsRequired}</td>

    </tr>
    <tr>
        <th scope="col">Number Of Openings:</th>
        <td>${numberOfOpenings}</td>
    </tr>
    <tr>
        <th scope="col">Last Date To Apply:</th>
        <td>${lastDateToApply}</td>
    </tr>
    


    <tr>
        <th scope="col">Type Of Internship:</th>
        <td>${typeOfInternship}</td>
    </tr>
    <tr>
        <th scope="col">Mode Of Internship:</th>
        <td>${modeOfInternship}</td>
    </tr>
    <tr>
        <th scope="col">Category:</th>
        <td>${category}</td>
    </tr>
    <tr>
        <th scope="col">Roles And Responsibilities:</th>
        <td>${rolesAndResponsibilities}</td>
    </tr>
    <tr>
        <th scope="col">Perks:</th>
        <td>${perks}</td>
    </tr>
    <tr>
        <th scope="col">Type Of Company:</th>
        <td>${typeOfCompany}</td>
    </tr>
    <tr>
        <th scope="col">Who Can Apply:</th>
        <td>${whoCanApply}</td>
    </tr>
    <tr>
        <th scope="col">Criteria For Selection:</th>
        <td>${criteriaForSelection}</td>
    </tr>
    <tr>
    <th scope="col">Criteria For Selection:</th>
    <td>${totalNumberOfApplicants}</td>
</tr>
</tbody>`;



    $('#previewformdetail').html(previewformdetail);

    // if any of the field is empty then show alert

    if (companyName == '' || position == '' || briefDescription == '' || state == '' || city == '' || paidOrUnpaid == '' || stipend == '' || duration == '' || morw == '' || skillsRequired == '' || numberOfOpenings == '' || lastDateToApply == ''|| typeOfInternship == '' || modeOfInternship == '' || category == '' || rolesAndResponsibilities == '' || perks == '' || whoCanApply == '' || criteriaForSelection == ''|| totalNumberOfApplicants==' ') {
        // alert('Please fill all the fields');
        console.log(companyName, position, briefDescription, state, city, paidOrUnpaid, stipend, duration, morw, skillsRequired, numberOfOpenings, lastDateToApply, typeOfInternship, modeOfInternship, category, rolesAndResponsibilities, perks, whoCanApply, criteriaForSelection);
        $('#alertfill').html('<div class="alert alert-danger" role="alert">Please fill all the fields</div>');
    }

})





