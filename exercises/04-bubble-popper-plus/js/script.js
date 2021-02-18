"use strict";

/*****************

Bubble Popper
Stephanie Dang

Using hand tracking we turn the user’s index finger into a pin on our program’s canvas.
A bubble floats upward repeatedly and the user can pop the bubble with the pointy end of their pin-finger.
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

// setup()
// Description of setup
function setup() {
    createCanvas(640,480);

    // Acess user's webcam
    video = createCapture(VIDEO);
    video.hide();

    handpose = ml5.handpose(video, {flipHorizontal: true}, 
        function() {
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
        x:random(width),
        y:(height),
        size:50,
        vx:0,
        vy:-2
    };
}


// draw()
// Description of draw()
function draw() {

    background(0);
    if(predictions.length>0) {
        let hand = predictions[0];
        let index = hand.annotations.indexFinger;
        let tip = index[3];
        let base = index[0];
        let tipX = tip[0];
        let tipY = tip[1];
        let baseX = base[0];
        let baseY = base[1];

        // Pin body
        push();
        noFill();
        stroke(255,255,255);
        strokeWeight(3);
        line(baseX,baseY,tipX,tipY);
        pop();

        // Pin head
        push();
        noStroke();
        fill(255,0,0);
        ellipse(baseX,baseY,20);
        pop();

        // Check bubble popping
        let d = dist(tipX,tipY,bubble.x,bubble.y);
        if(d < bubble.size/2) {
            bubble.x = random(width);
            bubble.y = height;
        }
    }

    // move bubble
    bubble.x += bubble.vx;
    bubble.y += bubble.vy;

    // Moves bubble back down if reach top
    if(bubble.y < 0) {
        bubble.x = random(width);
        bubble.y = height;
    }

    // display bubble
    push();
    fill(10,100,150);
    noStroke();
    ellipse(bubble.x,bubble.y,bubble.size);
    pop();

}