const $filterBtn = $('#filter-btn');
const $hideFilter = $('#hide-filter-btn');
const $sidebar = $('.sidebar');
const $priceSlider = $('#price-slider');
var userId = document.currentScript.getAttribute('userId');
var userRole = document.currentScript.getAttribute('userRole');
let data = {
  "id": userId,
  "role": userRole
}
var alreadyAppliedInternships;

// slider value change 
$priceSlider.slider({
  range: true,
  min: 0,
  max: 50000,
  step: 1000,
  slide: function (event, ui) {
    let startValue = ui.values[0];
    let stipend = ui.values[1];
    $('.start').html(startValue);
    $('.end').html(stipend);
    console.log(startValue, stipend);
  }
});

// filter internship 
function filterinternships() {
  var data = {};
  var category = $("#category").val();
  var location = $("#location").val();
  let modeOfInternship = $('#modeOfInternship').val();
  let stipend = ($('#price-slider').slider('values'))[1];

  if ($('#typeOfInternship').is(":checked")) {
    console.log('checked');
    data['typeOfInternship'] = "Part time";
  }
  if ($('#paidOrUnpaid').is(":checked")) {
    console.log('checked');
    data['paidOrUnpaid'] = "Paid";
  }
  if (location) {
    data['location'] = location;
  }
  if (category) {
    data['category'] = category;
  }
  if (modeOfInternship) {
    data['modeOfInternship'] = modeOfInternship;
  }
  data['stipend'] = stipend;
  console.log("data123:", data);
  fetch('/api/allInternship?' + new URLSearchParams(data), {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => {
      console.log("data:", data);
      if (data.statusCode == 200) {
        var card = ``;
        var activeDeactive;
        var lengthOfArray = data.data.allinternship.length;
        $('#noOfInternshipFound').text(lengthOfArray + " Internships Found");
        data.data.allinternship.forEach(item => {
          if (item.status) {
            activeDeactive = 'Actively Hiring';
          }
          else {
            activeDeactive = 'Not Actively Hiring';
          }
          card += ` <div class="card">

       <div class="activeDeactive">
           
             <span>${activeDeactive}</span>
             
      
       </div>
       <div class="row">
           <div class="col-md-8">
               <h4>
                   ${item.position}
               </h4>
               <p id="companyName">
                 ${item.companyName}
               </p>
               <p><i class="fa-solid fa-location-dot"></i>
                 ${item.location}
       
             </p>
       
           </div>
           <div class="col-md-4">
               <img src="images/Internship/IBM_logo_in.jpg" width="50%" alt="">
           </div>
       </div>
       
       <div class="row">
           <div class="col-md-3">
               <p><i class="fa-regular fa-circle-play"></i>Start date</p>
               <p>
       
                 ${item.dateOfPosting.slice(0, 10)}
                 
               </p>
           </div>
           <div class="col-md-3">
               <p><i class="fa-regular fa-calendar"></i>Duration</p>
               <p>
                   ${item.duration}
               </p>
           </div>
           <div class="col-md-3">
               <p><i class="fa-solid fa-money-check"></i>Stipend</p>
               <p>
                   ${item.stipend}
               </p>
           </div>
       </div>
       <div class="paidOrUnpaid d-flex mb-3">
           <div class="ms-1 me-1">
               <span>
                   ${item.paidOrUnpaid}
               </span>
           </div>
           <div class="ms-1 me-1">
               <span><i class="fa-regular fa-clock"></i>
                 ${item.typeOfInternship}
               </span>
       
           </div>
           <div class="ms-1 me-1">
               <span><i class="fa fa-home-user"></i>
                 ${item.modeOfInternship}
               </span>
       
           </div>
       </div>
       <div class="totalApplication">
           <p>
             <i class="fa-regular fa-user"></i>
             ${item.totalNumberOfApplicants}
             Applicants
           </p>
           </div>
       <hr>
       <div class="d-flex flex-row-reverse">
           <div class="ms-2 me-2">
               <a href="internshipDetail?_id=${ item._id }" ><button class="btn btn-primary" id="detailbtn">View Details</button></a>
           </div>`;
          if (userId != "" && userRole == "student") {
            card += `  <button class="btn btn-secondary applynow"  data-id="${item._id}">
            Apply now

          </button>`;
          }
          else if (userId != "" && userRole != "student") {
            card += `<button class="btn btn-tertiary">
            You can't apply

          </button>`;
          }
          else {
            card += `<a href="/login"><button class="btn btn-secondary" id="login">
            Apply now
          </button></a>`;
          }


          card += ` </div>
       
       
       </div>`;
        });
        console.log("card", card);
        $('.listings').html(card);

      }
      else {
        card = `<div class="card" style="width:100%">
      <div class="card-body" style="padding:0px">
        <h5 class="card-title">${data.message}</h5>
      </div>`;
        $('.listings').html(card);
        $('#noOfInternshipFound').text("");

      }

    }
    );
}


// categories in filter section and modal form of apply 
fetch('/api/Categories')
  .then(res => res.json())
  .then(data => {
    console.log(data.data.categories[0]);
    let internships = data.data.categories[0].internship;
    let studentProfile = data.data.categories[0].studentProfile;
    let categories = internships.category;
    let locations = internships.location;
    let modeOfInternships = internships.modeOfInternship;
    categories.forEach(category => {
      $('#category').append(`<option value="${category}">${category}</option>`);
    });
    locations.forEach(location => {
      $('#location').append(`<option value="${location}">${location}</option>`);
    }
    );
    modeOfInternships.forEach(modeOfInternship => {
      $('#modeOfInternship').append(`<option value="${modeOfInternship}">${modeOfInternship}</option>`);
    }
    );

    // for modal to submit apply form 
    let education = studentProfile.education;
    let stream = studentProfile.stream;
    let college = studentProfile.college;
    let university = studentProfile.university;
    let branch = studentProfile.branch;
    let semester = studentProfile.semester;
    let state = studentProfile.state;

    education.forEach(education => {
      $('#education').append(`<option value="${education}">${education}</option>`);
    });
    stream.forEach(stream => {
      $('#stream').append(`<option value="${stream}">${stream}</option>`);
    }
    );
    college.forEach(college => {
      $('#college').append(`<option value="${college}">${college}</option>`);
    });
    university.forEach(university => {
      $('#university').append(`<option value="${university}">${university}</option>`);
    });
    branch.forEach(branch => {
      $('#branch').append(`<option value="${branch}">${branch}</option>`);
    });
    semester.forEach(semester => {
      $('#semester').append(`<option value="${semester}">${semester}</option>`);
    }
    );
    state.forEach(state => {
      $('#state').append(`<option value="${state}">${state}</option>`);
    }
    );

  }
  );



// submit filter form 
$(document).on('click', "#submitFilterForm", function (e) {
  console.log('filter form submitted');
  e.preventDefault();
  filterinternships();
  $sidebar.css('transform', 'translateX(-100%)');


});


// search by company name 
$(document).on('keyup', "#searchCompany", function (e) {
  $(this).val($(this).val().toLowerCase());

  $('.card').each(function () {
    if ($(this).find('#companyName').text().toLowerCase().indexOf($('#searchCompany').val()) == -1) {
      $(this).hide();
    }
    else {
      $(this).show();
    }
  });
});


// autofill value in modal 

fetch('/api/profile?' + new URLSearchParams(data), {
  method: 'GET',
})
  .then(res => res.json())
  .then(data => {
    console.log("i am ", data);
    if (data.statusCode == 200) {
      $('#name').val(data.data.user.name);
      $('#email').val(data.data.user.email);
      $('#phone').val(data.data.user.phone);
      $('#branch').val(data.data.user.branch);
      $('#college').val(data.data.user.college);
      $('#education').val(data.data.user.education);
      $('#state').val(data.data.user.state);
      $('#stream').val(data.data.user.stream);
      $('#university').val(data.data.user.university);
      $('#semester').val(data.data.user.semester);
    }
    // submit modal and apply complete 
    let arr = data.data.user.internships;
    alreadyAppliedInternships = arr;
    console.log(arr);
  })


// which internship apply btn click 
$(document).on('click', '.applynow', function (e) {
  let internshipId = $(this).attr('data-id');
  let loopend = 0;
  for (let i = 0; i < alreadyAppliedInternships.length && loopend != 1; i++) {
    if (alreadyAppliedInternships[i] == internshipId) {
      loopend = 1;
      console.log("already applied");
      $('#alreadyAppliedAlert').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
      You have already applied for this internship
      <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
    </div>`);
      break;
    }

  }
  if (loopend == 0) {
    $('#submitInternshipApp').attr('data-internshipId', internshipId);
    $('#applyNowModal').modal('show');
  }

})


// show filter sidebar
$filterBtn.on('click', function () {
  $sidebar.css('transform', 'translateX(0)');
});

// hide filter sidebar
$hideFilter.on('click', function () {
  $sidebar.css('transform', 'translateX(-100%)');
});


// submit internship application form 
$(document).on('click', "#submitInternshipApp", function (e) {
  var internshipId = $(this).attr('data-internshipId');
  var data = {
    "userId": userId,
    "internshipId": internshipId
  }
  var data2 = {}
  var formData = $('#internshipAppForm').serializeArray();
  for (var i = 0; i < formData.length; i++) {
    data2[formData[i].name] = formData[i].value;
  }
  var getCurrtime = new Date().getTime();
 if($('#resume').prop('files')[0] == undefined){
    $('#modalformalert').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Please upload your resume
    <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
  </div>`);
    return;
  }

  var resumeName = getCurrtime + $('#resume').prop('files')[0].name;
  var resumePath = "/studentProfile/Resumes/" + resumeName;
  var resumeData = {
    "name": resumeName,
    "path": resumePath
  }
  data2['resume'] = resumeData;
  console.log("data2", data2);
  console.log(internshipId);

  for (var key in data2) {
    if (data2[key] == "") {
      // console.log("empty value");
      $('#modalformalert').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
      Please fill all the fields
      <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
    </div>`);
      return;
    }
  }

  // save resume file in folder of that resumePath with resumeName in node js without api call
  var resumeFileData = new FormData();
  resumeFileData.append('resume', resumeName);
  resumeFileData.append('path', resumePath);
  console.log(resumeFileData);


  fetch('/api/applyForInternship', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.statusCode == 200) {
        fetch("/api/profile", {
          method: "post",
          body: JSON.stringify({ data: data2, "id": userId, "role": userRole }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(resp => resp.json())
          .then(data123 => {
            console.log("dummy...", data123);
            $('#applyNowModal').modal('hide');
            $('#successAlert').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
        ${data.message}
        <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
      </div>`);
          })
          .catch(err => {
            console.log(err);
          })

      }
      else {
        $('#applyNowModal').modal('hide');
        $('#errorAlert').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${data.message}
        <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
      </div>`);
      }
    })
    .catch(err => {
      console.log(err);
    });

  // $('#internshipAppForm').submit();


});