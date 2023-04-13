

fetch("/api/Categories")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        var college = data.data.categories[0].projectRepository.college;
        var university = data.data.categories[0].projectRepository.university;


        var collegeName = document.getElementById("collegeName");
        var universityName = document.getElementById("universityName");


        for (var i = 0; i < college.length; i++) {
            var option = document.createElement("option");
            option.text = college[i];
            option.value = college[i];
            collegeName.add(option);
        }

        for (var i = 0; i < university.length; i++) {
            var option = document.createElement("option");
            option.text = university[i];
            option.value = university[i];
            universityName.add(option);
        }



    })
    .catch(error => {
        console.log(error);
    })

// Closes an alert by removing it from the DOM. If the .fade and .show classes are present on the element, the alert will fade out before it is removed.
$(document).on('click', '.alert .btn-close', function (e) {
    $(this).parent().remove();
});



$(function () {

    var input = document.querySelectorAll("input[name=phone]");
    var iti_el = $('.iti.iti--allow-dropdown.iti--separate-dial-code');
    if (iti_el.length) {
        iti.destroy();

        // Get the current number in the given format



    }
    for (var i = 0; i < input.length; i++) {
        iti = intlTelInput(input[i], {
            autoHideDialCode: false,
            autoPlaceholder: "aggressive",
            initialCountry: "auto",
            separateDialCode: true,
            preferredCountries: ['ru', 'th'],
            customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                return '' + selectedCountryPlaceholder.replace(/[0-9]/g, 'X');
            },
            geoIpLookup: function (callback) {
                $.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js" // just for 
        });


        $('input[name="phone"]').on("focus click countrychange", function (e, countryData) {

            var pl = $(this).attr('placeholder') + '';
            var res = pl.replace(/X/g, '9');
            if (res != 'undefined') {
                $(this).inputmask(res, { placeholder: "X", clearMaskOnLostFocus: true });
            }




        });

        $('input[name="phone"]').on("focusout", function (e, countryData) {
            var intlNumber = iti.getNumber();
            console.log(intlNumber);
        });
        $('input[name="phone"]').on('input', function (e, countryData) {
            var intlNumber = iti.getNumber();
            $(this).val(intlNumber);
            console.log(intlNumber);
        });

    }


})