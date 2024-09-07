const input = document.getElementById("input");
const button = document.getElementById("button");
const apiurl = "https://www.omdbapi.com/?t=";
const apikey = "fe906b16";
const ul = document.getElementById("ul-list");
let array = [];

function search(title) {
    fetch(apiurl + title + `&apikey=${apikey}`)
        .then((result) => result.json())
        .then((output) => {
            // Check if output has valid data
            if (output.Response === "True") {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div class="list-items-container">
                        <div class="movie-image">
                            <img src="${output.Poster}" alt="${output.Title} Poster" onerror="this.src='default-image.jpg'">
                        </div>
                        <div class="movie-content">
                            <h3>Title: <span>${output.Title}</span></h3>
                            <h3>Year: <span>${output.Year}</span></h3>
                            <h3>IMDb Rating: <span>${output.imdbRating}</span></h3>
                        </div>
                        <div class="delete-btn">
                            <button class="delete search">Delete</button>
                        </div>
                    </div>
                `;
                li.classList.add("list-items");
                ul.appendChild(li);
                array.push(output);
                console.log(array);

                // Add event listener to the delete button of this list item
                li.querySelector(".delete").addEventListener("click", () => {
                    deleteMovie(output.Title, li);
                });
            } else {
                console.log("Movie not found:", output.Error);
            }
        }).catch((err) => {
            console.log(err);
        });

    clearInput();
}

function clearInput() {
    input.value = "";
}

function deleteMovie(movieTitle, listItem) {
    // Remove the movie from the array
    array = array.filter((movie) => movie.Title !== movieTitle);

    // Remove the movie from the DOM
    ul.removeChild(listItem);

    console.log("Updated array:", array);
}

button.addEventListener("click", () => {
    const title = input.value.trim();
    if (title) {
        search(title);
    } else {
        console.log("Please enter a valid movie title.");
    }
});
