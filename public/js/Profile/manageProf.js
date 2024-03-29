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
var profileProjectRepoBtn = document.getElementById("profile-projectrepo-btn");

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
var projectrepoContent = document.getElementById("projectrepo-content");

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
var productContainer = document.getElementById("product-container-profile");
var mentorContainer = document.getElementById("mentor-container-profile");
var userInternships = document.currentScript.getAttribute('userInternships').split(',');
var userIdp = document.currentScript.getAttribute('userIdp').split(',');
var userResearch = document.currentScript.getAttribute('userResearch').split(',');
var userProducts = document.currentScript.getAttribute('userProducts').split(',');
var mentors = document.currentScript.getAttribute('mentors').split(',');
var userId = document.currentScript.getAttribute('userId');
var role = document.currentScript.getAttribute('role');
console.log('userInternships', userInternships);
console.log('userIdp', userIdp);
console.log('userResearch', userResearch);
console.log('userProducts', userProducts);
console.log('mentors', mentors);

console.log('Success: maro data aaray', dataArray);

showLoader();
for (var i = 0; i < userInternships.length; i++) {

  var internship = userInternships[i];
  // alert(dataArray.length);

  fetch('/api/getInternshipById?id=' + internship, {
    method: 'GET',
  }
  )
    .then(response => response.json())
    .then(data => {
      var internship = data.data.internship;
      var internshipStatus = "pending";
      console.log('Success:', data.data.internship);
      internshipContainer.innerHTML += `   <div class="row justify-content-center mb-3 internshipprofile " >

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
                    <h6 class="mb-1 me-1 statusinall" data-status="${internshipStatus}" id="${internship._id}"> ${internshipStatus}</h6>
                    <div class="d-flex flex-row align-items-center mb-1">

                    <h6 class="mb-1 me-1"> ${internship.modeOfInternship}</h5>
                  </div>
                  <h6 class=""> ${internship.category}</h6>
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

// filter in internship 

const filterTabs = document.querySelectorAll('.filter-tab');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
   
    filterTabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');
    
    const filterq = tab.dataset.filter;

   $('.internshipprofile').each(function () {
    console.log("here5",$(this));
    // find whose data-id is equal to the filterq
    if(filterq == "applied"){
      $(this).show();
    }
    else{
          if ($(this).find('.statusinall').text().toLowerCase().indexOf(filterq.toLowerCase()) != -1 ) {
            $(this).show();
          } else {
            $(this).hide();
          }
        }
        });


        $('.idpprofile').each(function () {
          console.log("here5",$(this));
          // find whose data-id is equal to the filterq
          if(filterq == "applied"){
            $(this).show();
          }
          else{
                if ($(this).find('.statusofidp').text().toLowerCase().indexOf(filterq.toLowerCase()) != -1 ) {
                  $(this).show();
                } else {
                  $(this).hide();
                }
              }
              });

    
  });
});

for (var i = 0; i < userIdp.length; i++) {
  var idp = userIdp[i];
  // var idpStatus = dataArray[1][i].status;
  var idpStatus = "pending";;
  fetch('/api/getIndustrialProjectById?id=' + idp, {
    method: 'GET',
  }
  )
    .then(response => response.json())
    .then(data => {
      console.log("data", data)
      var insustrialProject = data.data.IndustrialProject;
      console.log('Success: oyehoye', data.data.IndustrialProject);
      idpContainer.innerHTML += `   <div class="row justify-content-center mb-3 idpprofile">
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
                <h6 class="mb-1 me-1 statusofidp"id='${insustrialProject._id}'">  ${idpStatus}</h6>
                  <div class="d-flex flex-row align-items-center mb-1">

                    <h6 class="mb-1 me-1"> ${insustrialProject.modeOfIndustrialProject}</h5>
                  </div>
                  <h6 class=""> ${insustrialProject.category}</h6>
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
      researchContainer.innerHTML += `<div class="row justify-content-center mb-3">
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
                  
                  <a href="/researchPapers?_id=${research._id}"><button class="btn btn-primary" id="detailbtn">View
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

fetch("/api/getProducts?userId=" + userId)

  .then(response => response.json())
  .then(data => {
    console.log("data kaka", data);
    var productData = data.data.allProducts;
    console.log("productDataLength", productData);

    var productDataLength = data.data.allProducts.length;

    var productDataHtml = "";
    for (var i = 0; i < productDataLength; i++) {
      console.log("productData[i]", productData[i]);
      if (productData[i].verified == true) {
        var filterValue = "verified";
      }
      else {
        var filterValue = "pending";
      }
      productDataHtml += `
      <div class="row justify-content-center mb-3 product-container-profile" data-filter="${filterValue}" id="${productData[i]._id}">
<div class="col-md-12 col-xl-10">
  <div class="card shadow-3-strong border rounded-3">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
          <div id="carouselExampleControls`+ i + `" class="carousel slide" data-mdb-ride="carousel">
            <div class="carousel-inner">`;


      productData[i].photos.forEach(function (photo) {
        productDataHtml += ` <div class="carousel-item active" style="text-align: center;text-align: -webkit-center; text-align: -moz-center; ">
                <img style="height: 180px;" src="`+ photo.path + `" class="img-thumbnail d-block"
                alt="Product" />                               
            </div>`;
      })





      productDataHtml += `</div>
            <button style="color:#1c4980;" class="carousel-control-prev" type="button" data-mdb-target="#carouselExampleControls`+ i + `"
              data-mdb-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button style="color:#1c4980;" class="carousel-control-next" type="button" data-mdb-target="#carouselExampleControls`+ i + `"
              data-mdb-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-xl-6">
          <h5 id="productName">
            `+ productData[i].productTitle + `
          </h5>
          <div class="d-flex flex-row">
            <div class="text-primary mb-1 me-2">
              <span id="conditionRatingVal" style="display:none;">
                `+ parseInt(JSON.stringify(productData[i].conditionRating)) + `
              </span>`;
              for (var j = 0; j < parseInt(JSON.stringify(productData[i].conditionRating)); j++) {
                productDataHtml += `<i class="fa fa-star"></i>`;
              }
              for (var j = parseInt(JSON.stringify(productData[i].conditionRating)); j < 5; j++) {
                productDataHtml += `<i class="fa-regular fa-star"></i>`;
              }





      productDataHtml += `   </div>
          </div>
          <div class="mt-1 mb-0  small">
            <span class="text-primary"> • </span>
            <span id="categoryName">
              `+ productData[i].category + `
            </span>
            <span class="text-primary"> • </span>
            <span>
            `+ productData[i].location + `
            </span>   

          </div>
          <div class="mb-2 text-muted small">
            <span class="text-primary"> • </span>
            <span>Date Of Purchase :  `+ productData[i].dateOfPurchase.slice(0, 10) + `</span>

            </div>
            <div class="mb-2 text-muted small">
  
              <span class="text-primary"> • </span>
              `; if (productData[i].verified) {
          productDataHtml += `<span class="badge badge-success">Verified</span>`;
        } else {
          productDataHtml += `<span class="badge badge-danger">Pending</span>`
        }
        productDataHtml += `
  
              </div>

        </div>
        <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start d-flex flex-column ">
          <!-- <div class="d-flex flex-row align-items-center mb-1"> -->
          <span class="text-primary text-end">Message <i class="fa fa-comment"></i></span>

          <h4 class="mb-1 me-1">
          `+ productData[i].price + ` Rs.
          </h4>
          <!-- chat icon  -->
          <!-- </div> -->
          <!-- <div class="d-flex flex-column mt-4"> -->
          <button class="btn btn-primary mt-auto showDetail" type="button">Details</button>
          <button class="btn btn-danger mt-auto" type="button" onclick="deleteItem('`+ productData[i]._id + `','product')">Delete</button>

          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="card-footer" style="display: none;">
      <h5 class="text-uppercase text-primary">Notes</h5>
      <p>
      `+ productData[i].note + `<span class="hideDetail" style="float:right;"><i
              class=" text-primary fa-sharp fa-solid fa-arrow-up"></i></span>
      </p>
    </div>
  </div>
</div>
</div>`;
    }
    $('#product-container-profile').html(productDataHtml);
  }
  );

for (var i = 0; i < mentors.length; i++) {
  var mentorId = mentors[i];
  fetch("/api/getMentors?_id=" + mentorId)
    .then(response => response.json())
    .then(data => {
      console.log("data mentors", data);
      var mentor = data.data.mentors[0];
      console.log("mentor", mentor);
      mentorContainer.innerHTML += `
        <div class="card mentor-card"
        style="border-radius: 15px;">
        <div
            class="card-body text-center">
            <div class="mt-3 mb-4">
                <img src="${mentor.profileImage.path}"
                    class="rounded-circle img-fluid"
                    style="width: 100px;" />
            </div>
            <h4  class="mb-2 mentordetails">
                    ${mentor.name}
            </h4>
            <h4 class="mb-2 mentordetails" id="typeMentor">
                    ${mentor.typeOfMentor}
            </h4>
            <h4 class="mb-2 mentordetails" id="specMentor">
                    ${mentor.Specialization}
            </h4>
            <p
                class=" text-muted mb-4">
                @${mentor.AreaOfIntrest}
                 <span
                        class="mx-2"><br></span>
                    <a href="#!">
                    ${mentor.college}
                    </a>
            </p>

            <a
                href="/mentors?_id=${mentor._id}"><button
                    type="button"
                    class="btn btn-dark btn-rounded btn-sm ">
                    View More
                    Details
                </button></a>
        </div>
    </div>`


    })

}

var dataArray = [];
fetch('/api/getUserById?userId=' + userId, {
  method: 'GET',
}
)
  .then(response => response.json())
  .then(data => {
    hideLoader();
    // console.log('Success: maro data', data.userDetails);
    const internshipsArray = data.userDetails.internships.map(({ internshipId, status }) => ({ id: internshipId, status }));
    const idpsArray = data.userDetails.industrialProjects.map(({ industrialProjectId, status }) => ({ id: industrialProjectId, status }));
    console.log('Success: maro data int', internshipsArray);
    console.log('Success: maro data idp', idpsArray);
    dataArray.push(internshipsArray);
    dataArray.push(idpsArray);


    for (var j = 0; j < dataArray.length; j++) {
      for (var k = 0; k < dataArray[j].length; k++) {
        if (dataArray[j][k].status == 'pending') {
          dataArray[j][k].status = '<span class="badge rounded-pill bg-warning text-dark">Pending</span>';
        }
        else if (dataArray[j][k].status == 'hired') {
          dataArray[j][k].status = '<span class="badge rounded-pill bg-success">Hired</span>';
        }
        else if (dataArray[j][k].status == 'rejected') {
          dataArray[j][k].status = '<span class="badge rounded-pill bg-danger">Rejected</span>';
        }
        $("#" + dataArray[j][k].id).html(dataArray[j][k].status);
      }
    }

  })
  .catch((error) => {
    console.error('Error:', error);
  }
  );

  profileProjectRepoBtn.addEventListener("click", async function () {
    // showLoader();
    projectrepoContent.style.display = "block";
    internshipContent.style.display = "none";
    productContent.style.display = "none";
    idpContent.style.display = "none";
    researchContent.style.display = "none";
    mentorContent.style.display = "none";
    defaultContent.style.display = "none";
  
  
    var projectDataHtml = '';
  
  
    await fetch('/api/getUserById?userId=' + userId)
      .then(response => response.json())
      .then(async data => {
        console.log("data.userDetails.projectRepository", data.userDetails.projectRepository);
        $('#projectrepo-content-inner').html('');
        // $('#projectrepo-content').append(`<div class="row">`);
        data.userDetails.projectRepository.forEach(function (project) {
          console.log("H", project);
          var request = { "request": { _id: project } };
          // ajax request on /api/getProjectRepository this api nd pass request as body
          $.ajax({
            url: '/api/getProjectRepository',
            type: 'GET',
            data: request,
            contentType: 'application/json',
            success: function (data) {
              hideLoader();
              projectDataHtml = `<div class="courses col-lg-3 col-md-6 col-sm-12" id="` + data.data.ProjectRepository[0]._id + `" >
              <div class="course-item">
                <div class="mt-3 mb-4" style="text-align: center;">
                  <img src="${data.data.ProjectRepository[0].projectImage.path}"
                    class="rounded-circle img-fluid"
                    style="width: 100px;" />
                </div>
                <div class="course-content">
                  <h3><a href="course-details.html">`+ data.data.ProjectRepository[0].projectName + `</a></h3>
                  <p class="repotext">`+ data.data.ProjectRepository[0].projectDescription + `</p>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <a href="/projectRepository?_id=`+ data.data.ProjectRepository[0]._id + `"><h4>View Details</h4></a>
                    <i class="fa fa-trash" aria-hidden="true" style="color: red; font-size: 20px;" onclick="deleteItem('`+ data.data.ProjectRepository[0]._id + `' , 'projectRepository')"></i>`;
                    if (data.data.ProjectRepository[0].isHidden == true) {
                      projectDataHtml += `<i class="fa fa-eye-slash" aria-hidden="true" style="color: black; font-size: 20px;" onclick="hideItem('`+ data.data.ProjectRepository[0]._id + `' , 'projectRepository')" id="` + data.data.ProjectRepository[0]._id + 'hide' + `"></i>`;
                    } else {
                      projectDataHtml += `<i class="fa fa-eye" aria-hidden="true" style="color: black; font-size: 20px;" onclick="hideItem('`+ data.data.ProjectRepository[0]._id + `' , 'projectRepository')" id="` + data.data.ProjectRepository[0]._id + 'hide' + `"></i>`;
                    }
            
                    projectDataHtml += `
                  </div>                
                </div>
              </div>
            </div>
            
          `;
              $('#projectrepo-content-inner').append(projectDataHtml);
            },
            error: function (error) {
              hideLoader();
              console.error(error);
            }
          });
          console.log("kk..", projectDataHtml);
  
        })
  
  
      });
  });
  
  
  
  
  const filterTabsProd = document.querySelectorAll('.filter-tab-product');
  
  filterTabsProd.forEach(tab => {
    tab.addEventListener('click', () => {
      const productContainers = document.querySelectorAll('.product-container-profile');
      const noDataMessage = document.querySelector('.no-data-message');
  
      // remove active class from all filter tabs
      filterTabsProd.forEach(tab => tab.classList.remove('active'));
      // add active class to clicked tab
      tab.classList.add('active');
  
      // filter product containers based on selected filter
      const selectedFilter = tab.getAttribute('data-filter');
      let matchCount = 0;
      productContainers.forEach(container => {
        const containerFilter = container.getAttribute('data-filter');
        if (selectedFilter === 'all' || selectedFilter === containerFilter) {
          container.style.display = 'flex';
          matchCount++;
        } else {
          container.style.display = 'none';
        }
      });
  
      // show no data message if no products match the selected filter
      if (matchCount === 0) {
        noDataMessage.style.display = 'block';
      } else {
        noDataMessage.style.display = 'none';
      }
    });
  });
  
  
  
  // Delete item button
  
  function deleteItem(itemid, itemtype) {
  
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false,
      //closeOnCancel: false
    },
      function () {
        $.ajax({
          url: '/api/deleteItem',
          type: 'POST',
          data: {
            itemId: itemid,
            item: itemtype,
            role: role,
            userId: userId
          },
          success: function (data) {
            console.log("data", data);
            // delete from dom
            $('#' + itemid).remove();
          },
          error: function (err) {
            console.log(err);
          }
  
        });
        swal("Deleted!", "Your imaginary file has been deleted!", "success");
      });
  }
  
  
  function hideItem(itemid, itemtype) {
    if ($('#' + itemid + 'hide').hasClass('fa-eye')) {
      
      swal({
        title: "Are you sure?",
        text: "Your item will be hidden!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, hide it!',
        closeOnConfirm: false,
        //closeOnCancel: false
      },
        function () {
          $.ajax({
            url: '/api/hideItem',
            type: 'POST',
            data: {
              itemId: itemid,
              item: itemtype,
              role: role,
              userId: userId
            },
            success: function (data) {
              $('#' + itemid + 'hide').removeClass('fa-eye');
      $('#' + itemid + 'hide').addClass('fa-eye-slash');
              // delete from dom
              // $('#' + itemid+ 'hide').remove();
              // class="fa fa-eye-slash"
              
            },
            error: function (err) {
              console.log(err);
            }
    
          });
          swal("Hidden!", "Your item has been hidden!", "success");
        });
    }
    else {
  
     
      swal({
        title: "Are you sure?",
        text: "Your item will be visible!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, visible it!',
  
        closeOnConfirm: false,
        //closeOnCancel: false
      },
  
        function () {
          $.ajax({
            url: '/api/visibleItem',
            type: 'POST',
            data: {
              itemId: itemid,
              item: itemtype,
              role: role,
              userId: userId
            },
            success: function (data) {
              $('#' + itemid + 'hide').removeClass('fa-eye-slash');
      $('#' + itemid + 'hide').addClass('fa-eye');
              
            },
            error: function (err) {
              console.log(err);
            }
    
          });
          swal("Visible!", "Your item has been visible!", "success");
        }
      );
  
  
    }
    
  }
  
  
