const phoneInputField = document.querySelector(".phone-ditail");
const info = document.querySelector(".alert-info");
const error = document.querySelector(".alert-error");
const contactDetails = document.querySelector("#contactDetails");

const teamMember_container = document.getElementById('teamMember-container');
const teamMember_tags_input = document.getElementById('teamMember-tags-input');
const teamMember_input = document.getElementById('teamMembers');
const teamMember_tags = [];

const guideName_container = document.getElementById('guideName-container');
const guideName_tags_input = document.getElementById('guideName-tags-input');
const guideName_input = document.getElementById('guideNames');
const guideName_tags = [];

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
        console.log("data", data);

        var college = data.data.categories[0].projectRepository.college;
        var university = data.data.categories[0].projectRepository.university;
        var city = data.data.categories[0].projectRepository.city;
        var state = data.data.categories[0].projectRepository.state;

        var collegeName = document.getElementsByClassName("collegeName");
        var universityName = document.getElementsByClassName("universityName");
        var cityName = document.getElementsByClassName("city");
        var stateName = document.getElementsByClassName("state");

        for (var i = 0; i < college.length; i++) {
            var option = document.createElement("option");
            option.text = college[i];
            option.value = college[i];
            for (var j = 0; j < collegeName.length; j++) {
                collegeName[j].add(option.cloneNode(true));
            }
        }

        for (var i = 0; i < university.length; i++) {
            var option = document.createElement("option");
            option.text = university[i];
            option.value = university[i];
            for (var j = 0; j < universityName.length; j++) {
                universityName[j].add(option.cloneNode(true));
            }
            // universityName.add(option);
        }

        for (var i = 0; i < city.length; i++) {
            var option = document.createElement("option");
            option.text = city[i];
            option.value = city[i];
            for (var j = 0; j < cityName.length; j++) {
                cityName[j].add(option.cloneNode(true));
            }
            // universityName.add(option);
        }

        for (var i = 0; i < state.length; i++) {
            var option = document.createElement("option");
            option.text = state[i];
            option.value = state[i];
            for (var j = 0; j < stateName.length; j++) {
                stateName[j].add(option.cloneNode(true));
            }



        }
    })
    .catch(error => {
        console.log(error);
    })

// Closes an alert by removing it from the DOM. If the .fade and .show classes are present on the element, the alert will fade out before it is removed.
$(document).on('click', '.alert .btn-close', function (e) {
    $(this).parent().remove();
});

const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

function process(event) {
    event.preventDefault();

    const phoneNumber = phoneInput.getNumber();

    info.style.display = "none";
    error.style.display = "none";

    if (phoneInput.isValidNumber()) {
        info.style.display = "block";
        info.innerHTML = `Valid Phone number : <strong>${phoneNumber}</strong>`;
        contactDetails.value = `${phoneNumber}`;
    } else {
        error.style.display = "block";
        error.innerHTML = `Invalid phone number.`;
    }
}

const isVerify = () => {
    if (info.style.display != "block") {
        alert("Please Verify Your Mobile Number");
    }
}


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
            tagButton.addEventListener('click', (clickEvent) => { clickEvent.preventDefault() })

            const closeIcon = document.createElement('button');
            closeIcon.setAttribute('class', 'btn-close close-button')
            closeIcon.setAttribute('aria-label', 'Close')
            closeIcon.setAttribute('style', 'margin-left: 0.4em; height: 0.5em;width: 0.5em; padding-bottom: 0px')

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

guideName_input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tagText = guideName_input.value.trim();


        if (tagText) {
            const tagButton = document.createElement('button');
            tagButton.className = 'btn btn-secondary  btn-sm tag-button'
            tagButton.setAttribute('style', 'border-radius: 60px; padding-right: .5em')
            tagButton.innerHTML = tagText; // main button with the text from input field
            tagButton.addEventListener('click', (clickEvent) => { clickEvent.preventDefault() })

            const closeIcon = document.createElement('button');
            closeIcon.setAttribute('class', 'btn-close close-button')
            closeIcon.setAttribute('aria-label', 'Close')
            closeIcon.setAttribute('style', 'margin-left: 0.4em; height: 0.5em;width: 0.5em; padding-bottom: 0px')

            tagButton.appendChild(closeIcon); // appending the close button in main button

            tagButton.classList.add('tag');

            // On clicking close button
            // Removing the button and deleting the element from array
            closeIcon.addEventListener('click', () => {
                tagButton.remove();
                guideName_tags.splice(guideName_tags.indexOf(tagText), 1);
                updateguideName_tags_input();
            });
            guideName_container.appendChild(tagButton);
            guideName_tags.push(tagText);
            updateguideName_tags_input();
            guideName_input.value = '';
        }
    }
    console.log("tags: ", guideName_tags)
});

