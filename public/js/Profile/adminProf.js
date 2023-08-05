var userId = document.currentScript.getAttribute("userId");
var userRole = document.currentScript.getAttribute("userRole");

console.log("userId", userId);
console.log("userRole", userRole);

var profileVerifyProductBtn = document.getElementById("profile-verifyproduct-btn");
var profileVerifyInternshipBtn = document.getElementById("profile-verifyinternship-btn");
var profileVerifyProjectBtn = document.getElementById("profile-verifyproject-btn");
var profileBtn = document.getElementById("profile-btn");


var verifyProductContent = document.getElementById("verifyproduct-content");
var verifyInternshipContent = document.getElementById("verifyinternship-content");
var verifyProjectContent = document.getElementById("verifyproject-content");
var defaultContent = document.getElementById("default-content");

verifyProductContent.style.display = "none";
verifyInternshipContent.style.display = "none";
verifyProjectContent.style.display = "none";
defaultContent.style.display = "block";



    // show and hide details of product
   
    $(document).on('click','.showDetail',function(){
        $(this).parent().parent().parent().parent().find(".card-footer").slideDown();
    })

    $(document).on('click','.hideDetail',function(){
        $(this).parent().parent().parent().parent().find(".card-footer").slideUp();
    })

    // verify product

    $(document).on('click','.verifybtn-product',function(){
        // get data-id of product
        var id=$(this).attr("data-id");
        console.log("id",id);
        // fetch api call to verify product
        fetch("/api/verifyproduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({id:id})
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data", data);
                    if(data.status){
                        // remove card from verifyProductContent
                        $(`#${id}`).remove();
                    }
                });
    });

    $(document).on('click','.verifybtn-internship',function(){
      // get data-id of product
      var id=$(this).attr("data-id");
      console.log("id",id);
      // fetch api call to verify product
      fetch("/api/verifyinternship", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({id:id})
              })
              .then((res) => res.json())
              .then((data) => {
                  console.log("data", data);
                  if(data.status){
                      // remove card from verifyInternshipContent
                      $(`#${id}`).remove();
                  }
              });
  });

  $(document).on('click','.verifybtn-industrialProject',function(){
    // get data-id of product
    var id=$(this).attr("data-id");
    console.log("id",id);
    // fetch api call to verify product
    fetch("/api/verifyIndustrialProject", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id})
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                if(data.status){
                    // remove card from verifyIndustrialProjectContent
                    $(`#${id}`).remove();
                }
            });
});








profileBtn.addEventListener("click", function () {
  verifyProductContent.style.display = "none";
  verifyInternshipContent.style.display = "none";
  verifyProjectContent.style.display = "none";
  defaultContent.style.display = "block";
});


