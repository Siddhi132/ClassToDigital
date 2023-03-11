

var userId;
var researchPaperId;
userId = document.currentScript.getAttribute('userid');
researchPaperId = document.currentScript.getAttribute('researchpaperid');
console.log("researchpaperid", researchPaperId);

console.log("userId", userId);

// get all comments of research paper

function getAllComments(){
    fetch('/api/getAllComments?researchPaperId='+researchPaperId, {
        method: 'GET',
    } )
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            $('.allDiscussion').html('');
            data.forumDiscussion.slice().reverse().forEach(element => {
                $('.allDiscussion').append('<div class="d-flex">' +
                '<div class="flex-shrink-2" >' +
                '<img style="width:25px" src="/images/Profile/dummy_user.jpg" alt="...">' +
                '</div>' +
                '<div class="flex-grow-1 ms-3">' + '<h6>' +
                    element.useremail + '</h6>' + '<p>' +
                        element.comment + '</p>' +
                '</div>' +
                '</div>');
            });
        });
}
getAllComments();



$('#addComment').on("submit", function (e) {
    e.preventDefault();
    var userEmail;
    fetch('/api/getUserById?userId=' + userId, {
        method: 'GET',
    }
    )
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if(data.statusCode==200){
            userEmail = data.userDetails.email;
            var comment = $('#comment').val();
            var researchPaperId = $('#researchPaperId').val();
            var actualdata = {
                userEmail: userEmail,
                userId: userId,
                comment: comment,
                researchPaperId: researchPaperId
            }

            fetch('/api/addCommentinResearchPaper', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actualdata)
            }
            )
                .then(response2 => response2.json())
                .then(data2 => {
                    console.log('Success:', data2);
                    $('#comment').val('');
                    $('#comment').focus();
                    if (data2.status == true) {
                        $('#commentAdd').html('<div class="alert alert-success alert-dismissible fade show" role="alert">\
                <strong>Success!</strong> Comment added successfully.\
                <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>\
                  </div>');
                  getAllComments();
                    }
                    else {
                        $('#commentAdd').html('<div class="alert alert-danger alert-dismissible fade show" role="alert">\
                <strong>Failed!</strong> Comment not added.\
                <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button></div>');
                    }

                });


            }




        });



})
