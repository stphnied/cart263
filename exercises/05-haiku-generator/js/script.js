/**
Haiku Generator
Stephanie Dang

We will create a webpage that displays a haiku where each line is chosen at random from a set of possibilities.
If the user clicks on a line it will fade out and fade back in as a new randomly selected line.
*/

"use strict";

// Variables 
// ---------------------------------------------
const d = document;
// Haiku
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
    for (let i = 0; i < aLines.length; i++) {
        lines[i].addEventListener(`click`, changeLine);
    }
}

// changeLine(evt)
// Change lines by calling the fadeOut()
function changeLine(evt) {
    fadeOut(evt.target, 1);
}

// Functions
// ---------------------------------------------



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
    console.log(elm);
    if (elm == lines[0] || elm == lines[2]) {
        elm.innerText = random(fiveSyllableLines);
    }
    else if (elm == lines[1]) {
        elm.innerText = random(sevenSyllableLines);
    }
}

// generate random haiku
function random(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}