profileVerifyProductBtn.addEventListener("click", function () {
  verifyProductContent.style.display = "block";
  verifyInternshipContent.style.display = "none";
  verifyProjectContent.style.display = "none";
  defaultContent.style.display = "none";
var card=``;
    // fetch api call to get all products which are not verified
    // and display them in verifyProductContent

    fetch("/api/getProducts?verified=false", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                var index=0;
                if(data.statusCode==200){
                console.log("data", data.data.allProducts);
                data.data.allProducts.forEach((product) => {
                    index++;
                    card+=` <div class="card shadow-3-strong border rounded-3" id="${ product._id }">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                          <div id="carouselExampleControls${ index }"
                            class="carousel slide" data-mdb-ride="carousel">
                            <div class="carousel-inner">`;


                               product.photos.forEach(function(photo){ 
                                card+=`<div class="carousel-item active"
                                  style="text-align: center;text-align: -webkit-center; text-align: -moz-center; ">
                                  <img style="height: 180px;" src="${ photo.path }"
                                    class="img-thumbnail d-block" alt="Product" />
                                </div>`;
                                 }) 





                            card+=`</div>
                            <button style="color:#1c4980;" class="carousel-control-prev"
                              type="button"
                              data-mdb-target="#carouselExampleControls${ index }"
                              data-mdb-slide="prev">
                              <span class="carousel-control-prev-icon"
                                aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button style="color:#1c4980;" class="carousel-control-next"
                              type="button"
                              data-mdb-target="#carouselExampleControls${ index }"
                              data-mdb-slide="next">
                              <span class="carousel-control-next-icon"
                                aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-6">
                          <h5 id="productName">
                            ${ product.productTitle }
                          </h5>
                          <div class="d-flex flex-row">
                            <div class="text-primary mb-1 me-2">
                              <span id="conditionRatingVal" style="display:none;">
                                ${ product.conditionRating }
                              </span>`;
                              for(var i=1; i<=product.conditionRating; i++){
                                card+=`<i class="fa fa-star"></i>`;
                                } 
                                   for(var j=0;j<5-product.conditionRating;j++){ 
                                    card+=`<i class="fa-regular fa-star"></i>`;
                                    } 

                            card+=`</div>
                          </div>
                          <div class="mt-1 mb-0  small">
                            <span class="text-primary"> • </span>
                            <span id="categoryName">
                              ${ product.category }
                            </span>
                            <span class="text-primary"> • </span>
                            <span>
                              ${ product.location }
                            </span>

                          </div>
                          <div class="mb-2 text-muted small">
                            <span class="text-primary"> • </span>
                            <span>Date Of Purchase : ${
                                product.dateOfPurchase.slice(0,10) }</span>

                          </div>
                          <div class="mb-2 text-muted small">
                          <span class="text-primary"> • </span>
                          <span>Seller Contact Email : ${
                              product.buyerEmail }</span>

                        </div>

                        </div>
                        <div
                          class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start d-flex flex-column ">
                          <!-- <div class="d-flex flex-row align-items-center mb-1"> -->
                          <span class="text-primary text-end">Message <i
                              class="fa fa-comment"></i></span>
                          <!-- <i class="fa fa-share"></i> -->
                        
                          <h4 class="mb-1 me-1">
                            ${ product.price } Rs.
                          </h4>
                          <button id="verifybtn-product" class="btn btn-secondary verifybtn-product" data-id="${product._id}">Verified</button>
                          <!-- chat icon  -->
                          <!-- </div> -->
                          <!-- <div class="d-flex flex-column mt-4"> -->
                          <button class="btn btn-primary mt-auto showDetail"
                            type="button">Details</button>

                          <!-- </div> -->
                        </div>
                      </div>
                    </div>
                    <div class="card-footer" style="display: none;">
                      <h5 class="text-uppercase text-primary">Notes</h5>
                      <p>
                        ${ product.note }<span class="hideDetail"
                            style="float:right;"><i
                              class=" text-primary fa-sharp fa-solid fa-arrow-up"></i></span>
                      </p>
                    </div>
                  </div>`;
                });
            }
            else{
                card=`<div class="card shadow-3-strong border rounded-3" id="noProduct">
                <div class="card-body">

                <h5 class="text-uppercase text-primary">No Product Found</h5>
                </div>
                </div>`;
                $('#verifyproduct-content-inner').html(card);
            }

                $('#verifyproduct-content-inner').html(card);
            })

});

profileVerifyInternshipBtn.addEventListener("click", function () {
  verifyInternshipContent.style.display = "block";
  verifyProductContent.style.display = "none";
  verifyProjectContent.style.display = "none";
  defaultContent.style.display = "none";
  var card=``;
    // fetch api call to get all products which are not verified
    // and display them in verifyProductContent
// ?adminverified=false
    fetch("/api/allInternship", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            var index=0;
            if(data.statusCode==200){
            console.log("data", data.data.allinternship);
            data.data.allinternship.forEach((internship) => {
              console.log("internships", internship)
              // adminverified
              if(internship.adminverified == false){
                index++;
                card+=` <div class="card shadow-3-strong border rounded-3 mb-2 grid-div"  id="${ internship._id }">
                <div class="card-body">
                  <div class="row">
                    
                    </div>
                    <div class="">
                      <h5 id="productName">
                        Company Name : ${ internship.companyName }
                      </h5>
                      
      
                      <div class="mb-2 text-muted small">
                      <span class="text-primary"> • </span>
                      <span> Type Of Intenship : ${ internship.typeOfInternship }</span>

                    </div>
                      <div class="mb-2 text-muted small">
                      <span class="text-primary"> • </span>
                      <span> Category : ${ internship.category }</span>

                    </div>
                      <div class="mb-2 text-muted small">
                        <span class="text-primary"> • </span>
                        <span>Date Of Purchase : ${
                            internship.duration } ${internship.morw}s</span>

                      </div>
                      <div class="mb-2 text-muted small">
                      <span class="text-primary"> • </span>
                      <span>Location : ${
                          internship.city} , ${internship.state}</span>

                    </div>

                    </div>
                    <div
                      class=" ">
                      <!-- <div class="d-flex flex-row align-items-center mb-1"> -->
                      
                      <!-- <i class="fa fa-share"></i> -->
                    
                      <h6 class="mb-2 me-1">
                      Stipend Amount: ${ internship.stipend } Rs.
                      </h6>
                      <button id="verifybtn-internship" class="btn btn-secondary verifybtn-internship" data-id="${internship._id}">Verified</button>
                      

                      <!-- </div> -->
                    </div>
                  </div>
                </div>
          
              </div>`;
                }
              //   else{
              //     card=`<div class="card shadow-3-strong border rounded-3" id="nointernship">
              //     <div class="card-body">
      
              //     <h5 class="text-uppercase text-primary">No Internship Found</h5>
              //     </div>
              //     </div>`;
              //     $('#verifyinternship-content-inner').html(card);
              // }
            });
        }
            $('#verifyinternship-content-inner').html(card);
        })
});

