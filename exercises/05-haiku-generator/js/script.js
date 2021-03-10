/**
Haiku Generator
Stephanie Dang

We will create a webpage that displays a haiku where each line is chosen at random from a set of possibilities.
If the user clicks on a line it will fade out and fade back in as a new randomly selected line.

New features:
- Overall new look (CSS)
- YOU CAN PRINT
- 
*/

"use strict";

// Variables 
// ---------------------------------------------
// to shorten the name of document
const d = document;
// Haiku of 5 and 7
let fiveSyllableLines = [`O, to be a tree`, `The cat does not know`, `We are all forests`, `You have done your best`, `They are all gone now`];
let sevenSyllableLines = [`Say the things left unsaid, Never believe the wind's lies`, `The autumn stretches its legs`, `Nothing can satisfy you`, `They will not come back again`];
// Assign random lines to line
let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);
// store lines in array
let aLines = [line1, line2, line3];
// paragraph element
let lines = d.querySelectorAll(`p`);
// Input btn
let btnPrint = d.querySelector(`input`);
// title
let titleTxt;

// Flower array for Title
let title = d.querySelector(`h2`);
let flowerName = ["lily",
    "lotus flower",
    "marigold",
    "marjoram",
    "mimosa",
    "narcissus",
    "orange blossom",
    "orchid",
    "peach blossom",
    "peony",
    "petunia",
    "rhododendron",
    "rosemary",
    "roses",
    "sage",
    "snapdragon",
    "sunflower",
    "tansy",
    "thistle",
    "thyme",
    "tulip",
    "violet",
    "water lily",
    "zinnia"
];
// Functions 
// ---------------------------------------------

// Calling functions
addListeners();
setupLines();

// setupLines()
// // Display lines 
function setupLines() {
    for (let i = 0; i < lines.length; i++) {
        lines[i].innerText = aLines[i];
    }
}

// addListeners()
// Adding the click event to each lines
function addListeners() {
    // Changing lines
    for (let i = 0; i < aLines.length; i++) {
        lines[i].addEventListener(`click`, changeLine);
    }
    // Print
    btnPrint.addEventListener(`click`, printRequest);
    // Title change
    title.addEventListener(`click`,changeTitle);
}

// changeLine(evt)
// Change lines by calling the fadeOut()
function changeLine(evt) {
    fadeOut(evt.target, 1);
}

function printRequest(evt) {
    window.print();
}

// Changing to a random title
function changeTitle(evt) {
    fadeOut(evt.target, 1);
}

// fadeOut()
// Fading out anmation
function fadeOut(elm, opacity) {
    opacity -= 0.1;
    elm.style[`opacity`] = opacity;

    // If the opacity is higher than 0
    if (opacity > 0) {
        requestAnimationFrame(() => fadeOut(elm, opacity))
    }
    // if not
    else if(elm == title) {
        setnewTitle(elm);
        fadeIn(elm,0);
    }
    else {
        setNewLine(elm);
        fadeIn(elm, 0);
    }
}

// fadeIn()
// Fading in animation
function fadeIn(elm, opacity) {
    opacity += 0.01;
    elm.style[`opacity`] = opacity;

    if (opacity < 1) {
        requestAnimationFrame(() => fadeIn(elm, opacity));
    } else {
        // nothing
    }
}

// setNewLine(elm)
// setting new lines
function setNewLine(elm) {
    if (elm == lines[0] || elm == lines[2]) {
        elm.innerText = random(fiveSyllableLines);
    } else if (elm == lines[1]) {
        elm.innerText = random(sevenSyllableLines);
    }
}

// setNewTitle
// setting a new title every click
function setnewTitle() {
    title.innerText = random(flowerName);
}

// generate random haiku
function random(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}