const input = document.querySelector("#search-input");
    const content = document.querySelector("#search-content");
    
    // const elements = content.querySelectorAll(".repo-card");
    
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
        $("#ResearchPaperButton").click(function () {
            $.ajax({
                url: "/api/allResearchPapers",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("data", data)
                    if (data) {
                        var researchPaper = data.data.allResearchPaper;
                        var container = $("#cardContent");
                        container.empty();
                        for (var i = 0; i < researchPaper.length; i++) {
                            console.log(i, researchPaper[i]);
                            var card = document.createElement("div");
                            card.innerHTML = `
                                AuthorName: ${researchPaper[i].authorName}
                            `
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
        $("#ResearchPaperMentorButton").click(function () {
            $.ajax({
                url: "/api/getResearchPaperMentor",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data) {
                        var researchPaper = data.data.allRPMentor;
                        var container = $("#cardContent");
                        container.empty();
                        for (var i = 0; i < researchPaper.length; i++) {
                            console.log(i, researchPaper[i]);
                            var card = document.createElement("div");
                            card.innerHTML = `
                                AuthorName: ${researchPaper[i].authorName}
                            `
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
        $("#ResearchPaperCoAuthorButton").click(function () {
            $.ajax({
                url: "/api/getResearchPaperCoAuthor",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        var researchPaper = data.data.allRPCoAuthor;
                        var container = $("#cardContent");
                        container.empty();
                        for (var i = 0; i < researchPaper.length; i++) {
                            console.log("CoAuthor ",i, researchPaper[i]);
                            var card = document.createElement("div");
                            card.innerHTML = `
                                AuthorName: ${researchPaper[i].authorName}
                            `
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
    });