



fetch("/api/Categories")
.then(response => response.json())
.then(data => {
    console.log(data);
        
    var college=data.data.categories[0].projectRepository.college;
    var university=data.data.categories[0].projectRepository.university;
    

    var collegeName = document.getElementById("collegeName");
    var universityName = document.getElementById("universityName");
    

    for (var i = 0; i < college.length; i++) {
        var option = document.createElement("option");
        option.text = college[i];
        option.value = college[i];
        collegeName.add(option);
    }

    for (var i = 0; i < university.length; i++) {
        var option = document.createElement("option");
        option.text = university[i];
        option.value = university[i];
        universityName.add(option);
    }

   

})
.catch(error => {
    console.log(error);
})

// Closes an alert by removing it from the DOM. If the .fade and .show classes are present on the element, the alert will fade out before it is removed.
$(document).on('click', '.alert .btn-close', function(e) {
    $(this).parent().remove();
});



