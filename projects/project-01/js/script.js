"use strict";

/*****************

A Night at the Movies
Stephanie Dang

Introducing BAYMAX, your personal healthcare robot.

******************/

// constants

// variables



// preload()
// Description of preload
function preload() {

}


// setup()
// Description of setup
function setup() {
    createCanvas(windowWidth,windowHeight);

}


// draw()
// Description of draw()
function draw() {
    background(244);
    // Calls the different state
    switch (state) {
        case `menu`:
            mainMenu();
            break;

        case `instruction`:
            instruction();
            break;
        case `gameplay`:
            gameplay();
            break;
        case `ending`:
            ending();
            break;
    }
}
