const input = document.querySelector("#search-input");
const content = document.querySelector("#search-content");
const elements = content.querySelectorAll(".mentor-card");
input.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    for (let element of elements) {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }
});


fetch("/api/Categories")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var Specialization = data.data.categories[0].mentorProfile.Specialization;
        var typeOfMentor = data.data.categories[0].mentorProfile.typeOfMentor;
        // var university=data.data.categories[0].mentorProfile.university;
        // var location=data.data.categories[0].mentorProfile.location;


        var specializationFilter = document.getElementById("specializationFilter");
        var typeOfMentorFilter = document.getElementById("typeOfMentorFilter");
        // var collegeFilter = document.getElementById("collegeFilter");
        // var spcializationFilter = document.getElementById("spcializationFilter");
        //     <div class="btn-group shadow-0 filterButton">
        //     <button type="button" class="btn btn-dark dropdown-toggle" data-mdb-toggle="dropdown" aria-expanded="false" id="collegeFilter">
        //         Action
        //       </button>
        //       <ul class="dropdown-menu">
        //         <li><a class="dropdown-item" href="#">Action</a></li>
        //         <li><a class="dropdown-item" href="#">Another action</a></li>
        //         <li><a class="dropdown-item" href="#">Something else here</a></li>
        //         <li><hr class="dropdown-divider" /></li>
        //         <li><a class="dropdown-item" href="#">Separated link</a></li>
        //       </ul>
        //   </div>
        for (var i = 0; i < Specialization.length; i++) {
            var option = document.createElement("option");
            option.text = Specialization[i];
            option.value = Specialization[i];
            specializationFilter.add(option);
        }
        for (var i = 0; i < typeOfMentor.length; i++) {
            var option = document.createElement("option");
            option.text = typeOfMentor[i];
            option.value = typeOfMentor[i];
            typeOfMentorFilter.add(option);
        }

        // specializationFilter.addEventListener("change", function () {
        //     alert(specializationFilter.value);
        //     filterContent(specializationFilter.value, typeOfMentorFilter.value);

        // })
        // typeOfMentorFilter.addEventListener("change", function () {
        //     alert(typeOfMentorFilter.value);
        //     filterContent(specializationFilter.value, typeOfMentorFilter.value);

        // })


        // find the valud of the selected field in the dropdown and then use it to filter the data


        // for (var i = 0; i < university.length; i++) {
        //     spcializationFilter.innerHTML += ` <li><a class="dropdown-item" href="#">${university[i]}</a></li>`
        // }



    })
    .catch(error => {
        console.log(error);
    })


function filterContent(Specialization, typeOfMentor) {

    if (Specialization != "" && typeOfMentor != "") {
        var filterUrl = `/api/mentors?Specialization=${Specialization}&typeOfMentor=${typeOfMentor}`;
        alert(filterUrl);
    }
    else if (Specialization != "") {
        var filterUrl = `/api/mentors?Specialization=${Specialization}`;
        alert(filterUrl);
    }
    else if (typeOfMentor != "") {
        var filterUrl = `/api/mentors?typeOfMentor=${typeOfMentor}`;
        alert(filterUrl);
    }
    fetch(filterUrl, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            alert("data", data);
        })
        .catch(error => {
            alert("err", error);
        })







}
$('#specializationFilter').on('change', dummyfilter);
$('#typeOfMentorFilter').on('change', dummyfilter);
function dummyfilter() {
    console.log("dummyfilter");
    $('.mentor-card').each(function () {
        console.log($(this).find('#specMentor').text().toLowerCase(), ($('#specializationFilter').val().toLowerCase()));
        console.log($('#specializationFilter').val());
        console.log($(this).find('#typeMentor').text().toLowerCase(), ($('#typeOfMentorFilter').val().toLowerCase()));
        console.log($('#typeOfMentorFilter').val());

        if ($('#specializationFilter').val() != "" && $('#typeOfMentorFilter').val() != "") {
            if ($(this).find('#specMentor').text().toLowerCase().indexOf($('#specializationFilter').val().toLowerCase()) != -1 && $(this).find('#typeMentor').text().toLowerCase().indexOf($('#typeOfMentorFilter').val().toLowerCase()) != -1) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        }
        else if ($('#specializationFilter').val() != "") {
            if ($(this).find('#specMentor').text().toLowerCase().indexOf($('#specializationFilter').val().toLowerCase()) != -1) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        }
        else if ($('#typeOfMentorFilter').val() != "") {
            if ($(this).find('#typeMentor').text().toLowerCase().indexOf($('#typeOfMentorFilter').val().toLowerCase()) != -1) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        }
        else {
            $(this).show();
        }
        


        // if($(this).find('#specMentor').text().toLowerCase().indexOf($('#specializationFilter').val().toLowerCase())!=-1 ){
        //     if ($(this).find('#typeMentor').text().toLowerCase().indexOf($('#typeOfMentorFilter').val())!=-1 && $('#typeOfMentorFilter').val()!="") {
        //         console.log("both");
        //         $(this).show();
        //     }
        //   $(this).show();
        // }
        // else{
        //   $(this).hide();
        // }
    });

}