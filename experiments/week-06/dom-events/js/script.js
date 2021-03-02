"use strict";
const d = document;
let paragraph = d.getElementById(`paragraph`);
let mainHeading = d.getElementById(`main-heading`);
let subHeading = d.getElementById(`sub-heading`);
let originalTxt = paragraph.innerText;
// Blinking text
// setInterval(blink, 500);

// function  blink() {
//     let opacity = paragraph.style[`opacity`];
//     if(opacity === `1`) {
//         paragraph.style[`opacity`] = `0`;
//     }
//     else {
//         paragraph.style[`opacity`] = `1`;
//     }
// }


// Fading text
// let opacity = 1;
// setInterval(fadeOut, 500);
// function fadeOut() {
//     opacity -= 0.1;
//     paragraph.style[`opacity`] = opacity;
//     if(opacity >0) {
//         requestAnimationFrame(fadeOut);
//     }
// }

// --- Click events ---

// click anywhere on the body
// d.addEventListener(`click`,function(event) {
//     d.body.style[`background`] = 'black';
// });

// --- Click on headings
// mainHeading.addEventListener(`click`, setRedTxt);
// subHeading.addEventListener(`click`, setRedTxt);

function setRedTxt(event) {
    event.target.style[`color`] = `red`;
}

// --- Mouse event ---
paragraph.addEventListener(`contextmenu`, function (event) {
    event.target.innerText = `hehe`;
});
paragraph.addEventListener(`mouseleave`, function (event) {
    event.target.innerText = originalTxt;
});


// --- Keyboard event ---
d.addEventListener(`keydown`, function (event) {
    // Spacebar
    if (event.keyCode === 32) {
        paragraph.style[`color`] = `orange`;
    }

    // Write in innerText
    paragraph.innerText = paragraph.innerText + event.key;

});

window.addEventListener(`offline`, function(event){
    mainHeading.innerText = ":(";
});