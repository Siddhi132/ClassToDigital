var userId = document.currentScript.getAttribute("userId");
var userRole = document.currentScript.getAttribute("userRole");
var userResearch = document.currentScript.getAttribute('userResearch').split(',');

console.log("userResearch", userResearch);
console.log("userId", userId);
console.log("userRole", userRole);

var profileAddmenteeBtn = document.getElementById("profile-addmentee-btn");
var profileProductBtn = document.getElementById("profile-product-btn");
var profileProjectRepoBtn = document.getElementById("profile-projectrepo-btn");
var profileResearchBtn = document.getElementById("profile-research-btn");
var profileBtn = document.getElementById("profile-btn");


var addmenteeContent = document.getElementById("addmentee-content");
var productContent = document.getElementById("product-content");
var projectrepoContent = document.getElementById("projectrepo-content");
var researchContent = document.getElementById("research-content");
var defaultContent = document.getElementById("default-content");






// get mentees 
function loadMentees(){
  $('#menteelist').html('');

  fetch("/api/getMentee?mentorId=" + userId)
  .then(response => response.json())
  .then(data => {
    console.log("data", data);
    console.log("here",data.data);
    data.data.reverse().slice().forEach(element => {

      var menteeHtml = '<tr><td>' + element[0].menteeEmail + '</td><td><a href="/profile?_id=' + element[0].menteeid + '"><button class="btn btn-primary">View Profile</button></a></td></tr>';
      $('#menteelist').append(menteeHtml);
    });
    // mentee list 
    if (!$.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable({
        pagingType: 'simple_numbers',
        // "numbers": 3,
      
        pageLength: 10,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
        language: {
          paginate: {
            previous: '&laquo;',
            next: '&raquo;'
          },
          lengthMenu: 'Show _MENU_ entries',
          info: 'Showing _START_ to _END_ of _TOTAL_ entries',
          search: 'Search:',
          zeroRecords: 'No mentee found'
        }
      });  }
   
  });
}
loadMentees();


