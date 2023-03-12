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


profileBtn.addEventListener("click", function(){
    internshipContent.style.display = "none";
    productContent.style.display = "none";
    idpContent.style.display = "none";
    researchContent.style.display = "none";
    mentorContent.style.display = "none";
    defaultContent.style.display = "block";
});


profileInternshipBtn.addEventListener("click", function(){
    internshipContent.style.display = "block";
    productContent.style.display = "none";
    idpContent.style.display = "none";
    researchContent.style.display = "none";
    mentorContent.style.display = "none";
    defaultContent.style.display = "none";
});

profileProductBtn.addEventListener("click", function(){
    internshipContent.style.display = "none";
    productContent.style.display = "block";
    idpContent.style.display = "none";
    researchContent.style.display = "none";
    mentorContent.style.display = "none";
    defaultContent.style.display = "none";

}
);

profileIdpBtn.addEventListener("click", function(){
    internshipContent.style.display = "none";
    productContent.style.display = "none";
    idpContent.style.display = "block";
    researchContent.style.display = "none";
    mentorContent.style.display = "none";
    defaultContent.style.display = "none";
}
);

profileResearchBtn.addEventListener("click", function(){
    internshipContent.style.display = "none";
    productContent.style.display = "none";
    idpContent.style.display = "none";
    researchContent.style.display = "block";
    mentorContent.style.display = "none";
    defaultContent.style.display = "none";
}
);

profileMentorsBtn.addEventListener("click", function(){
    internshipContent.style.display = "none";
    productContent.style.display = "none";
    idpContent.style.display = "none";
    researchContent.style.display = "none";
    mentorContent.style.display = "block";
    defaultContent.style.display = "none";
}
);

$(".nav .nav-link").on("click", function(){
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

    var collegeCategory=data.data.categories[0].studentProfile.college;
    var universityCategory=data.data.categories[0].studentProfile.university;
    var stateCategory=data.data.categories[0].studentProfile.state;
    var educationCategory=data.data.categories[0].studentProfile.education;
    var branchCategory=data.data.categories[0].studentProfile.branch;
    var semesterCategory=data.data.categories[0].studentProfile.semester;
    var streamCategory=data.data.categories[0].studentProfile.stream;



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
    var file    = document.querySelector('input[name=profileImage]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }