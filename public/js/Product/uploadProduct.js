fetch('/api/Categories')
                .then(response => response.json())
                .then(data => {
                    let categories=data.data.categories[0].product.category;
                    let locations=data.data.categories[0].product.location;
                    let conditionRatings=data.data.categories[0].product.condition;
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

$('.alert .btn-close').on('click', function(e) {
    $(this).parent().remove();
});