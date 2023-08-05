// fetch('/api/Categories')
// .then(response => response.json())
// .then(data => {
//     let categories=data.data.categories[0].researchPaper.category;
//     let needs=data.data.categories[0].researchPaper.needof;

//     console.log(categories);
//     categories.forEach(category => {
//         $('#category').append(`<option value="${category}">${category}</option>`)
//     });
//     needs.forEach(need => {
//         $('#needof').append(`<option value="${need}">${need}</option>`)
//     });

// })

fetch("/api/Categories")
    .then(response => response.json())
    .then(data => {
        console.log("data", data);

        var college = data.data.categories[0].researchPaper.college;
        var university = data.data.categories[0].researchPaper.university;

        var collegeName = document.getElementsByClassName("collegeName");
        var universityName = document.getElementsByClassName("universityName");

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
    })
    .catch(error => {
        console.log(error);
    })


$('.alert .btn-close').on('click', function(e) {
    $(this).parent().remove();
});

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

function updateCheckboxValue(checkbox) {
    if (checkbox.checked) {
      checkbox.value = 'true';
    } else {
      checkbox.value = 'false';
    }
  }

  
  