// add mentee submit 
$('#addmenteeForm').on('submit', function (e) {
  e.preventDefault();
  var email = $('#menteeemail').val();
  console.log("email", email);
  var AddMenteeData = {
    userId: userId,
    email: email
  }
  fetch('/api/addMentee', {
    method: 'POST',
    headers: {

      'Content-Type': 'application/json'
    },
    body: JSON.stringify(AddMenteeData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      $('#addmenteealert').html('<div class="alert alert-warning alert-dismissible fade show" role="alert">'+data.message+'<button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button></div>');
      if (data.statusCode == 200) {
        // alert("Mentee added successfully");
        loadMentees();


      }
      else {
        // alert("Mentee not added");
      }
    })

    $('#menteeemail').val('');
});



profileBtn.addEventListener("click", function () {
  addmenteeContent.style.display = "none";
  productContent.style.display = "none";
  projectrepoContent.style.display = "none";
  researchContent.style.display = "none";
  defaultContent.style.display = "block";
});


profileAddmenteeBtn.addEventListener("click", function () {
  addmenteeContent.style.display = "block";
  productContent.style.display = "none";
  projectrepoContent.style.display = "none";
  researchContent.style.display = "none";
  defaultContent.style.display = "none";
});

profileProductBtn.addEventListener("click", function () {
  addmenteeContent.style.display = "none";
  productContent.style.display = "block";
  projectrepoContent.style.display = "none";
  researchContent.style.display = "none";
  defaultContent.style.display = "none";

  fetch("/api/getProducts?userId=" + userId)

    .then(response => response.json())
    .then(data => {
      console.log(data);
      var productData = data.data.allProducts;
      console.log("productDataLength", productData);

      var productDataLength = data.data.allProducts.length;

      var productDataHtml = "";
      // for (var i = 0; i < productDataLength; i++) {
      //     productDataHtml += '<div class="col-md-4 col-sm-6 col-xs-12">';
      //     productDataHtml += '<div class="card" style="width: 18rem;">';
      //     productDataHtml += '<img src="'+productData[i].photos[0].path+'" class="card-img-top" alt="...">';
      //     productDataHtml += '<div class="card-body">';
      //     productDataHtml += '<h5 class="card-title">' + productData[i].productTitle + '</h5>';
      //     productDataHtml += '<p class="card-text">' + productData[i].price + '</p>';
      //     productDataHtml += '<a href="#" class="btn btn-primary">View Detail</a>';
      //     productDataHtml += '</div>';
      //     productDataHtml += '</div>';
      //     productDataHtml += '</div>';
      // }
      for (var i = 0; i < productDataLength; i++) {
        console.log("productData[i]", productData[i]);

        productDataHtml += `
<div class="row justify-content-center mb-3">
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
        for (var j = 0; j < 5 - parseInt(JSON.stringify(productData[i].conditionRating)); j++) {
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
      $('.allProductList').html(productDataHtml);
    }
    );

}
);

profileProjectRepoBtn.addEventListener("click", async function () {
  addmenteeContent.style.display = "none";
  productContent.style.display = "none";
  projectrepoContent.style.display = "block";
  researchContent.style.display = "none";
  defaultContent.style.display = "none";
  var projectDataHtml = '';


  await fetch('/api/getUserById?userId=' + userId)
    .then(response => response.json())
    .then(async data => {
      console.log(data.userDetails.projectRepository);
      $('#projectrepo-content-inner').html('');
      // $('#projectrepo-content').append(`<div class="row">`);
      data.userDetails.projectRepository.forEach(function (project) {
        console.log("H", project[0]);
        var request = { "request": { _id: project[0] } };
        // ajax request on /api/getProjectRepository this api nd pass request as body
        $.ajax({
          url: '/api/getProjectRepository',
          type: 'GET',
          data: request,
          contentType: 'application/json',
          success: function (data) {
            console.log("K", data);
            projectDataHtml = ` <div class="courses col-lg-4 col-md-6 col-sm-12 ">
              <div class="course-item">
                  <img src="/images/Dummy/portfolio-6.jpg" class="img-fluid" alt="...">
                  <div class="course-content">
                    <h3><a href="course-details.html">`+ data.data.ProjectRepository[0].projectName + `</a></h3>
                    <p class="repotext">`+ data.data.ProjectRepository[0].projectDescription + `</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                    <a href="/projectRepository?_id=`+ data.data.ProjectRepository[0]._id + `"><h4>View Details</h4></a>
                  </div>                
                  <!-- </div> -->
                </div>
              </div>
            </div>`;
            $('#projectrepo-content-inner').append(projectDataHtml);
          },
          error: function (error) {
            console.error(error);
          }
        });
        console.log("kk..", projectDataHtml);

      })


    });





});


profileResearchBtn.addEventListener("click", function () {
  addmenteeContent.style.display = "none";
  productContent.style.display = "none";
  projectrepoContent.style.display = "none";
  researchContent.style.display = "block";
  defaultContent.style.display = "none";
  var researchContainer = document.getElementById("research-container-profile");
  researchContainer.innerHTML =``;
  for (var i = 0; i < userResearch.length; i++) {
    var research = userResearch[i];
 
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

    var collegeCategory = data.data.categories[0].mentorProfile.college;
    var universityCategory = data.data.categories[0].mentorProfile.university;
    var stateCategory = data.data.categories[0].mentorProfile.location;
    var educationCategory = data.data.categories[0].mentorProfile.education;
    var branchCategory = data.data.categories[0].mentorProfile.branch;
    var specializationCategory = data.data.categories[0].mentorProfile.Specialization;
    var typeOfmentorcaegory = data.data.categories[0].mentorProfile.typeOfMentor;
    // var semesterCategory = data.data.categories[0].mentorProfile.semester;
    // var streamCategory = data.data.categories[0].mentorProfile.stream;



    var collegeName = document.getElementById("collegeName");
    var universityName = document.getElementById("universityName");
    var stateName = document.getElementById("stateName");
    var educationName = document.getElementById("educationName");
    var branchName = document.getElementById("branchName");
    var typeofmentorName = document.getElementById("typeOfMentorName");
    var specializationName = document.getElementById("SpecializationName");


    for (var i = 0; i < collegeCategory.length; i++) {
      var option = document.createElement("option");
      option.text = collegeCategory[i];
      option.value = collegeCategory[i];
      collegeName.add(option);
    }




    for (var i = 0; i < specializationCategory.length; i++) {
      var option = document.createElement("option");
      option.text = specializationCategory[i];
      option.value = specializationCategory[i];
      specializationName.add(option);
    }




    for (var i = 0; i < typeOfmentorcaegory.length; i++) {
      var option = document.createElement("option");
      option.text = typeOfmentorcaegory[i];
      option.value = typeOfmentorcaegory[i];
      typeofmentorName.add(option);
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





