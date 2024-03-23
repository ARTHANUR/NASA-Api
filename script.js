let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let date = String(today.getDate() - 1).padStart(2, "0");
let currentDate = `${year}-${month}-${date}`;

// console.log(today);console.log(year);console.log(month);console.log(date);console.log(day);console.log(typeof(day));

// const currentDate = new Date().toISOString().split("T")[0];
// console.log(currentDate, typeof(currentDate))

myApi = "x4gNI41nJcyl9Td22o5wlRCTR0AGkVYdaLc5LTcN";

let currentImgContainer = document.getElementById("current-img-container");

// fetch(`https://api.nasa.gov/planetary/apod?api_key=${myApi}&date=${currentDate}`)
//     .then((response) => response.json())
//     .then((data) => console.log(data));

window.onload = getCurrentImageOfTheDay();

function getCurrentImageOfTheDay() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${myApi}&date=${currentDate}`)
        .then((response) => response.json())
        .then((data) => {
            currentImgContainer.innerHTML = `
            <h1>NASA Picture Of The Day</h1>
            <img src = "${data.url}" alt ="NASA Image">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
            `;
        })
        .catch((error) => console.error("Error fetching current image", error));
}

let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let btn = document.getElementById("btn");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchedDate = searchInput.value;
    getImageOfTheDay(searchedDate);
});

function getImageOfTheDay(searchedDate) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${myApi}&date=${searchedDate}`)
        .then((response) => response.json())
        .then((data) => {
            currentImgContainer.innerHTML = `
            <h1>NASA Picture On ${searchedDate}</h1>
            <img src = "${data.url}" alt ="NASA Image">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
            `;
            addSearchToHistory(searchedDate);
            saveSearch(searchedDate);
        })
        .catch((error) => console.error("unable to load the image", error));
}

function saveSearch(searchedDate) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(searchedDate);
    localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(searchedDate) {
    let searchHistory = document.getElementById("search-history");
    let list = document.createElement("li");
    list.textContent = searchedDate;
    list.addEventListener("click", () => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${myApi}&date=${searchedDate}`)
            .then((response) => response.json())
            .then((data) => {
                currentImgContainer.innerHTML = `
            <h1>NASA Picture On ${searchedDate}</h1>
            <img src = "${data.url}" alt ="NASA Image">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
            `;
            })
            .catch((error) => console.error("unable to load the image", error));
    });
    searchHistory.appendChild(list);
}
