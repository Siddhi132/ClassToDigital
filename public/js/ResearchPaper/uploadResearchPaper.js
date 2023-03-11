fetch('/api/Categories')
.then(response => response.json())
.then(data => {
    let categories=data.data.categories[0].researchPaper.category;
    console.log(categories);
    categories.forEach(category => {
        $('#category').append(`<option value="${category}">${category}</option>`)
    });
})


$('.alert .btn-close').on('click', function(e) {
    $(this).parent().remove();
});