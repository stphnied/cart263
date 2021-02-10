"use strict";

/*****************

A Night at the Movies
Stephanie Dang

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// constants

// variables

let state;



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
    background(0);
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

    drawCalcifer();
}

function drawCalcifer() {
    // rect(x, y, w, h, [tl], [tr], [br], [bl])
    rectMode(CENTER);
    fill(255,0,0);
    rect(width/2,height/2,200,300,100,100,75);
}
