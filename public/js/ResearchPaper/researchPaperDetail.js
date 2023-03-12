

var userId;
var researchPaperId;
userId = document.currentScript.getAttribute('userid');
researchPaperId = document.currentScript.getAttribute('researchpaperid');
console.log("researchpaperid", researchPaperId);

console.log("userId", userId);

// get all comments of research paper

//  function getAllComments() {
//      fetch('/api/getAllComments?researchPaperId=' + researchPaperId, {
//         method: 'GET',
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data.forumDiscussion);
//             $('.allDiscussion').html('');





//             data.forumDiscussion.forEach( async element => {
//                 console.log('element', element.userid);
//                 console.log('element comment', element.comment);
                
//                 await fetch('/api/getUserById?userId=' + element.userid, {
//                     method: 'GET',
//                 }
//                 )
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log('Success:', data);
//                         console.log('element.comment indisde', element.comment);
                        
//                         if (data.statusCode == 200) {

//                         console.log('yeah', data);
                        
//                         $('.allDiscussion').append('<div class="d-flex">' +
//                             '<div class="flex-shrink-2" >' +
//                             '<img style="width:25px; border-radius:100px;" src="' + data.userDetails.profileImage.path + '" alt="...">' +
//                             '</div>' +
//                             '<div class="flex-grow-1 ms-3">' + '<h6>' +
//                             data.userDetails.email + '</h6>' + '<p>' +
//                             element.comment + '</p>' +
//                             '</div>' +
//                             '</div>');
//                         }
//                     });


//             });
//         });
// }


// new
async function getAllComments() {
    $('.allDiscussion').html('<div class="loader alert alert-success alert-dismissible fade show" role="alert">\
    <strong>Waiting!</strong> Loading Comment Please wait\
    <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button></div>');
    const response = await fetch('/api/getAllComments?researchPaperId=' + researchPaperId, { method: 'GET' });
    const data = await response.json();
    console.log('Success:', data.forumDiscussion);
    
    $('.allDiscussion').html('');
  
    const userDetailsPromises = data.forumDiscussion.reverse().slice().map(async element => {
      console.log('element', element.userid);
      console.log('element comment', element.comment);
      const userResponse = await fetch('/api/getUserById?userId=' + element.userid, { method: 'GET' });
      const userData = await userResponse.json();
      console.log('Success:', userData);
  
      if (userData.statusCode == 200) {
        console.log('yeah', userData);
        
        return '<div class="d-flex">' +
          '<div class="flex-shrink-2" >' +
          '<img style="width:25px; border-radius:100px;" src="' + userData.userDetails.profileImage.path + '" alt="...">' +
          '</div>' +
          '<div class="flex-grow-1 ms-3">' + '<h6>' +
          userData.userDetails.email + '</h6>' + '<p>' +
          element.comment + '</p>' +
          '</div>' +
          '</div>';
      }
    });
  
    const userDetailsResults = await Promise.all(userDetailsPromises);
    const renderedComments = userDetailsResults.filter(comment => comment).join('');
    $('.allDiscussion').html(renderedComments);
    // hide loader
    $('.loader').hide();
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
            if (data.statusCode == 200) {
                userEmail = data.userDetails.email;
                userRole = data.userDetails.role;
                var comment = $('#comment').val();
                var researchPaperId = $('#researchPaperId').val();
                var actualdata = {
                    userEmail: userEmail,
                    userId: userId,
                    comment: comment,
                    userRole: userRole,
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
