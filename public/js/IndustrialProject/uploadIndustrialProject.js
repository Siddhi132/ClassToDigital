
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
            var option = document.createElement("option");
            option.text = industrialProjectState[i];
            option.value = industrialProjectState[i];
            state.add(option);
        } for (var i = 0; i < industrialProjectCity.length; i++) {
            var option = document.createElement("option");
            option.text = industrialProjectCity[i];
            option.value = industrialProjectCity[i];
            city.add(option);
        }

        for (var i = 0; i < industrialProjectCategory.length; i++) {
            var option = document.createElement("option");
            option.text = industrialProjectCategory[i];
            option.value = industrialProjectCategory[i];
            category.add(option);
        }

        for (var i = 0; i < modeOfIndustrialProject.length; i++) {
            var option = document.createElement("option");
            option.text = modeOfIndustrialProject[i];
            option.value = modeOfIndustrialProject[i];
            modeIndustrialProject.add(option);
        }

        for (var i = 0; i < typeOfIndustrialProject.length; i++) {
            var option = document.createElement("option");
            option.text = typeOfIndustrialProject[i];
            option.value = typeOfIndustrialProject[i];
            typeIndustrialProject.add(option);
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
    var projectTitle = $('#projectTitle').val();
    var companyName = $('#companyName').val();
    var position = $('#position').val();
    var briefDescription = $('#briefDescription').val();
    var state = $('#state').val();
    var city = $('#city').val();
    var paidOrUnpaid = $('#paidOrUnpaid').val();
    var stipend = $('#stipend').val();
    var duration = $('#duration').val();
    var skillsRequired = $('#skillsRequired').val();
    var numberOfOpenings = $('#numberOfOpenings').val();
    var lastDateToApply = $('#lastDateToApply').val();
    var contactDetails = $('#contactDetails').val();
    var typeOfIndustrialProject = $('#typeOfIndustrialProject').val();
    var modeOfIndustrialProject = $('#modeOfIndustrialProject').val();
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
<th scope="col">Who Can Apply:</th>
<td>${whoCanApply}</td>
</tr>
<tr>
<th scope="col">Criteria For Selection:</th>
<td>${criteriaForSelection}</td>
</tr>

</tbody>`;



    $('#previewformdetail').html(previewformdetail);

    if (projectTitle == '' || companyName == '' || position == '' || briefDescription == '' || state == '' ||city==''|| paidOrUnpaid == '' || stipend == '' || duration == '' || skillsRequired == '' || numberOfOpenings == '' || lastDateToApply == '' || contactDetails == '' || typeOfIndustrialProject == '' || modeOfIndustrialProject == '' || category == '' || rolesAndResponsibilities == '' || perks == '' || whoCanApply == '' || criteriaForSelection == '') {
        // alert('Please fill all the fields');
        $('#alertfill').html('<div class="alert alert-danger" role="alert">Please fill all the fields</div>');
    }
})


