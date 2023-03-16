// id="profile-internship-btn"
// id="profile-product-btn"
// id="profile-idp-btn"
// id="profile-mentors-btn"
// id="profile-research-btn"


var profileInternshipBtn = document.getElementById("profile-internship-btn");
var profileProductBtn = document.getElementById("profile-product-btn");
var profileIdpBtn = document.getElementById("profile-idp-btn");
var profileMentorsBtn = document.getElementById("profile-mentors-btn");
var profileResearchBtn = document.getElementById("profile-research-btn");
var profileBtn = document.getElementById("profile-btn");

// id="internship-content"
// id="product-content"
// id="idp-content"
// id="research-content"
// id="mentor-content"

var internshipContent = document.getElementById("internship-content");
var productContent = document.getElementById("product-content");
var idpContent = document.getElementById("idp-content");
var researchContent = document.getElementById("research-content");
var mentorContent = document.getElementById("mentor-content");
var defaultContent = document.getElementById("default-content");


profileBtn.addEventListener("click", function () {
  internshipContent.style.display = "none";
  productContent.style.display = "none";
  idpContent.style.display = "none";
  researchContent.style.display = "none";
  mentorContent.style.display = "none";
  defaultContent.style.display = "block";
});


profileInternshipBtn.addEventListener("click", function () {
  internshipContent.style.display = "block";
  productContent.style.display = "none";
  idpContent.style.display = "none";
  researchContent.style.display = "none";
  mentorContent.style.display = "none";
  defaultContent.style.display = "none";
});

profileProductBtn.addEventListener("click", function () {
  internshipContent.style.display = "none";
  productContent.style.display = "block";
  idpContent.style.display = "none";
  researchContent.style.display = "none";
  mentorContent.style.display = "none";
  defaultContent.style.display = "none";

}
);

profileIdpBtn.addEventListener("click", function () {
  internshipContent.style.display = "none";
  productContent.style.display = "none";
  idpContent.style.display = "block";
  researchContent.style.display = "none";
  mentorContent.style.display = "none";
  defaultContent.style.display = "none";
}
);

profileResearchBtn.addEventListener("click", function () {
  internshipContent.style.display = "none";
  productContent.style.display = "none";
  idpContent.style.display = "none";
  researchContent.style.display = "block";
  mentorContent.style.display = "none";
  defaultContent.style.display = "none";
}
);

profileMentorsBtn.addEventListener("click", function () {
  internshipContent.style.display = "none";
  productContent.style.display = "none";
  idpContent.style.display = "none";
  researchContent.style.display = "none";
  mentorContent.style.display = "block";
  defaultContent.style.display = "none";
}
);

$(".nav .nav-link").on("click", function () {
  $(".nav").find(".active").removeClass("active");
  $(this).addClass("active");
});

