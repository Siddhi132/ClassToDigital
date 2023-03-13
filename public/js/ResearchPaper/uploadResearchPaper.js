fetch('/api/Categories')
.then(response => response.json())
.then(data => {
    let categories=data.data.categories[0].researchPaper.category;
    let needs=data.data.categories[0].researchPaper.needof;

    console.log(categories);
    categories.forEach(category => {
        $('#category').append(`<option value="${category}">${category}</option>`)
    });
    needs.forEach(need => {
        $('#needof').append(`<option value="${need}">${need}</option>`)
    });

})


$('.alert .btn-close').on('click', function(e) {
    $(this).parent().remove();
});