
fetch("/api/Categories")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        var industrialProjectState = data.data.categories[0].industrialProject.state;
        var industrialProjectCity = data.data.categories[0].industrialProject.city;
        var industrialProjectCategory = data.data.categories[0].industrialProject.category;
        var modeOfIndustrialProject = data.data.categories[0].industrialProject.modeOfIndustrialProject;
        var typeOfIndustrialProject = data.data.categories[0].industrialProject.typeOfIndustrialProject;
        var paidUnpaid = data.data.categories[0].industrialProject.paidUnpaid;
        var state = document.getElementById("state");
        var city = document.getElementById("city");
        var category = document.getElementById("category");
        var modeIndustrialProject = document.getElementById("modeOfIndustrialProject");
        var typeIndustrialProject = document.getElementById("typeOfIndustrialProject");
        var paidOrUnpaid = document.getElementById("paidOrUnpaid");

        for (var i = 0; i < industrialProjectState.length; i++) {
            console.log("ewdw")
            var option = document.createElement("option");
            option.text = industrialProjectState[i];
            option.value = industrialProjectState[i];
            state.add(option);
        } for (var i = 0; i < industrialProjectCity.length; i++) {
            console.log("ew")
            var option = document.createElement("option");
            option.text = industrialProjectCity[i];
            option.value = industrialProjectCity[i];
            city.add(option);
        }

        for (var i = 0; i < industrialProjectCategory.length; i++) {
            console.log("e")
            var option = document.createElement("option");
            option.text = industrialProjectCategory[i];
            option.value = industrialProjectCategory[i];
            category.add(option);
        }

        for (var i = 0; i < modeOfIndustrialProject.length; i++) {
            
            var input = document.createElement("input");
            var label = document.createElement("label");
            label.innerText = modeOfIndustrialProject[i];
            input.value = modeOfIndustrialProject[i];
            input.setAttribute('class', 'ms-4 modeOfInternshipStatus')
            input.setAttribute('type', 'radio')
            input.setAttribute('name', 'modeOfIndustrialProject')
            modeIndustrialProject.appendChild(input);
            modeIndustrialProject.appendChild(label);
            console.log("1")
        }

        const radio_modeOfInternship = document.querySelectorAll('input[name="modeOfIndustrialProject"]');

        for (const radioButton of radio_modeOfInternship) {
            radioButton.addEventListener("change", () => {
                const selected = document.querySelector('input[name="modeOfIndustrialProject"]:checked').value;
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

        for (var i = 0; i < typeOfIndustrialProject.length; i++) {
            var input = document.createElement("input");
            var label = document.createElement("label");
            label.innerText = typeOfIndustrialProject[i];
            input.value = typeOfIndustrialProject[i];
            input.setAttribute('class', 'ms-4 typeOfInternshipStatus')
            input.setAttribute('type', 'radio')
            input.setAttribute('name', 'typeOfIndustrialProject')
            typeIndustrialProject.appendChild(input);
            typeIndustrialProject.appendChild(label);
        }

        const radio_typeOfInternship = document.querySelectorAll('input[name="typeOfIndustrialProject"]');

        for (const radioButton of radio_typeOfInternship) {
            radioButton.addEventListener("change", () => {
                const selected = document.querySelector('input[name="typeOfIndustrialProject"]:checked').value;
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
            console.log("pu")
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
    var projectTitle = $('#projectTitle').val();
    var companyName = $('#companyName').val();
    var position = $('#position').val();
    var briefDescription = $('#briefDescription').val();
    var state = $('#state').val();
    var city = $('#city').val();
    var paidOrUnpaid = $('.Paid-status').val();
    var stipend = $('#stipend').val();
    var duration = $('#duration').val();
    var morw = $('#morw').val();
    var skillsRequired = $('#skillsRequired').val();
    var numberOfOpenings = $('#numberOfOpenings').val();
    var lastDateToApply = $('#lastDateToApply').val();
    // var contactDetails = $('#contactDetails').val();
    var typeOfIndustrialProject = $('.type-status').val();
    var typeOfCompany = $('#typeOfCompany').val();
    var modeOfIndustrialProject = $('.mode-status').val();
    var category = $('#category').val();
    var rolesAndResponsibilities = $('#rolesAndResponsibilities').val();
    var perks = $('#perks').val();
    var whoCanApply = $('#whoCanApply').val();
    var totalNumberOfApplicants = $('#totalNumberOfApplicants').val();
    var criteriaForSelection = $('#criteriaForSelection').val();


    var previewformdetail = `<table class="table table-borderless">
<tbody>
<tr>
<th scope="col">Project Title:</th>
<td>${projectTitle}</td>
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
</tr><tr>
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
<th scope="col">Type Of Industrial project:</th>
<td>${typeOfIndustrialProject}</td>
</tr>
<tr>
<th scope="col">Mode Of Industrial project:</th>
<td>${modeOfIndustrialProject}</td>
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
<th scope="col">Total Number Of Applicants:</th>
<td>${totalNumberOfApplicants}</td>
</tr>
<tr>
<th scope="col">Criteria For Selection:</th>
<td>${criteriaForSelection}</td>
</tr>

</tbody>`;



    $('#previewformdetail').html(previewformdetail);

    if (projectTitle == '' || companyName == '' || position == '' || briefDescription == '' || state == '' ||city==''|| paidOrUnpaid == '' || stipend == '' || duration == ''||morw == '' || skillsRequired == '' || numberOfOpenings == '' || lastDateToApply == '' || totalNumberOfApplicants == '' || typeOfIndustrialProject == '' || modeOfIndustrialProject == '' || category == '' || rolesAndResponsibilities == '' || perks == '' || whoCanApply == '' || criteriaForSelection == '') {
        // alert('Please fill all the fields');
        console.log(companyName, position, briefDescription, state, city, paidOrUnpaid, stipend, duration, morw, skillsRequired, numberOfOpenings, lastDateToApply, category, rolesAndResponsibilities, perks, whoCanApply, criteriaForSelection);
        $('#alertfill').html('<div class="alert alert-danger" role="alert">Please fill all the fields</div>');
    }
})


