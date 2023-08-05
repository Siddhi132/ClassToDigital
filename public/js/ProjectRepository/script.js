const input = document.querySelector("#search-input");
const content = document.querySelector("#search-content");
const elements = content.querySelectorAll(".repo-card");

input.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  for (let element of elements) {
    const text = element.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
});

$(document).ready(function () {
  $.ajax({
    url: "/api/getProjectRepository",
    type: "GET",
    dataType: "json",
    success: function (data) {
      if (data) {
        var projectRepo = data.data.ProjectRepository;
        var container = $("#repoContainer");
        container.empty();
        for (var i = 0; i < projectRepo.length; i++) {
          console.log(i, projectRepo[i]);
          var teamMembers = projectRepo[i].teamMember;
          var teamMemberArr = teamMembers.split(",");
          // If there is no comma, create an array with a single element
          if (
            teamMemberArr.length === 1 &&
            teamMemberArr[0] === teamMembers
          ) {
            teamMemberArr = [teamMembers];
          }
          console.log(teamMemberArr);
          const projectId = projectRepo[i]._id;
          const repoUrl = `/projectRepository?_id=${projectId}`;
          const members = projectRepo[i].teamMember.split(",");
          let membersHTML = "";
          members.forEach((member) => {
            membersHTML += `
<div class="flex>
<a href="">
<span class="badge bg-primary mx-2">${member}</span>
</a>
</div>
`;
          });

          // Construct the card HTML markup with the membersHTML included
          const card = `
<div class="card p-sm-4 p-0 m-2 m-sm-4 text-start text-sm-start">
<div class="card-header text-muted sm:my-2 small">${projectRepo[i].label}</div>
<div class="card-body">
<div class="project-title">
<strong>Project Name :</strong> ${projectRepo[i].projectName}
</div>
<div class="mb-3 flex-sm-row flex-column sm:mb-3 mt-3 hidden d-sm-flex">
<span class="label label-dark">Team Members :</span>
<div id="teamMemberContainer" class="mb-3  flex-sm-row flex-column  mt-0 hidden d-sm-flex">
${membersHTML}
</div>
</div>
<p class="card-text height-50 small mt-3">
<strong>Domain :</strong> ${projectRepo[i].projectDomain}
</p>
<div class="d-sm-flex text-center justify-content-between">
<div class="card-footer small">
College : ${projectRepo[i].collegeName}, University : ${projectRepo[i].universityName}
</div>
<div class="d-sm-flex flex-row-reverse text-center">
<a href="${repoUrl}" class="detailsLinkRepo">
  <button class="btn btn-primary detailbtnRepo">View Details repo</button>
</a>
</div>
</div>
</div>
</div>
`;

          container.append(card);
        }
      } else {
        console.log("No data found");
      }
    },
    error: function (error) {
      console.log("Error: " + error.error);
    },
  });
  $("#RepositoryButton").click(function () {
    $.ajax({
      url: "/api/getProjectRepository",
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (data) {
          var projectRepo = data.data.ProjectRepository;
          var container = $("#repoContainer");
          container.empty();
          for (var i = 0; i < projectRepo.length; i++) {
            console.log(i, projectRepo[i]);
            var teamMembers = projectRepo[i].teamMember;
            var teamMemberArr = teamMembers.split(",");
            // If there is no comma, create an array with a single element
            if (
              teamMemberArr.length === 1 &&
              teamMemberArr[0] === teamMembers
            ) {
              teamMemberArr = [teamMembers];
            }
            console.log(teamMemberArr);
            const projectId = projectRepo[i]._id;
            const repoUrl = `/projectRepository?_id=${projectId}`;
            const members = projectRepo[i].teamMember.split(",");
            let membersHTML = "";
            members.forEach((member) => {
              membersHTML += `
    <div class="flex>
      <a href="">
        <span class="badge bg-primary mx-2">${member}</span>
      </a>
    </div>
  `;
            });

            // Construct the card HTML markup with the membersHTML included
            const card = `
  <div class="card p-sm-4 p-0 m-2 m-sm-4 text-start text-sm-start">
    <div class="card-header text-muted sm:my-2 small">${projectRepo[i].label}</div>
    <div class="card-body">
      <div class="project-title">
        <strong>Project Name :</strong> ${projectRepo[i].projectName}
      </div>
      <div class="mb-3 flex-sm-row flex-column sm:mb-3 mt-3 hidden d-sm-flex">
        <span class="label label-dark">Team Members :</span>
        <div id="teamMemberContainer" class="mb-3  flex-sm-row flex-column  mt-0 hidden d-sm-flex">
          ${membersHTML}
        </div>
      </div>
      <p class="card-text height-50 small mt-3">
        <strong>Domain :</strong> ${projectRepo[i].projectDomain}
      </p>
      <div class="d-sm-flex text-center justify-content-between">
        <div class="card-footer small">
          College : ${projectRepo[i].collegeName}, University : ${projectRepo[i].universityName}
        </div>
        <div class="d-sm-flex flex-row-reverse text-center">
          <a href="${repoUrl}" class="detailsLinkRepo">
            <button class="btn btn-primary detailbtnRepo">View Details repo</button>
          </a>
        </div>
      </div>
    </div>
  </div>
`;

            container.append(card);
          }
        } else {
          console.log("No data found");
        }
      },
      error: function (error) {
        console.log("Error: " + error.error);
      },
    });
  });
  $("#RepoMentorButton").click(function () {
    $.ajax({
      url: "/api/getProjectRepoMentor",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data) {
          var projectRepo = data.data.ProjectRepoMentor;
          var container = $("#repoContainer");
          container.empty();
          for (var i = 0; i < projectRepo.length; i++) {
            console.log(i, projectRepo[i]);
            var teamMembers = projectRepo[i].teamMember;
            var teamMemberArr = teamMembers.split(",");
            // If there is no comma, create an array with a single element
            if (
              teamMemberArr.length === 1 &&
              teamMemberArr[0] === teamMembers
            ) {
              teamMemberArr = [teamMembers];
            }
            console.log(teamMemberArr);
            const projectId = projectRepo[i]._id;
            const repoUrl = `/projectRepoMentor?_id=${projectId}`;
            const members = projectRepo[i].teamMember.split(",");

            // Create a string variable to store the HTML markup
            let membersHTML = "";
            members.forEach((member) => {
              membersHTML += `
    <div class="flex>
      <a href="">
        <span class="badge bg-primary mx-2">${member}</span>
      </a>
    </div>
  `;
            });
            const card = `
  <div class="card p-sm-4 p-0 m-2 m-sm-4 text-start text-sm-start">
    <div class="card-header text-muted sm:my-2 small">${projectRepo[i].label}</div>
    <div class="card-body">
      <div class="project-title">
        <strong>Project Name :</strong> ${projectRepo[i].projectName}
      </div>
      <div class="mb-3 flex-sm-row flex-column sm:mb-3 mt-3 hidden d-sm-flex">
        <span class="label label-dark">Team Members :</span>
        <div id="teamMemberContainer" class="mb-3  flex-sm-row flex-column  mt-0 hidden d-sm-flex">
          ${membersHTML}
        </div>
      </div>
      <p class="card-text height-50 small mt-3">
        <strong>Domain :</strong> ${projectRepo[i].projectDomain}
      </p>
      <div class="d-sm-flex text-center justify-content-between">
        <div class="card-footer small">
          College : ${projectRepo[i].collegeName}, University : ${projectRepo[i].universityName}
        </div>
        <div class="d-sm-flex flex-row-reverse text-center">
          <a href="${repoUrl}" class="detailsLinkRepo">
            <button class="btn btn-primary detailbtnRepo">View Details repo</button>
          </a>
        </div>
      </div>
    </div>
  </div>
`;
            container.append(card);
          }
        } else {
          console.log("No data found");
        }
      },
      error: function (error) {
        console.log("Error: " + error.error);
      },
    });
  });
  $("#RepoPartnerButton").click(function () {
    $.ajax({
      url: "/api/getProjectRepoPartner",
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (data) {
          var projectRepo = data.data.ProjectRepoPartner;
          var container = $("#repoContainer");
          container.empty();
          for (var i = 0; i < projectRepo.length; i++) {
            console.log(i, projectRepo[i]);
            var teamMembers = projectRepo[i].teamMember;
            var teamMemberArr = teamMembers.split(",");
            if (
              teamMemberArr.length === 1 &&
              teamMemberArr[0] === teamMembers
            ) {
              teamMemberArr = [teamMembers];
            }
            console.log(teamMemberArr);
            const projectId = projectRepo[i]._id;
            const repoUrl = `/projectRepoPartner?_id=${projectId}`;
            const members = projectRepo[i].teamMember.split(",");
            let membersHTML = "";
            members.forEach((member) => {
              membersHTML += `
    <div class="flex>
      <a href="">
        <span class="badge bg-primary mx-2">${member}</span>
      </a>
    </div>
  `;
            });
            const card = `
  <div class="card p-sm-4 p-0 m-2 m-sm-4 text-start text-sm-start">
    <div class="card-header text-muted sm:my-2 small">${projectRepo[i].label}</div>
    <div class="card-body">
      <div class="project-title">
        <strong>Project Name :</strong> ${projectRepo[i].projectName}
      </div>
      <div class="mb-3 flex-sm-row flex-column sm:mb-3 mt-3 hidden d-sm-flex">
        <span class="label label-dark">Team Members :</span>
        <div id="teamMemberContainer" class="mb-3  flex-sm-row flex-column  mt-0 hidden d-sm-flex">
          ${membersHTML}
        </div>
      </div>
      <p class="card-text height-50 small mt-3">
        <strong>Domain :</strong> ${projectRepo[i].projectDomain}
      </p>
      <div class="d-sm-flex text-center justify-content-between">
        <div class="card-footer small">
          College : ${projectRepo[i].collegeName}, University : ${projectRepo[i].universityName}
        </div>
        <div class="d-sm-flex flex-row-reverse text-center">
          <a href="${repoUrl}" class="detailsLinkRepo">
            <button class="btn btn-primary detailbtnRepo">View Details repo</button>
          </a>
        </div>
      </div>
    </div>
  </div>
`;
            container.append(card);
          }
        } 
        else {
          console.log("No data found");
        }
      },
      error: function (error) {
        console.log("Error: " + error.error);
      },
    });
  });
});

function setActiveButton(buttonId, formId) {
  const buttons = document.querySelectorAll(".main-button");

  buttons.forEach((button) => {
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
  });

  // Add active class to the selected button
  const selectedButton = document.getElementById(buttonId);
  selectedButton.classList.remove("btn-secondary");
  selectedButton.classList.add("btn-primary");

  // Show the corresponding form
  const forms = document.querySelectorAll(".form");
  forms.forEach((form) => {
    form.style.display = "none";
  });
  const selectedForm = document.getElementById(formId);
  selectedForm.style.display = "block";
}