fetch("/api/Categories")
  .then(response => response.json())
  .then(data => {
    console.log(data);


    // "studentProfile": {
    //     "college": ["LD College of eng", "GEC", "IIT"],
    //     "university": ["GTU", "Kerala University"],
    //     "state": ["Gujarat", "HimachalPradesh"],
    //     "education": ["Electronics", "Medical", "Engineering"],
    //     "branch": ["Computer Engineering", "Civil Engineering", "BBA", "BCA"],
    //     "semester":[1,2,3,4,5,6,7,8]
    // }


    // var industrialProjectLocation=data.data.categories[0].industrialProject.location;
    // var industrialProjectCategory=data.data.categories[0].industrialProject.category;
    // var modeOfIndustrialProject=data.data.categories[0].industrialProject.modeOfIndustrialProject;
    // var typeOfIndustrialProject=data.data.categories[0].industrialProject.typeOfIndustrialProject;
    // var paidUnpaid=data.data.categories[0].industrialProject.paidUnpaid;

    var collegeCategory = data.data.categories[0].studentProfile.college;
    var universityCategory = data.data.categories[0].studentProfile.university;
    var stateCategory = data.data.categories[0].studentProfile.state;
    var educationCategory = data.data.categories[0].studentProfile.education;
    var branchCategory = data.data.categories[0].studentProfile.branch;
    var semesterCategory = data.data.categories[0].studentProfile.semester;
    var streamCategory = data.data.categories[0].studentProfile.stream;



    var collegeName = document.getElementById("collegeName");
    var universityName = document.getElementById("universityName");
    var stateName = document.getElementById("stateName");
    var educationName = document.getElementById("educationName");
    var branchName = document.getElementById("branchName");
    var semesterName = document.getElementById("semesterName");
    var streamName = document.getElementById("streamName");

    for (var i = 0; i < collegeCategory.length; i++) {
      var option = document.createElement("option");
      option.text = collegeCategory[i];
      option.value = collegeCategory[i];
      collegeName.add(option);
    }

    for (var i = 0; i < universityCategory.length; i++) {
      var option = document.createElement("option");
      option.text = universityCategory[i];
      option.value = universityCategory[i];
      universityName.add(option);
    }

    for (var i = 0; i < stateCategory.length; i++) {
      var option = document.createElement("option");
      option.text = stateCategory[i];
      option.value = stateCategory[i];
      stateName.add(option);
    }

    for (var i = 0; i < educationCategory.length; i++) {
      var option = document.createElement("option");
      option.text = educationCategory[i];
      option.value = educationCategory[i];
      educationName.add(option);
    }

    for (var i = 0; i < branchCategory.length; i++) {
      var option = document.createElement("option");
      option.text = branchCategory[i];
      option.value = branchCategory[i];
      branchName.add(option);
    }

    for (var i = 0; i < semesterCategory.length; i++) {
      var option = document.createElement("option");
      option.text = semesterCategory[i];
      option.value = semesterCategory[i];
      semesterName.add(option);
    }

    for (var i = 0; i < streamCategory.length; i++) {
      var option = document.createElement("option");
      option.text = streamCategory[i];
      option.value = streamCategory[i];
      streamName.add(option);
    }



  })
  .catch(error => {
    console.log(error);
  })


function previewImage() {
  var preview = document.querySelector('.image-preview');
  var file = document.querySelector('input[name=profileImage]').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}



var internshipContainer = document.getElementById("internship-container-profile");
var idpContainer = document.getElementById("idp-container-profile");
var researchContainer = document.getElementById("research-container-profile");
var userInternships = document.currentScript.getAttribute('userInternships').split(',');
var userIdp = document.currentScript.getAttribute('userIdp').split(',');
var userResearch = document.currentScript.getAttribute('userResearch').split(',');
console.log('userInternships', userInternships);
console.log('userIdp', userIdp);
console.log('userResearch', userResearch);


