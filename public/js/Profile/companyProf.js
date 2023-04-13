

var profileInternshipBtn = document.getElementById("profile-internship-btn");

var profileIdpBtn = document.getElementById("profile-idp-btn");
var profileBtn = document.getElementById("profile-btn");


var internshipContent = document.getElementById("internship-content");
var idpContent = document.getElementById("idp-content");
var defaultContent = document.getElementById("default-content");
var applicantContent = document.getElementById("applicants-content");
var viewApplicantsBtn = document.getElementById("view-applicants-btn");
profileBtn.addEventListener("click", function () {
  internshipContent.style.display = "none";

  idpContent.style.display = "none";
  applicantContent.style.display = "none";


  defaultContent.style.display = "block";
});


profileInternshipBtn.addEventListener("click", function () {
  internshipContent.style.display = "block";
  idpContent.style.display = "none";
  defaultContent.style.display = "none";
  applicantContent.style.display = "none";
});

profileIdpBtn.addEventListener("click", function () {
  internshipContent.style.display = "none";

  idpContent.style.display = "block";


  defaultContent.style.display = "none";
  applicantContent.style.display = "none";
}
);



$(".nav .nav-link").on("click", function () {
  $(".nav").find(".active").removeClass("active");
  $(this).addClass("active");
});

fetch("/api/Categories")
  .then(response => response.json())
  .then(data => {
    console.log("data company", data);


    var companyState = data.data.categories[0].companyProfile.state;
    var companyCategory = data.data.categories[0].companyProfile.category;

    var stateName = document.getElementById("stateName");
    var categoryName = document.getElementById("categoryName");

    for (var i = 0; i < companyState.length; i++) {
      var option = document.createElement("option");
      option.text = companyState[i];
      option.value = companyState[i];
      stateName.add(option);
    }

    for (var i = 0; i < companyCategory.length; i++) {
      var option = document.createElement("option");
      option.text = companyCategory[i];
      option.value = companyCategory[i];
      categoryName.add(option);
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
var userInternships = document.currentScript.getAttribute('userInternships').split(',');
var userIdp = document.currentScript.getAttribute('userIdp').split(',');
var userId = document.currentScript.getAttribute('userId');
var appliedStudents = document.currentScript.getAttribute('appliedStudents').split(',');
console.log('userInternships', userInternships);


// for (var i = 0; i < userInternships.length; i++) {
//   var internship = userInternships[i];
//   fetch('/api/getInternshipById?id=' + internship, {
//     method: 'GET',
//   }
//   )
//     .then(response => response.json())
//     .then(data => {
//       var internship = data.data.internship;
//       // internship.appliedStudents

//       var appliedStudetns = internship.appliedStudents.map(function (student) {
//         return student.studentId;
//       })
//       console.log('Success:', data.data.internship);
//       internshipContainer.innerHTML += `   <div class="row justify-content-center mb-3">
//               <div class="col-md-12 col-xl-10">
//                 <div class="card shadow-0 border rounded-3">
//                   <div class="card-body">
//                     <div class="row">
                      
//                       <div class="col-md-7 col-lg-7 col-xl-7">
//                         <h5>${internship.position}</h5>
//                         <h6>${internship.companyName}</h6>
                        
//                         <div class="d-flex flex-row">
//                           <div class="text-danger mb-1 me-2">
//                             <i class="fa fa-location-arrow"></i>
//                           </div>
//                           <span>${internship.location}</span>
//                         </div>
//                         <div class="mt-1 mb-0 text-muted small">
//                           <span>paid</span>
//                           <span class="text-primary"> • </span>
//                           <span>work from home</span>
                    
//                         </div>
                     
//                         <p class="text-truncate mb-4 mb-md-0">
//                           ${internship.briefDescription}
//                         </p>
//                       </div>
//                       <div class="col-md-5 col-lg-5 col-xl-5 border-sm-start-none border-start">
//                       <div class="d-flex flex-row align-items-center mb-1">
//                       <h6 class="mb-1 me-1">Date of Upload ${internship.dateOfPosting.slice(0, 10)}</h6>
//                     </div>
//                     <h6 class="text-success"> ${internship.category}</h6>
//                         <div class="d-flex  mt-4 gap-2 flex-wrap">
                          
//                           <a href="/internships?_id=${internship._id}"><button class="btn btn-primary" id="detailbtn">View
//                           Details</button></a>
//                           <button class="btn btn-primary" id="view-applicants-btn" onclick="viewApplicants('internship','${appliedStudetns}', '${internship._id}')">View Applicants</button>
//                         </div>
      
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//     `;
//     }
//     )
//     .catch((error) => {
//       console.error('Error:', error);
//     }
//     );

// }

async function displayInternships() {
  const promises = [];
  for (const internshipId of userInternships) {
    const promise = fetch('/api/getInternshipById?id=' + internshipId, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const internship = data.data.internship;
        const appliedStudents = internship.appliedStudents.map(student => student.studentId);
        console.log('Success:', internship);
        return `
          <div class="row justify-content-center mb-3">
            <div class="col-md-12 col-xl-10">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-7 col-lg-7 col-xl-7">
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
                    <div class="col-md-5 col-lg-5 col-xl-5 border-sm-start-none border-start">
                      <div class="d-flex flex-row align-items-center mb-1">
                        <h6 class="mb-1 me-1">Date of Upload ${internship.dateOfPosting.slice(0, 10)}</h6>
                      </div>
                      <h6 class="text-success"> ${internship.category}</h6>
                      <div class="d-flex  mt-4 gap-2 flex-wrap">
                        <a href="/internships?_id=${internship._id}"><button class="btn btn-primary" id="detailbtn">View Details</button></a>
                        <button class="btn btn-primary" id="view-applicants-btn" onclick="viewApplicants('internship','${appliedStudents}', '${internship._id}')">View Applicants</button>
                        <button class="btn btn-primary" id="close-application" onclick="closeApplication('internship', '${internship._id}')">Close Application</button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    promises.push(promise);
  }
  const results = await Promise.all(promises);
  internshipContainer.innerHTML = results.join('');
}

displayInternships()























// for (var i = 0; i < userIdp.length; i++) {
//   var idp = userIdp[i];
//   fetch('/api/getIndustrialProjectById?id=' + idp, {
//     method: 'GET',
//   }
//   )
//     .then(response => response.json())
//     .then(data => {
//       console.log("data", data)
//       var insustrialProject = data.data.IndustrialProject;
//       console.log('nana', insustrialProject);
      
//       var appliedStudetns = insustrialProject.appliedStudents.map(function (student) {
//         return student.studentId;
//       })
//       console.log('Success baba kaka', appliedStudetns);
//       console.log('Success: oyehoye', data.data.IndustrialProject);
//       idpContainer.innerHTML += `   <div class="row justify-content-center mb-3">
//           <div class="col-md-12 col-xl-10">
//             <div class="card shadow-0 border rounded-3">
//               <div class="card-body">
//                 <div class="row">
//                 <div class="col-md-7 col-lg-7 col-xl-7">
//                     <h5>${insustrialProject.position}</h5>
//                     <h6>${insustrialProject.companyName}</h6>
//                     <div class="d-flex flex-row">
//                       <div class="text-primary mb-1 me-2">
//                         <i class="fa fa-location-arrow"></i>
  
//                       </div>
//                       <span>${insustrialProject.location}</span>
//                     </div>
//                     <div class="mt-1 mb-0 text-muted small">
//                       <span>paid</span>
//                       <span class="text-primary"> • </span>
//                       <span>work from home</span>
                
//                     </div>
                 
//                     <p class="text-truncate mb-4 mb-md-0">
//                       ${insustrialProject.briefDescription}
//                     </p>
//                   </div>
//                   <div class="col-md-5 col-lg-5 col-xl-5 border-sm-start-none border-start">

//                     <div class="d-flex flex-row align-items-center mb-1">
//                     <h6 class="mb-1 me-1">Date of Upload ${insustrialProject.dateOfPosting.slice(0, 10)}</h6>
//                     </div>
//                     <h6 class="text-success"> ${insustrialProject.category}</h6>
//                     <div class="d-flex  mt-4 gap-2 flex-wrap">
                      
//                       <a href="/industrialProjects?_id=${insustrialProject._id}"><button class="btn btn-primary" id="detailbtn">View
//                       Details</button></a>
//                       <button class="btn btn-primary" id="view-applicants-btn" onclick="viewApplicants('industrialProject','${appliedStudetns}', '${insustrialProject._id}')">View Applicants</button>

//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//   `;
//     }
//     )
//     .catch((error) => {
//       console.error('Error:', error);
//     }
//     );

// }


// Create an array to store the fetch promises
var fetchPromises = [];

// Loop through the user IDs and create a fetch request for each
for (var i = 0; i < userIdp.length; i++) {
  var idp = userIdp[i];
  var fetchPromise = fetch('/api/getIndustrialProjectById?id=' + idp, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      // Process the data as before
      var insustrialProject = data.data.IndustrialProject;
      var appliedStudetns = insustrialProject.appliedStudents.map(function (student) {
                return student.studentId;
              })
      // ...
      return ` <div class="row justify-content-center mb-3">
      <div class="col-md-12 col-xl-10">
        <div class="card shadow-0 border rounded-3">
          <div class="card-body">
            <div class="row">
            <div class="col-md-7 col-lg-7 col-xl-7">
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
              <div class="col-md-5 col-lg-5 col-xl-5 border-sm-start-none border-start">

                <div class="d-flex flex-row align-items-center mb-1">
                <h6 class="mb-1 me-1">Date of Upload ${insustrialProject.dateOfPosting.slice(0, 10)}</h6>
                </div>
                <h6 class="text-success"> ${insustrialProject.category}</h6>
                <div class="d-flex  mt-4 gap-2 flex-wrap">
                  
                  <a href="/industrialProjects?_id=${insustrialProject._id}"><button class="btn btn-primary" id="detailbtn">View
                  Details</button></a>
                  <button class="btn btn-primary" id="view-applicants-btn" onclick="viewApplicants('industrialProject','${appliedStudetns}', '${insustrialProject._id}')">View Applicants</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    })
    .catch((error) => {
      console.error('Error:', error);
      return ''; // Return an empty string if there is an error
    });
  fetchPromises.push(fetchPromise); // Add the promise to the array
}

// Wait for all the fetch requests to complete
Promise.all(fetchPromises)
  .then(htmlArray => {
    // Append the HTML in the desired order
    idpContainer.innerHTML = htmlArray.join('');
  });
























async function viewApplicants(object, ids, itemId) {

  internshipContent.style.display = "none";
  idpContent.style.display = "none";
  defaultContent.style.display = "none";
  applicantContent.style.display = "block";
  var ids = ids.split(',');
  console.log("ids", ids)
  $('#applicants-table-tbody').html('');

  for (var i = 0; i < ids.length; i++) {
    var studentId = ids[i];
    console.log('studentId', studentId);
    await fetch('/api/getUserById?userId=' + studentId, {
      method: 'GET',
    }
    )

      .then(response => response.json())
      .then(data => {
        if (object == "internship") {
          var Status = data.userDetails.internships.find(internship => internship.internshipId == itemId).status;
        }
        else if (object == "industrialProject") {
          var Status = data.userDetails.industrialProjects.find(industrialProject => industrialProject.industrialProjectId == itemId).status;
        }
          var badgeStatus = "";
          var diable = "";
          if (Status == "pending") {
            badgeStatus = "bg-warning";
          } else if (Status == "hired") {
            Status = "bg-success";
            diable = "disabled";
          } else if (Status == "rejected") {
            badgeStatus = "bg-danger";
            diable = "disabled";
          }
          console.log("--------------", data.userDetails)
          console.log("data-----------", data)
          // $('#applicants-table').DataTable();


          var tableHtml =
            `
        <tr>
        <td>${data.userDetails.name}</td>
        <td>${data.userDetails.college}</td>
        <td>${data.userDetails.semester}</td>
        <td><a href="${data.userDetails.resume.path}" ><i class="fa fa-download" aria-hidden="true"></i></a></td>
        <td><button class="btn btn-primary btn-sm" onclick="viewProfile('${data.userDetails._id}')">View Profile</button></td>
        <td>
        <button class="btn btn-sm btn-success" id ="hiredDisabler" ${diable}
        onclick="acceptApplicant('${object}','${data.userDetails._id}', '${itemId}', 'hired')">
        <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="btn btn-sm btn-danger" id="rejectDisabler" ${diable}
         onclick="acceptApplicant('${object}','${data.userDetails._id}', '${itemId}', 'rejected')">
        <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        </td>
        <td><span class="badge ${badgeStatus}" id="${data.userDetails._id}">${Status}</span></td>
        </tr>
`

          $('#applicants-table-tbody').append(tableHtml);

          if (!$.fn.DataTable.isDataTable('#applicants-table')) {
            $('#applicants-table').DataTable({
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
                zeroRecords: 'No matching records found'
              }
            });
          }





        })

      .catch((error) => {
        console.error('Error:', error);
      }
      );
  }



}

function acceptApplicant(object, id, itemId, status) {
  // /api/modifyStatus

  $.ajax({
    url: '/api/modifyStatus',
    type: 'POST',
    data: {
      // const { object,id, internshipId, status } = req.body;
      object: object,
      itemId: itemId,
      status: status,
      studentId: id
    },
    success: function (data) {
      console.log("data", data)
      if (data.status == "success") {
        alert("Accepted Successfully");

      }
    },
    error: function (err) {
      console.log("err hey hey", err)
    }

  });


  if (object == "internship") {

  $.ajax({
    url: '/api/modifyApplicationStatus',
    type: 'POST',
    data: {
      // const {studentId, status, internshipId } = req.body;

      studentId: id,
      status: status,
      internshipId: itemId
    },
    success: function (data) {
      console.log('data', data);
      if (data.status == "success") {
        alert("Accepted Successfully");
      }
    },
    error: function (err) {
      console.log("err hey hey", err)
    }
  });
  }
  else if (object == "industrialProject") {
    $.ajax({
      url: '/api/modifyApplicationStatusIdp',
      type: 'POST',
      data: {
        // const {studentId, status, internshipId } = req.body;
  
        studentId: id,
        status: status,
        idpId: itemId
      },
      success: function (data) {
        console.log('data', data);
        if (data.status == "success") {
          alert("Accepted Successfully");
        }
      },
      error: function (err) {
        console.log("err hey hey", err)
      }
    });
  }

  $("#" + id).html(status);
  if (status == "hired") {
    $("#" + id).removeClass();
    $("#" + id).addClass("badge bg-success");
    $("#hiredDisabler").attr("disabled", true);
    $("#rejectDisabler").attr("disabled", true);  
  } else if (status == "rejected") {
    $("#" + id).removeClass();
    $("#" + id).addClass("badge bg-danger");
    $("#hiredDisabler").attr("disabled", true);
    $("#rejectDisabler").attr("disabled", true);
  }
}




