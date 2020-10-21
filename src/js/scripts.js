"use strict";

// variables
let studiesEl = document.getElementById("studier");
let experiencesEl = document.getElementById("arbetslivserfarenhet");
let websitesEl = document.getElementById("webbplatser");

// Eventlisteners is created to run the get functions on the tables when the page loads
window.addEventListener('load', getStudies);
window.addEventListener('load', getExperiences);
window.addEventListener('load', getWebsites);

// A function named getStudies is created which fetches all the studies from the MySQLi database
// and prints it out on the screen in a html p-tag
function getStudies() {
    studiesEl.innerHTML = '';

    fetch('http://studenter.miun.se/~olfa1902/Webbutveckling_III/Projektuppgift/REST/studies.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(study => {
            studiesEl.innerHTML +=
            `<div class="study">
            <p>
            <b>Utbildningsplats: </b> ${study.utbildningsplats}
            <br>
            <b>Namn på utbildning: </b> ${study.utbildningsnamn}
            <br>
            <b>Utbildningsstart: </b> ${study.startdatum}
            <br>
            <b>Utbildningsslut: </b> ${study.slutdatum}
            </p>
            </div>`
        });
    })
}

// A function named getExperiences is created with the puropse of gathering all the work-experiences from the database 
// and printing it out to the screen in html code
function getExperiences() {
    experiencesEl.innerHTML = '';

    fetch('http://studenter.miun.se/~olfa1902/Webbutveckling_III/Projektuppgift/REST/experiences.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(experience => {
            experiencesEl.innerHTML +=
            `<div class="experience">
            <p>
            <b>Arbetsplats: </b> ${experience.arbetsplats}
            <br>
            <b>Titel: </b> ${experience.titel}
            <br>
            <b>Startdatum: </b> ${experience.startdatum}
            <br>
            <b>Slutdatum: </b> ${experience.slutdatum}
            </p>
            </div>`
        });
    })
}

// A function named getWebsites is created with the same mission as the other two functions,
// namely to take all the relevant information from the table and database and printing it out to the front-end website
function getWebsites() {
    websitesEl.innerHTML = '';

    fetch('http://studenter.miun.se/~olfa1902/Webbutveckling_III/Projektuppgift/REST/webpages.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(website => {
            websitesEl.innerHTML +=
            `<div class="website">
            <p>
            <b>Titel: </b> ${website.titel}
            <br>
            <b>Länk: </b> ${website.url}
            <br>
            <b>Beskrivning: </b> ${website.beskrivning}
            </p>
            </div>`
        });
    })
}