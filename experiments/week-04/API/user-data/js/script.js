"use strict";

/*****************
 User data experiment
******************/
let userData = {
    name: `stranger`
};

// setup()
// Description of setup
function setup() {
    createCanvas(windowWidth, windowHeight);

    let data = JSON.parse(localStorage.getItem(`web-storage-example-personalization`));

    if (data !== null) {
        userData.name = data.name;
    } else {
        userData.name = prompt(`What's your name?`);
        localStorage.setItem(`web-storage-example-personalization`, JSON.stringify(userData));
    }
}


// draw()
// Description of draw()
function draw() {
    background(0);
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`Howdy, ${userData.name}`, width / 2, height / 2);
    pop();
}