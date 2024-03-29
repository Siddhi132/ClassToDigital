const $filterBtn = $('#filter-btn');
const $hideFilter = $('#hide-filter-btn');
const $sidebar = $('.sidebar');
const $priceSlider = $('#price-slider');
var userId = document.currentScript.getAttribute('userId');
console.log(document.currentScript)
var userRole = document.currentScript.getAttribute('userRole');
let data = {
  "id": userId,
  "role": userRole
}
var alreadyAppliedIndustrialProjects;
// slider value change 
if ($priceSlider.slider) {
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
}

// filter IndustrialProject 
function filterIndustrialProject() {
  var data = {};
  var category = $("#category").val();
  var state = $("#statefilter").val();
  var city = $("#cityfilter").val();
  let modeOfIndustrialProject = $('#modeOfIndustrialProject').val();
  let stipend = ($('#price-slider').slider('values'))[1];

  if ($('#typeOfIndustrialProject').is(":checked")) {
    console.log('checked');
    data['typeOfIndustrialProject'] = "Part time";
  }
  if ($('#paidOrUnpaid').is(":checked")) {
    console.log('checked');
    data['paidOrUnpaid'] = "Paid";
  }
  if (state) {
    data['state'] = state;
  }
  if (city) {
    data['city'] = city;
  }
  if (category) {
    data['category'] = category;
  }
  if (modeOfIndustrialProject) {
    data['modeOfIndustrialProject'] = modeOfIndustrialProject;
  }
  data['stipend'] = stipend;
  console.log("data123:", data);
  showLoader()
  fetch('/api/allIndustrialProjects?' + new URLSearchParams(data), {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => {
      hideLoader();
      console.log("data:", data);
      if (data.statusCode == 200) {
        var card = ``;
        var activeDeactive;
        var lengthOfArray = data.data.allIndustrialProject.length;
        $('#noOfIndustrialProjectFound').text(lengthOfArray + " Industrial Projects Found");
        data.data.allIndustrialProject.forEach(item => {
          if (item.status && item.adminverified) {
            activeDeactive = 'Actively Hiring';
            card += ` <div class="card" style="height:fit-content; width:100%">

            <div class="activeDeactive">
                
                  <span>${activeDeactive}</span>
                  
           
            </div>
            <div class="row">
                <div class="col-md-8">
                <h4>
                ${item.projectTitle}
     
                </h4>
                    <h6>
                        ${item.position}
                    </h6>
                    <p id="companyName">
                      ${item.companyName}
                    </p>
                    
            
                </div>
                <div class="col-md-4">
                <img src="${item.companyId.profileImage.path}" alt=""  id="companyImageProfile" style="width: inherit";>                </div>
            </div>
            
            <div class="row">
            <p><i class="fa-solid fa-location-dot"></i>
                      ${item.state}
            
                  </p>
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
                        ${item.stipend} INR
                    </p>
                </div>
            </div>
            <div class="paidOrUnpaid d-flex mb-3 justify-content-start flex-wrap">
                <div class="ms-1 me-1 mb-3 mb-sm-0 ">
                    <span>
                        ${item.paidOrUnpaid}
                    </span>
                </div>
                <div class="ms-1 me-1 mb-3 mb-sm-0 ">
                    <span><i class="fa-regular fa-clock"></i>
                      ${item.typeOfIndustrialProject}
                    </span>
            
                </div>
                <div class="ms-1 me-1 mb-3 mb-sm-0 ">
                    <span><i class="fa fa-home-user"></i>
                      ${item.modeOfIndustrialProject}
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
                    <a href="/industrialProjects?_id=${item._id}"><button class="btn btn-primary" id="detailbtn">View Details</button></a>
                </div>`;
               if (userId != "" && userRole == "student") {
                 card += `  <button class="btn btn-secondary applynow"  data-id="${item._id}">
                 Apply now
     
               </button>`;
               }
               else if (userId != "" && userRole != "student") {
     
               }
               else {
                 card += `<a href="/login"><button class="btn btn-secondary" id="login">
                 Apply now
               </button></a>`;
               }
     
     
     
               card += ` 
            </div>
            
            
            </div>`;
          }
          else {
            activeDeactive = 'Not Actively Hiring';
            card = `<div class="card" style="width:100%; height:fit-content;">
            <div class="card-body" style="padding:0px">
              <h5 class="card-title">0 industrial project found</h5>
            </div>`;
              $('.listings').html(card);
              $('#noOfIndustrialProjectFound').text("");
          }
         
        });
        console.log("card", card);
        $('.listings').html(card);

      }
      else {
        card = `<div class="card" style="width:100%; height:fit-content;">
      <div class="card-body" style="padding:0px">
        <h5 class="card-title">${data.message}</h5>
      </div>`;
        $('.listings').html(card);
        $('#noOfIndustrialProjectFound').text("");

      }

    }
    );
}


// categories in filter section 
showLoader();
fetch('/api/Categories')
  .then(res => res.json())
  .then(data => {
    hideLoader();
    console.log(data.data.categories[0].industrialProject);
    let industrialProjects = data.data.categories[0].industrialProject;
    let studentProfile = data.data.categories[0].studentProfile;
    let categories = industrialProjects.category;
    let states = industrialProjects.state;
    let cities = industrialProjects.city;
    let modeOfIndustrialProjects = industrialProjects.modeOfIndustrialProject;
    categories.forEach(category => {
      $('#category').append(`<option value="${category}">${category}</option>`);
    });
    states.forEach(state => {
      $('#statefilter').append(`<option value="${state}">${state}</option>`);
    }
    );
    cities.forEach(city => {
      $('#cityfilter').append(`<option value="${city}">${city}</option>`);
    }
    );
    modeOfIndustrialProjects.forEach(modeOfIndustrialProject => {
      $('#modeOfIndustrialProject').append(`<option value="${modeOfIndustrialProject}">${modeOfIndustrialProject}</option>`);
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
  filterIndustrialProject();
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
showLoader();
fetch('/api/profile?' + new URLSearchParams(data), {
  method: 'GET',
})
  .then(res => res.json())
  .then(data => {
    hideLoader();
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
    let arr = data.data.user.industrialProjects.map((item) => {
      return item.industrialProjectId;
    }
    )
    alreadyAppliedIndustrialProjects = arr;
  });


// which idp apply btn click 
$(document).on('click', '.applynow', function (e) {
  let idpId = $(this).attr('data-id');
  let loopend = 0;
  for (let i = 0; i < alreadyAppliedIndustrialProjects.length && loopend != 1; i++) {
    if (alreadyAppliedIndustrialProjects[i] == idpId) {
      loopend = 1;
      console.log("already applied");
      $('#alreadyAppliedAlert').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
      You have already applied for this industrial project
      <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
    </div>`);
      window.scrollTo(0, 0)

      break;
    }

  }
  if (loopend == 0) {
    $('#submitIDPApp').attr('data-idpId', idpId);
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


// submit idp application form 
$(document).on('click', "#submitIDPApp", function (e) {
  let form = document.getElementById("idpAppForm");
  if (form.checkValidity() === false) {
    form.reportValidity();
  }
  var idpId = $(this).attr('data-idpId');
  var resumeData = $('#resumeFileIDP').prop('files')[0];
  var dataValidation = {
    "userId": userId,
    "industrialProjectId": idpId
  }
  var data2 = {}
  var formData = $('#idpAppForm').serializeArray();
  for (var i = 0; i < formData.length; i++) {
    data2[formData[i].name] = formData[i].value;
  }
  if($('#resumeFileIDP').prop('files')[0] == undefined){
    $('#modalformalert').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Please upload your resume
    <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
  </div>`);
    return;
  }

  for (var key in data2) {
    if (data2[key] == "Na") {
      alert("Please fill all the fields");
      // console.log("empty value");
      $('#modalformalert').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
      Please fill all the fields
      <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
    </div>`);
      return;
    }
  }
  if (data2["semester"] == "") {
    alert("Please fill all the fields sem");

    $('#modalformalert').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
      Please fill all the fields
      <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
    </div>`);
    return;
  }
  var resumeformData = new FormData();
  resumeformData.append('resumeFileIDP', resumeData);

  // var getCurrtime = new Date().getTime();
  
  // var resumeName = getCurrtime + $('#resume').prop('files')[0].name;
  // var resumePath = "/studentProfile/Resumes/" + resumeName;
  // var resumeData = {
  //   "name": resumeName,
  //   "path": resumePath
  // }
  // data2['resume'] = resumeData;
  // console.log("data2", data2);

  // for (var key in data2) {
  //   if (data2[key] == "") {
  //     // console.log("empty value");
  //     $('#modalformalert').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
  //     Please fill all the fields
  //     <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
  //   </div>`);
  //     return;
  //   }
  // }


  // console.log(idpId);

  // save resume file in folder of that resumePath with resumeName in node js without api call
  // var resumeFileData = new FormData();
  // resumeFileData.append('resume', resumeName);
  // resumeFileData.append('path', resumePath);
  // console.log(resumeFileData);

  showLoader();
  fetch("/resumeUploadIDP", {
    method: 'POST',
    body: resumeformData
  })
    .then(res => res.json())
    .then(data => {
      console.log("fiel upload, data", data);
      console.log("fiel upload, data", data.file);
      var responseResumeDataFromAPI = data.file;
      var resumeData = {
        "name": responseResumeDataFromAPI.filename,
        "path": responseResumeDataFromAPI.path.replace("public", "")
      }
      data2['resumeIDP'] = resumeData;
      


      fetch('/api/applyForIndustrialProject', {
        method: 'POST',
        body: JSON.stringify(dataValidation),
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
                hideLoader();
                console.log("dummy...", data123);
                $('#applyNowModal').modal('hide');
                $('#successAlert').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
            ${data.message}
            <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
          </div>`);
                window.scrollTo(0, 0)

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
            window.scrollTo(0, 0)

          }
        })
        .catch(err => {
          console.log(err);
        });

    })
    .catch(err => {
      console.log(err);

    });





});

function saveIndustrialProject(userId, industrialProjectId, role){
  if (userId == undefined) {
    alert("Please login to save the project");
    return;
  }
  // saveProduct + productId
  // remove saved class from icon fa-solid, add fa-regular
  if($('#saveIndustrialProject'+industrialProjectId).hasClass("fa-solid")){
    $("#saveIndustrialProject"+industrialProjectId).removeClass("fa-solid");
    $("#saveIndustrialProject"+industrialProjectId).addClass("fa-regular");
    $("#savedAlert").html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Industrial Project removed Successfully.
    <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
  </div>`);
    $.ajax({
      url: '/api/removeSavedIndustrialProject',
      type: 'POST',
      data: {
        userId: userId,
        industrialProjectId: industrialProjectId,
        role: role
      },
      success: function(data){
        console.log("data", data)
        if(data.status == "success"){
          alert("Removed Successfully");

        }
      }
    });

    }
    else{
      $("#saveIndustrialProject"+industrialProjectId).removeClass("fa-regular");
      $("#saveIndustrialProject"+industrialProjectId).addClass("fa-solid");
      $("#savedAlert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
      Industrial Project Saved Successfully.
      <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
    </div>`);
      $.ajax({
        url: '/api/saveIndustrialProject',
        type: 'POST',
        data: {
          userId: userId,
          industrialProjectId: industrialProjectId,
          role: role
        },
        success: function(data){
          console.log("data", data)
          if(data.status == "success"){
            alert("Accepted Successfully");

          }
        }
      });

    }
    

}

const userResponse = fetch('/api/getUserById?userId=' + userId, { method: 'GET' });
userResponse.then(response => response.json())
  .then(userData => {
    console.log('Success:', userData.userDetails);
    userData.userDetails.savedIndustrialProjects.forEach(savedIndustrialProject => {
      $("#saveIndustrialProject" + savedIndustrialProject).removeClass("fa-regular");
      $("#saveIndustrialProject" + savedIndustrialProject).addClass("fa-solid");
    }
    )
  })
  .catch((error) => {
    console.error('Error:', error);
  }
  );
    