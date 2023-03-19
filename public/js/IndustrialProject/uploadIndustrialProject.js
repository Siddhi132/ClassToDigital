
fetch("/api/Categories")
.then(response => response.json())
.then(data => {
    console.log(data);
        
    var industrialProjectLocation=data.data.categories[0].industrialProject.location;
    var industrialProjectCategory=data.data.categories[0].industrialProject.category;
    var modeOfIndustrialProject=data.data.categories[0].industrialProject.modeOfIndustrialProject;
    var typeOfIndustrialProject=data.data.categories[0].industrialProject.typeOfIndustrialProject;
    var paidUnpaid=data.data.categories[0].industrialProject.paidUnpaid;

    var location = document.getElementById("location");
    var category = document.getElementById("category");
    var modeIndustrialProject = document.getElementById("modeOfIndustrialProject");
    var typeIndustrialProject = document.getElementById("typeOfIndustrialProject");
    var paidOrUnpaid = document.getElementById("paidOrUnpaid");

    for (var i = 0; i < industrialProjectLocation.length; i++) {
        var option = document.createElement("option");
        option.text = industrialProjectLocation[i];
        option.value = industrialProjectLocation[i];
        location.add(option);
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
$(document).on('click', '.alert .btn-close', function(e) {
    $(this).parent().remove();
});

$("#paidOrUnpaid").change(function () {
    var paidOrUnpaid = $(this).val();

    if (paidOrUnpaid == "Paid") {
        // show and hide div with animation 
        $("#stipenddiv").show();


        // $("#stipenddiv").show();
    } else {
        $("#stipenddiv").hide();
    }
});


