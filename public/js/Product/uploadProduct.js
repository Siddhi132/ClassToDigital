fetch('/api/Categories')
    .then(response => response.json())
    .then(data => {
        let categories = data.data.categories[0].product.category;
        let locations = data.data.categories[0].product.location;
        let conditionRatings = data.data.categories[0].product.condition;
        // console.log(categories);
        categories.forEach(category => {
            $('#category').append(`<option value="${category}">${category}</option>`)
        });
        locations.forEach(location => {
            $('#location').append(`<option value="${location}">${location}</option>`)
        });
        conditionRatings.forEach(conditionRating => {
            $('#conditionRating').append(`<option value="${conditionRating}">${conditionRating}</option>`)
        });
    })

$('.alert .btn-close').on('click', function (e) {
    $(this).parent().remove();
});

// Get the input element for dateOfPurchase
var dateInput = document.getElementById("dateOfPurchase");

// Get the current date
var currentDate = new Date().toISOString().split('T')[0];

// Set the maximum allowed date to the current date
dateInput.max = currentDate;

// Prevent text input in date field
dateInput.addEventListener("keydown", function (event) {
    event.preventDefault();
});


const photosInput = document.getElementById("photos");
const previewContainer = document.getElementById("previewContainer");

photosInput.addEventListener("change", handlePhotoUpload);

function handlePhotoUpload(event) {
    const files = event.target.files;

    for (const file of files) {
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "preview-image";

        const imageElement = document.createElement("img");
        imageElement.src = URL.createObjectURL(file);
        imageWrapper.appendChild(imageElement);

        const removeIcon = document.createElement("button");
        removeIcon.className = "remove-icon";
        removeIcon.innerHTML = '<i class="fas fa-times"></i>';
        removeIcon.addEventListener("click", () => {
            previewContainer.removeChild(imageWrapper);
        });
        imageWrapper.appendChild(removeIcon);

        previewContainer.appendChild(imageWrapper);
    }
}
