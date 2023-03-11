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