function updateguideName_tags_input() {
    guideName_tags_input.value = JSON.stringify(guideName_tags);
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
            tagButton.addEventListener('click', (clickEvent) => { clickEvent.preventDefault() })

            const closeIcon = document.createElement('button');
            closeIcon.setAttribute('class', 'btn-close close-button')
            closeIcon.setAttribute('aria-label', 'Close')
            closeIcon.setAttribute('style', 'margin-left: 0.4em; height: 0.5em;width: 0.5em; padding-bottom: 0px')

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
            tagButton.addEventListener('click', (clickEvent) => { clickEvent.preventDefault() })


            const closeIcon = document.createElement('button');
            closeIcon.setAttribute('class', 'btn-close close-button')
            closeIcon.setAttribute('aria-label', 'Close')
            closeIcon.setAttribute('style', 'margin-left: 0.4em; height: 0.5em;width: 0.5em; padding-bottom: 0px')

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

submit_btn.addEventListener('click', () => {
    teamMember_tags_input.value = teamMember_tags.join(",");
    skillsToBeLearned_tags_input.value = skillsToBeLearned_tags.join(",");
    technologiesUsed_tags_input.value = technologiesUsed_tags.join(",");
})



function setActiveButton(buttonId, formId) {
    const buttons = document.querySelectorAll('.main-button');

    buttons.forEach(button => {
        button.classList.remove('btn-primary');
        button.classList.add('btn-secondary');

    });

    // Add active class to the selected button
    const selectedButton = document.getElementById(buttonId);
    selectedButton.classList.remove('btn-secondary');
    selectedButton.classList.add('btn-primary');


    // Show the corresponding form
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    const selectedForm = document.getElementById(formId);
    selectedForm.style.display = 'block';
}



function togglePatentInput() {
    const patentYesRadio = document.getElementById('patentYes');
    const patentInput = document.getElementById('patentInput');
    const patentnoInput = document.getElementById('patentnoInput');

    if (patentYesRadio.checked) {
        console.log("patentyes radio");
        patentInput.classList.remove('hidden');
        patentYesRadio.value = 'true';
        patentnoInput.setAttribute('required', 'true');
        document.querySelector('#patentInput .required-icon').classList.remove('hidden');
       
          
    } else {
        console.log("patentNO radio");
        patentInput.classList.add('hidden');
        patentYesRadio.value = 'false';
        patentnoInput.removeAttribute('required');
        document.querySelector('#patentInput .required-icon').classList.add('hidden');
    }
}
function toggleResearchInput() {
    const publishresearchpaperYesRadio = document.getElementById('publishresearchpaperYes');
    const publishresearchpaperInput = document.getElementById('linkresearchpaper');

    if (publishresearchpaperYesRadio.checked) {
        publishresearchpaperInput.classList.remove('hidden');
        publishresearchpaperYesRadio.value = 'true';
      
       
            document.getElementById('linkresearchpaperInput').setAttribute('required', 'true');
            document.querySelector('#patentInput .required-icon').classList.remove('hidden');
          
    } else {
        publishresearchpaperInput.classList.add('hidden');
        publishresearchpaperYesRadio.value = 'false';
        document.getElementById('linkresearchpaperInput').removeAttribute('required');
        document.querySelector('#linkresearchpaper .required-icon').classList.add('hidden');
    }
}

function toggleisProjectInput() {
    const isprojectStartedYesRadio = document.getElementById('isprojectStartedYes');
    const projectStartedDate = document.getElementById('projectStartedDate');
    const projectstartInput = document.getElementById('projectstartInput');

    if (isprojectStartedYesRadio.checked) {
    
        projectStartedDate.classList.remove('hidden');
        isprojectStartedYesRadio.value = 'true';
        projectstartInput.setAttribute('required', 'true');
        document.querySelector('#projectStartedDate .required-icon').classList.remove('hidden');
       
          
    } else {
      
        projectStartedDate.classList.add('hidden');
        isprojectStartedYesRadio.value = 'false';
        projectstartInput.removeAttribute('required');
        document.querySelector('#projectStartedDate .required-icon').classList.add('hidden');
    }
}
function toggleisProjectPartnerInput() {
    const isprojectStartedYesRadio = document.getElementById('isprojectStartedYesPartner');
    const projectStartedDate = document.getElementById('projectStartedDatePartner');
    const projectstartInput = document.getElementById('projectstartInputPartner');

    if (isprojectStartedYesRadio.checked) {
    
        projectStartedDate.classList.remove('hidden');
        isprojectStartedYesRadio.value = 'true';
        projectstartInput.setAttribute('required', 'true');
        document.querySelector('#projectStartedDatePartner .required-icon').classList.remove('hidden');
       
          
    } else {
      
        projectStartedDate.classList.add('hidden');
        isprojectStartedYesRadio.value = 'false';
        projectstartInput.removeAttribute('required');
        document.querySelector('#projectStartedDatePartner .required-icon').classList.add('hidden');
    }
}




