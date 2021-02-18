"use strict";

/*****************
Bubble Popper
Stephanie Dang

Using hand tracking we turn the user’s index finger into a pin on our program’s canvas.
A bubble floats upward repeatedly and the user can pop the bubble with the pointy end of their pin-finger.

NEW FEATURES:
******************/

// variables
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
}

// draw()
function draw() {

    background(0);

    // checks if there is a hand 
    // outlines index finger
    if (predictions.length > 0) {
        updatePin();
        // Check bubble popping
        let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
        // reset to bottom if reach top
        if (d < bubble.size / 2) {
            resetBubble();
        }
        displayPin();
    }
    displayBubble();
}

// Display the pin based from hand fingers
function displayPin() {
    // Pin body
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(3);
    line(pin.tip.x, pin.tip.y, pin.top.x, pin.top.y);
    pop();

    // Pin head
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(pin.top.x, pin.top.y, 20);
    pop();
}

// Updates position of pin (index finger)
function updatePin(prediction) {
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
    fill(10, 100, 150);
    noStroke();
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