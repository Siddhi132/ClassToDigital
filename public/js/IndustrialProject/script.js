const $filterBtn = $('#filter-btn');
const $hideFilter = $('#hide-filter-btn');
const $sidebar = $('.sidebar');
const $priceSlider = $('#price-slider');
// slider value change 
$priceSlider.slider({
  range: true,
  min: 0,
  max: 50000,
  step: 1000,
  slide: function(event, ui) {
    let startValue = ui.values[0];
    let stipend = ui.values[1];
    $('.start').html(startValue);
    $('.end').html(stipend);
    console.log(startValue, stipend);
  }
});

// filter IndustrialProject 
function filterIndustrialProject() {
  var data = {};
  var category = $("#category").val();
  var location = $("#location").val();
  let modeOfIndustrialProject = $('#modeOfIndustrialProject').val();
  let stipend = ($('#price-slider').slider('values'))[1];
 
  if($('#typeOfIndustrialProject').is(":checked")){
    console.log('checked');
    data['typeOfIndustrialProject']="Part time";
  }
  if($('#paidOrUnpaid').is(":checked")){
    console.log('checked');
    data['paidOrUnpaid'] = "Paid";
  }
  if(location){
      data['location'] = location;
  }
  if(category){
      data['category'] = category;
  }
  if(modeOfIndustrialProject){
      data['modeOfIndustrialProject'] = modeOfIndustrialProject;
  }
  data['stipend'] = stipend;
  console.log("data123:",data);
  fetch('/api/allIndustrialProjects?'+new URLSearchParams(data), {
    method: 'GET',
  })
  .then(res => res.json())
  .then(data => {
    console.log("data:",data);
    if(data.statusCode==200){
      var card=``;
      var activeDeactive;
      var lengthOfArray=data.data.allIndustrialProject.length;
      $('#noOfIndustrialProjectFound').text(lengthOfArray+" Industrial Projects Found");
    data.data.allIndustrialProject.forEach(item => {
      if(item.status){
        activeDeactive='Actively Hiring';
      }
      else{
        activeDeactive='Not Actively Hiring';
      }
       card+=` <div class="card">

       <div class="activeDeactive">
           
             <span>${activeDeactive}</span>
             
      
       </div>
       <div class="row">
           <div class="col-md-8">
           <h4>
           ${ item.projectTitle }

           </h4>
               <h6>
                   ${ item.position }
               </h6>
               <p id="companyName">
                 ${ item.companyName }
               </p>
               
       
           </div>
           <div class="col-md-4">
               <img src="images/Internship/IBM_logo_in.jpg" width="50%" alt="">
           </div>
       </div>
       
       <div class="row">
       <p><i class="fa-solid fa-location-dot"></i>
                 ${ item.location }
       
             </p>
           <div class="col-md-3">
               <p><i class="fa-regular fa-circle-play"></i>Start date</p>
               <p>
       
                 ${ item.dateOfPosting.slice(0,10) }
                 
               </p>
           </div>
           <div class="col-md-3">
               <p><i class="fa-regular fa-calendar"></i>Duration</p>
               <p>
                   ${ item.duration }
               </p>
           </div>
           <div class="col-md-3">
               <p><i class="fa-solid fa-money-check"></i>Stipend</p>
               <p>
                   ${ item.stipend }
               </p>
           </div>
       </div>
       <div class="paidOrUnpaid d-flex mb-3">
           <div class="ms-1 me-1">
               <span>
                   ${ item.paidOrUnpaid }
               </span>
           </div>
           <div class="ms-1 me-1">
               <span><i class="fa-regular fa-clock"></i>
                 ${ item.typeOfIndustrialProject }
               </span>
       
           </div>
           <div class="ms-1 me-1">
               <span><i class="fa fa-home-user"></i>
                 ${ item.modeOfIndustrialProject }
               </span>
       
           </div>
       </div>
       <div class="totalApplication">
           <p>
             <i class="fa-regular fa-user"></i>
             ${ item.totalNumberOfApplicants }
             Applicants
           </p>
       </div>
       <hr>
       <div class="d-flex flex-row-reverse">
           <div class="ms-2 me-2">
               <a href="IndustrialProjectDetail?id=" ><button class="btn btn-primary" id="detailbtn">View Details</button></a>
           </div>
           <div class="">
               <button class="btn btn-secondary">Apply Now</button>
           </div>
       
       </div>
       
       
       </div>`;
    });
    console.log("card",card);
    $('.listings').html(card);

    }
    else{
      card=`<div class="card" style="width:100%">
      <div class="card-body" style="padding:0px">
        <h5 class="card-title">${ data.message}</h5>
      </div>`;
      $('.listings').html(card);
    }
    
  }
  );
}


// categories in filter section 
fetch('/api/Categories')
  .then(res => res.json())
  .then(data => {
    console.log(data.data.categories[0].industrialProject);
    let industrialProjects=data.data.categories[0].industrialProject;
    let categories=industrialProjects.category;
    let locations=industrialProjects.location;
    let modeOfIndustrialProjects=industrialProjects.modeOfIndustrialProject;
    categories.forEach(category => {
      $('#category').append(`<option value="${category}">${category}</option>`);
    });
    locations.forEach(location => {
      $('#location').append(`<option value="${location}">${location}</option>`);
    }
    );
    modeOfIndustrialProjects.forEach(modeOfIndustrialProject => {
      $('#modeOfIndustrialProject').append(`<option value="${modeOfIndustrialProject}">${modeOfIndustrialProject}</option>`);
    }
    );
  }
);

// submit filter form 
$(document).on('click',"#submitFilterForm", function(e) {
  console.log('filter form submitted');
  e.preventDefault();
  filterIndustrialProject();
  $sidebar.css('transform','translateX(-100%)');


});


// search by company name 
$(document).on('keyup',"#searchCompany", function(e) {
$(this).val($(this).val().toLowerCase());

  $('.card').each(function(){
    if($(this).find('#companyName').text().toLowerCase().indexOf($('#searchCompany').val())==-1){
      $(this).hide();
    }
    else{
      $(this).show();
    }
  });
});

// show filter sidebar
$filterBtn.on('click', function() {
  $sidebar.css('transform', 'translateX(0)');
});
// hide filter sidebar
$hideFilter.on('click', function() {
  $sidebar.css('transform','translateX(-100%)');
});