// fetch('/api/getUserById?userId=' + userId, {
//     method: 'GET',
// }
// )
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         if (data.statusCode == 200) {
//             userEmail = data.userDetails.email;
//             userRole = data.userDetails.role;
//             console.log(userEmail);
//             console.log(userRole);
//         }
//         else {
//             alert("Something went wrong");
//         }

//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     }
//     );



for (var i = 0; i < userInternships.length; i++) {
  var internship = userInternships[i];
  fetch('/api/getInternshipById?id=' + internship, {
    method: 'GET',
  }
  )
    .then(response => response.json())
    .then(data => {
      var internship = data.data.internship;
      console.log('Success:', data.data.internship);
      internshipContainer.innerHTML += `   <div class="row justify-content-center mb-3">
            <div class="col-md-12 col-xl-10">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row">
                    
                    <div class="col-md-9 col-lg-9 col-xl-9">
                      <h5>${internship.position}</h5>
                      <h6>${internship.companyName}</h6>
                      
                      <div class="d-flex flex-row">
                        <div class="text-danger mb-1 me-2">
                          <i class="fa fa-location-arrow"></i>
                        </div>
                        <span>${internship.location}</span>
                      </div>
                      <div class="mt-1 mb-0 text-muted small">
                        <span>paid</span>
                        <span class="text-primary"> • </span>
                        <span>work from home</span>
                  
                      </div>
                   
                      <p class="text-truncate mb-4 mb-md-0">
                        ${internship.briefDescription}
                      </p>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div class="d-flex flex-row align-items-center mb-1">
                    <h6 class="mb-1 me-1"> ${internship.modeOfInternship}</h5>
                  </div>
                  <h6 class="text-success"> ${internship.category}</h6>
                      <div class="d-flex flex-column mt-4">
                        
                        <a href="/internships?_id=${internship._id}"><button class="btn btn-primary" id="detailbtn">View
                        Details</button></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
  `;
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    }
    );

}

for (var i = 0; i < userIdp.length; i++) {
  var idp = userIdp[i];
  fetch('/api/getIndustrialProjectById?id=' + idp, {
    method: 'GET',
  }
  )
    .then(response => response.json())
    .then(data => {
      console.log("data", data)
      var insustrialProject = data.data.IndustrialProject;
      console.log('Success: oyehoye', data.data.IndustrialProject);
      idpContainer.innerHTML += `   <div class="row justify-content-center mb-3">
        <div class="col-md-12 col-xl-10">
          <div class="card shadow-0 border rounded-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-8 col-lg-8 col-xl-8">
                  <h5>${insustrialProject.position}</h5>
                  <h6>${insustrialProject.companyName}</h6>
                  <div class="d-flex flex-row">
                    <div class="text-primary mb-1 me-2">
                      <i class="fa fa-location-arrow"></i>

                    </div>
                    <span>${insustrialProject.location}</span>
                  </div>
                  <div class="mt-1 mb-0 text-muted small">
                    <span>paid</span>
                    <span class="text-primary"> • </span>
                    <span>work from home</span>
              
                  </div>
               
                  <p class="text-truncate mb-4 mb-md-0">
                    ${insustrialProject.briefDescription}
                  </p>
                </div>
                <div class="col-md-4 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div class="d-flex flex-row align-items-center mb-1">
                    <h6 class="mb-1 me-1"> ${insustrialProject.modeOfIndustrialProject}</h5>
                  </div>
                  <h6 class="text-success"> ${insustrialProject.category}</h6>
                  <div class="d-flex flex-column mt-4">
                    
                    <a href="/industrialProjects?_id=${insustrialProject._id}"><button class="btn btn-primary" id="detailbtn">View
                    Details</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`;
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    }
    );

}

for (var i = 0; i < userResearch.length; i++) {
  var research = userResearch[i];
  // // fetch('/api/allResearchPapers?_id=' + research, {
  // //   method: 'POST',
  // //   body: {
  // //     "request":
  // //     {
  // //       "_id": research
  // //     }
  // //   }
  // // }
  // // )


  //   // { "request":
  //   // {
  //   //     "_id":"64120046fcb5b77ee7c86d45"
  //   //  }
  //   //  }
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("data abc", data)
  //     var research = data.data.research;
  //     console.log('Success:', data.data.research);
  //   }
  //   )
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   }
  //   );



  fetch('/api/getResearchPaperById?id=' + research, {
    method: 'GET',
  }
  )
    .then(response => response.json())
    .then(data => {
      console.log("data rs", data)
      var research = data.data.researchPaper;
      console.log('Success data:', research);
      researchContainer.innerHTML  += `   <div class="row justify-content-center mb-3">
      <div class="col-md-12 col-xl-10">
        <div class="card shadow-0 border rounded-3">
          <div class="card-body">
            <div class="row">
              
              <div class="col-md-9 col-lg-9 col-xl-9">
                <h5>${research.title}</h5>
                <h6>${research.guide}</h6>
                
                <div class="d-flex flex-row">
                  <div class="text-primary mb-1 me-2">
                    <i class="fa fa-info-circle"></i>
                  </div>
                  <span>${research.category}</span>
        
                  
                </div>
                <div class="mt-1 mb-0 text-muted small">
                <h6 style="font-weight:bold">Team Members</h6>
                  ${research.teamMembers.split(",").map((member) => {
                    return `<span>${member} |</span>`
                  }).join("")}
  
            
                </div>
             
                <p class="text-truncate mb-4 mb-md-0">
                  ${research.description}
                </p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3 border-sm-start-none border-start">
              <div class="d-flex flex-row align-items-center mb-1">
            </div>
                <div class="d-flex flex-column mt-4">
                  
                  <a href="/internships?_id=${research._id}"><button class="btn btn-primary" id="detailbtn">View
                  Details</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
`;
    } 
    )
    .catch((error) => {
      console.error('Error:', error);
    }
    );


  }
 
