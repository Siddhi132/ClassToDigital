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

