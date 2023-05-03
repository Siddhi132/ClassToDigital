const teamMember_container = document.getElementById('teamMember-container');
const teamMember_tags_input = document.getElementById('teamMember-tags-input');
const teamMember_input = document.getElementById('teamMembers');
const teamMember_tags = [];

const skillsToBeLearned_container = document.getElementById('skillsToBeLearned-container');
const skillsToBeLearned_tags_input = document.getElementById('skillsToBeLearned-tags-input');
const skillsToBeLearned_input = document.getElementById('skillsToBeLearned');
const skillsToBeLearned_tags = [];

const technologiesUsed_container = document.getElementById('technologiesUsed-container');
const technologiesUsed_tags_input = document.getElementById('technologiesUsed-tags-input');
const technologiesUsed_input = document.getElementById('technologiesUsed');
const technologiesUsed_tags = [];

const submit_btn = document.getElementById("submitProjectRepoForm");

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



// $(function () {

//     var input = document.querySelectorAll("input[name=phone]");
//     var iti_el = $('.iti.iti--allow-dropdown.iti--separate-dial-code');
//     if (iti_el.length) {
//         iti.destroy();

//         // Get the current number in the given format



//     }
//     for (var i = 0; i < input.length; i++) {
//         iti = intlTelInput(input[i], {
//             autoHideDialCode: false,
//             autoPlaceholder: "aggressive",
//             initialCountry: "auto",
//             separateDialCode: true,
//             preferredCountries: ['ru', 'th'],
//             customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
//                 return '' + selectedCountryPlaceholder.replace(/[0-9]/g, 'X');
//             },
//             geoIpLookup: function (callback) {
//                 $.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
//                     var countryCode = (resp && resp.country) ? resp.country : "";
//                     callback(countryCode);
//                 });
//             },
//             utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js" // just for 
//         });


//         $('input[name="phone"]').on("focus click countrychange", function (e, countryData) {

//             var pl = $(this).attr('placeholder') + '';
//             var res = pl.replace(/X/g, '9');
//             if (res != 'undefined') {
//                 $(this).inputmask(res, { placeholder: "X", clearMaskOnLostFocus: true });
//             }




//         });

//         $('input[name="phone"]').on("focusout", function (e, countryData) {
//             var intlNumber = iti.getNumber();
//             console.log(intlNumber);
//         });
//         $('input[name="phone"]').on('input', function (e, countryData) {
//             var intlNumber = iti.getNumber();
//             $(this).val(intlNumber);
//             console.log(intlNumber);
//         });

//     }


// })

function sendData(e) {
    fetch('api/getNameAutocomplete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: e.value }),
    })
        .then((res) => res.json())
        .then((data) => {
            var availableTags = [];

            let payload = data.payload;
            console.log(payload);

            $("#teamMembers").autocomplete({
                source: payload
            });
        });
}




teamMember_input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { 
        event.preventDefault();
        const tagText = teamMember_input.value.trim();


        if (tagText) {
            const tagButton = document.createElement('button');
            tagButton.className = 'btn btn-secondary  btn-sm tag-button'
            tagButton.setAttribute('style', 'border-radius: 60px; padding-right: .5em')
            tagButton.innerHTML = tagText; // main button with the text from input field

            const closeIcon = document.createElement('button');
            closeIcon.setAttribute('class', 'btn-close close-button')
            closeIcon.setAttribute('aria-label', 'Close')
            closeIcon.setAttribute('style', 'margin-left: 0.2em')

            tagButton.appendChild(closeIcon); // appending the close button in main button

            tagButton.classList.add('tag');
            
            // On clicking close button
            // Removing the button and deleting the element from array
            closeIcon.addEventListener('click', () => {
                tagButton.remove();
                teamMember_tags.splice(teamMember_tags.indexOf(tagText), 1);
                updateteamMember_tags_input();
            });
            teamMember_container.appendChild(tagButton);
            teamMember_tags.push(tagText);
            updateteamMember_tags_input();
            teamMember_input.value = '';
        }
    }
    console.log("tags: ", teamMember_tags)
});

function updateteamMember_tags_input() {
    teamMember_tags_input.value = JSON.stringify(teamMember_tags);
}


skillsToBeLearned_input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { 
        event.preventDefault();
        const tagText = skillsToBeLearned_input.value.trim();

        
        if (tagText) {
            const tagButton = document.createElement('button');
            tagButton.className = 'btn btn-secondary      btn-sm'
            tagButton.innerHTML = tagText; // main button with the text from input field
            tagButton.setAttribute('style', 'border-radius: 60px; padding-right: .5em')
            
            const closeIcon = document.createElement('button');
            closeIcon.setAttribute('class', 'btn-close close-button')
            closeIcon.setAttribute('aria-label', 'Close')

            tagButton.appendChild(closeIcon); // appending the close button in main button
            
            tagButton.classList.add('tag');
            
            // On clicking close button
            // Removing the button and deleting the element from array
            closeIcon.addEventListener('click', () => {
                tagButton.remove();
                skillsToBeLearned_tags.splice(skillsToBeLearned_tags.indexOf(tagText), 1);
                updateskillsToBeLearned_tags_input();
            });
            skillsToBeLearned_container.appendChild(tagButton);
            skillsToBeLearned_tags.push(tagText);
            updateskillsToBeLearned_tags_input();
            skillsToBeLearned_input.value = '';
        }
    }
});

function updateskillsToBeLearned_tags_input() {
    console.log("skills tag update:", skillsToBeLearned_tags)
    skillsToBeLearned_tags_input.value = JSON.stringify(skillsToBeLearned_tags);
}

technologiesUsed_input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { 
        event.preventDefault();
        const tagText = technologiesUsed_input.value.trim();

        
        if (tagText) {
            const tagButton = document.createElement('button');
            tagButton.className = 'btn btn-secondary      btn-sm'
            tagButton.innerHTML = tagText; // main button with the text from input field
            tagButton.setAttribute('style', 'border-radius: 60px; padding-right: .5em')
            
            const closeIcon = document.createElement('button');
            closeIcon.setAttribute('class', 'btn-close close-button')
            closeIcon.setAttribute('aria-label', 'Close')

            tagButton.appendChild(closeIcon); // appending the close button in main button
            
            tagButton.classList.add('tag');
            
            // On clicking close button
            // Removing the button and deleting the element from array
            closeIcon.addEventListener('click', () => {
                tagButton.remove();
                technologiesUsed_tags.splice(technologiesUsed_tags.indexOf(tagText), 1);
                updatetechnologiesUsed_tags_input();
            });
            technologiesUsed_container.appendChild(tagButton);
            technologiesUsed_tags.push(tagText);
            updatetechnologiesUsed_tags_input();
            technologiesUsed_input.value = '';
        }
    }
});

function updatetechnologiesUsed_tags_input() {
    console.log("skills tag update:", technologiesUsed_tags)
    technologiesUsed_tags_input.value = JSON.stringify(technologiesUsed_tags);
}

submit_btn.addEventListener('click', () =>{
    teamMember_tags_input.value = teamMember_tags.join(",");
    skillsToBeLearned_tags_input.value = skillsToBeLearned_tags.join(",");
    technologiesUsed_tags_input.value = technologiesUsed_tags.join(",");
})