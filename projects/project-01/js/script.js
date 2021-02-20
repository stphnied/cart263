"use strict";

/*****************

A Night at the Movies
Stephanie Dang

Introducing BAYMAX, your personal healthcare robot from the movie BIG HERO 6.

******************/

// preload()
// Description of preload
function preload() {
    myFont = loadFont(ACENTONE_FONT_URL);
    dialoguesData = loadJSON(dialogue_JSON_URL);
}

// setup()
// Setting up the canvas
// Setting up Annyang
function setup() {
    canvas = createCanvas(1000, windowHeight);
    // Changing the angle mode to DEGREE
    angleMode(DEGREES);

    // Check if annyang is available
    if (annyang) {
        // Create commands
        let commands = {
            'Ouch': activateBaymax,
            'My name is *name': sayName
        };

        // Add and calls commands
        annyang.addCommands(commands);
        annyang.start();
    }
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
function loadingCircle(config) {
    push()
    translate(width / 2, height / 2);
    rotate(angle);
    noFill();
    stroke(config.color, 100);
    strokeWeight(config.weight);
    ellipseMode(config.mode);
    // If true animates the circle and go to next screen
    if (hurt) {
        config.color= WHITE_COLOR;
        stroke(config.color,255);
        angle += radians(50);
        setTimeout(() => {
            state = `instruction`;
            baymaxTalk();
        }, 3000);
    }
    // displays circle
    ellipse(config.x, config.y, config.w, config.h);
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

// Text configuration
function displayText(string, size, x, y, color, alpha) {
    push();
    textAlign(CENTER, CENTER);
    textSize(size);
    fill(color, alpha);
    textFont(myFont);
    text(string, x, y);
    pop();
}

// Says the name of the user
function activateBaymax() {
    responsiveVoice.speak(`Activating...`, "Korean Male", {});
    hurt = true;
}

function baymaxTalk() {
    responsiveVoice.speak(dialoguesData.dialogues.intro[0], "UK English Male", {});
}

function sayName() {

}