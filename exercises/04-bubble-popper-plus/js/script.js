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
******************/

// variables
// state of game
let state = `menu`;
// user webcam
let video = undefined;
// handpose model
let handpose = undefined;
// current set of predictions
let predictions = [];
// The bubble
let bubble = undefined;
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

let elmoImg =undefined;

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

    // bubble obj propreties
    bubble = {
        x: random(width),
        y: (height),
        size: 50,
        vx: 0,
        vy: -2
    };

    // setting elmo's BURNING IMAGE
    elmoImg = loadImage(ELMO_IMG_URL);
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
    }
}

// Display the pin based from hand fingers
function displayPin() {
    // Allumetete head
    push();
    fill(BROWN_COLOR);
    ellipse(pin.tip.x,pin.tip.y,20);
    pop();

    // allumette body
    push();
    strokeWeight(5);
    stroke(RED_COLOR);
    line(pin.top.x, pin.top.y,pin.tip.x, pin.tip.y);
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

// displays bubble 
// moves  bubble
function displayBubble() {
    // display bubble
    push();
    stroke(ORANGE_COLOR);
    strokeWeight(2);
    noFill();
    ellipse(bubble.x, bubble.y, bubble.size);
    pop();

    // move bubble
    bubble.x += bubble.vx;
    bubble.y += bubble.vy;

    // Moves bubble back down if reach top
    if (bubble.y < 0) {
        resetBubble();
    }
}

// Puts bubble to a random width and bottom of screen
function resetBubble() {
    bubble.x = random(width);
    bubble.y = height;
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