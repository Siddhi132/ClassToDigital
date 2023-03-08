
    fetch("/api/Categories")
    .then(response => response.json())
    .then(data => {
        console.log(data);
            
        var internshipLocation=data.data.categories[0].internship.location;
        var internshipCategory=data.data.categories[0].internship.category;
        var modeOfInternship=data.data.categories[0].internship.modeOfInternship;
        var typeOfInternship=data.data.categories[0].internship.typeOfInternship;
        var paidUnpaid=data.data.categories[0].internship.paidUnpaid;

        var location = document.getElementById("location");
        var category = document.getElementById("category");
        var modeInternship = document.getElementById("modeOfInternship");
        var typeInternship = document.getElementById("typeOfInternship");
        var paidOrUnpaid = document.getElementById("paidOrUnpaid");

        for (var i = 0; i < internshipLocation.length; i++) {
            var option = document.createElement("option");
            option.text = internshipLocation[i];
            option.value = internshipLocation[i];
            location.add(option);
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
    $(document).on('click', '.alert .btn-close', function(e) {
        $(this).parent().remove();
    });


