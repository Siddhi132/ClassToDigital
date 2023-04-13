
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
            var option = document.createElement("option");
            option.text = modeOfInternship[i];
            option.value = modeOfInternship[i];
            modeInternship.add(option);
        }

        for (var i = 0; i < typeOfInternship.length; i++) {
            var option = document.createElement("option");
            option.text = typeOfInternship[i];
            option.value = typeOfInternship[i];
            typeInternship.add(option);
        }

        for (var i = 0; i < paidUnpaid.length; i++) {
            var option = document.createElement("option");
            option.text = paidUnpaid[i];
            option.value = paidUnpaid[i];
            paidOrUnpaid.add(option);
        }

    })
    .catch(error => {
        console.log(error);
    })

// Closes an alert by removing it from the DOM. If the .fade and .show classes are present on the element, the alert will fade out before it is removed.
$(document).on('click', '.alert .btn-close', function (e) {
    $(this).parent().remove();
});

$("#paidOrUnpaid").change(function () {
    var paidOrUnpaid = $(this).val();

    if (paidOrUnpaid == "Paid") {
        // show and hide div with animation 
        $("#stipenddiv").show();
        $('#stipend').val("");



        // $("#stipenddiv").show();
    } else {
        $("#stipenddiv").hide();
        $('#stipend').val("0");

    }
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
    var paidOrUnpaid = $('#paidOrUnpaid').val();
    var stipend = $('#stipend').val();
    var duration = $('#duration').val();
    var morw= $('#morw').val();
    var skillsRequired = $('#skillsRequired').val();
    var numberOfOpenings = $('#numberOfOpenings').val();
    var lastDateToApply = $('#lastDateToApply').val();
    var contactDetails = $('#contactDetails').val();
    var typeOfInternship = $('#typeOfInternship').val();
    var modeOfInternship = $('#modeOfInternship').val();
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
        <th scope="col">Contact Details:</th>
        <td>${contactDetails}</td>
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
        <th scope="col">Who Can Apply:</th>
        <td>${whoCanApply}</td>
    </tr>
    <tr>
        <th scope="col">Criteria For Selection:</th>
        <td>${criteriaForSelection}</td>
    </tr>

</tbody>`;



    $('#previewformdetail').html(previewformdetail);

    // if any of the field is empty then show alert

    if (companyName == '' || position == '' || briefDescription == '' || state == '' || city == '' || paidOrUnpaid == '' || stipend == '' || duration == '' || morw =='' || skillsRequired == '' || numberOfOpenings == '' || lastDateToApply == '' || contactDetails == '' || typeOfInternship == '' || modeOfInternship == '' || category == '' || rolesAndResponsibilities == '' || perks == '' || whoCanApply == '' || criteriaForSelection == '') {
        // alert('Please fill all the fields');
        console.log(companyName, position, briefDescription, state, city, paidOrUnpaid, stipend, duration, morw, skillsRequired, numberOfOpenings, lastDateToApply, contactDetails, typeOfInternship, modeOfInternship, category, rolesAndResponsibilities, perks, whoCanApply, criteriaForSelection);
        $('#alertfill').html('<div class="alert alert-danger" role="alert">Please fill all the fields</div>');
    }

})