profileVerifyProjectBtn.addEventListener("click", function () {
  verifyProjectContent.style.display = "block";
  verifyInternshipContent.style.display = "none";
  verifyProductContent.style.display = "none";
  defaultContent.style.display = "none";
  var card=``;
    // fetch api call to get all products which are not verified
    // and display them in verifyProductContent
// ?adminverified=false
    fetch("/api/allIndustrialProjects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            var index=0;
            if(data.statusCode==200){
            console.log("data", data.data.allinternship);
            data.data.allIndustrialProject.forEach((industrialProject) => {
              console.log("industrialProjects", industrialProject)
              // adminverified
              if(industrialProject.adminverified == false){
                index++;
                card+=` <div class="card shadow-3-strong border mb-2 rounded-3 grid-div" id="${ industrialProject._id }">
                <div class="card-body">
                  <div class="row">
                    
                    </div>
                    <div class="">
                      <h5 id="productName">
                        Project Title : ${ industrialProject.projectTitle }
                      </h5>
                      
                      <div class="mb-2 text-muted small">
                      <span class="text-primary"> • </span>
                      <span> Commpany Name : ${ industrialProject.companyName }</span>

                    </div>
                      <div class="mb-2 text-muted small">
                      <span class="text-primary"> • </span>
                      <span> Type Of Project : ${ industrialProject.typeOfIndustrialProject }</span>

                    </div>
                      <div class="mb-2 text-muted small">
                      <span class="text-primary"> • </span>
                      <span> Category : ${ industrialProject.category }</span>

                    </div>
                      <div class="mb-2 text-muted small">
                        <span class="text-primary"> • </span>
                        <span>Date Of Purchase : ${
                          industrialProject.duration } ${industrialProject.morw}s</span>

                      </div>
                      <div class="mb-2 text-muted small">
                      <span class="text-primary"> • </span>
                      <span>Location : ${
                        industrialProject.city} , ${industrialProject.state}</span>

                    </div>

                    </div>
                    <div
                      class="">
                      <!-- <div class="d-flex flex-row align-items-center mb-1"> -->
                     
                      <!-- <i class="fa fa-share"></i> -->
                    
                      <h6 class="mb-2 me-1">
                      Stipend Amount: ${ industrialProject.stipend } Rs.
                      </h6>
                      <button id="verifybtn-industrialProject" class="btn btn-secondary verifybtn-industrialProject" data-id="${industrialProject._id}">Verified</button>
                      
                      
                    </div>
                  </div>
                </div>
                
              </div>`;
                }
              //   else{
              //     card=`<div class="card shadow-3-strong border rounded-3" id="noindustrialProject">
              //     <div class="card-body">
      
              //     <h5 class="text-uppercase text-primary">No Product Found</h5>
              //     </div>
              //     </div>`;
              //     $('#verifyproject-content-inner').html(card);
              // }
            });
        }
        

            $('#verifyproject-content-inner').html(card);
        })
});







$(".nav .nav-link").on("click", function () {
  $(".nav").find(".active").removeClass("active");
  $(this).addClass("active");
});



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

{/* <div class="mt-1 mb-0  small">
<span class="text-primary"> • </span>
<span id="categoryName">
Category : ${ internship.category }
</span>
<span class="text-primary"> • </span>
<span>
  Type : ${ internship.typeOfInternship }
</span>

</div> */}