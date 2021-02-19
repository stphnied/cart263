"use strict";

/*****************

A Night at the Movies
Stephanie Dang

Introducing BAYMAX, your personal healthcare robot.

******************/



// preload()
// Description of preload
function preload() {

}


// setup()
// Description of setup
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
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

// Displays an illusion of set of rotating  circles
// Using a circle stroke and lined dashed
function loadingCircle() {
    push()
    translate(width/2, height/2);
    angle += radians(50);
    rotate(angle);
    noFill();
    stroke(255);
    strokeWeight(20);
    ellipseMode(CENTER);
    ellipse(0, 0, 300, 300);
    pop();
}

// Going onto next state when pressing `ENTER`
function keyPressed() {
    if (state == `menu`) {
        if (keyCode === ENTER) {
            state = `instruction`;
        }
    } else if (state == `instruction`) {
        if (keyCode === ENTER) {
            state = `gameplay`;
        }
    }
}