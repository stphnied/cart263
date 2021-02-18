"use strict";

/*****************
Light up the sky
Stephanie Dang

Using hand tracking, we turn the user's index finger into an allumette on our program's canvas.
Bubbles will float around repeatedly and the user will have to light them up with the round point of their allumette-finger

NEW FEATURES:
- FIRE
- Lighting bubbles on fire
- Loading, Instruction and Ending screen
- New (HOTTER) index finger design

**ISSUE: I am trying to keep count of all the bubbles lit up and once all of them
are lit up, to proceed to the ending scene, however, I am not capable of making the counter stops.
I also want to keep the bubbles on the canvas when they are lit up...
******************/

// variables
// state of game
let state = `gameplay`;
// user webcam
let video = undefined;
// handpose model
let handpose = undefined;
// current set of predictions
let predictions = [];
// The bubbles
let bubble = undefined;
let bubbles = [];
let numBubbles = 3;
let bubblesCounter = 0;
// The pin 
let pin = {
    tip: {
        x: undefined,
        y: undefined
    },
    top: {
        x: undefined,
        y: undefined,
        size: 50
    }
}
// Image of elmo rising from hell
let elmoImg = undefined;

// Constants colors
const
    BROWN_COLOR = `#964B00`,
    RED_COLOR = `#BF2A2E`,
    ORANGE_COLOR = `#E87A00`,
    CHARCOAL_COLOR = `#171d22`;
const ELMO_IMG_URL = `https://media.tenor.com/images/172d63b92f17fb1d90eb37e64bbee10e/tenor.gif`;

// setup()
function setup() {
    createCanvas(640, 480);

    // Acess user's webcam
    video = createCapture(VIDEO);
    video.hide();

    handpose = ml5.handpose(video, {
            flipHorizontal: true
        },
        function () {
            console.log(`Model loaded.`);
        });

    // Listen for prediction
    handpose.on(`predict`, results => {
        // do smt with results
        console.log(results);
        predictions = results;
    });
    // setting elmo's BURNING IMAGE
    elmoImg = loadImage(ELMO_IMG_URL);

    // set bubbles on canvas
    addBubbles();
}

// draw()
function draw() {
    background(CHARCOAL_COLOR);
    switch (state) {
        case "menu":
            menu();
            break;
        case "instruction":
            instruction();
            break;
        case "gameplay":
            gameplay();
            break;
        case `ending`:
            ending();
            break;
    }
}

// Display the pin based from hand fingers
function displayPin() {
    // Allumetete head
    push();
    noStroke();
    fill(BROWN_COLOR);
    ellipse(pin.tip.x, pin.tip.y, 20);
    pop();

    // allumette body
    push();
    strokeWeight(5);
    stroke(RED_COLOR);
    line(pin.top.x, pin.top.y, pin.tip.x, pin.tip.y);
    pop();
}

// Updates position of pin (index finger)
function updatePin() {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    pin.tip.x = index[3][0];
    pin.tip.y = index[3][1];
    pin.top.x = index[0][0];
    pin.top.y = index[0][1];
}

// Text configuration
function displayText(string, size, x, y, color) {
    push();
    textAlign(CENTER, CENTER);
    textSize(size);
    fill(color);
    textFont(`Trebuchet MS, monospace`);
    text(string, x, y);
    pop();
}

// Adds bubbles in the scene
function addBubbles() {
    for (let i = 0; i < numBubbles; i++) {
        let x = random(0,width);
        let y = height;
        let size = random(20,60);
        bubble = new Bubble(x, y, size);
        bubbles.push(bubble);
    }
}