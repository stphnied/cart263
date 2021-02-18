// States
// Navigate through different states screens
"use strict";

// Displays the start screen
// Displays title and description of the game
// Call the function to play the background music
function menu() {
    background(RED_COLOR);
    displayText(`BURN UP PLUS ULTRA`, 42, width / 2, height / 2.5, 255);
    displayText(`press [ENTER] to continue`, 28, width / 2, height / 1.75, CHARCOAL_COLOR);
}


// Display instruction text
function instruction() {
    displayText(`Instruction`, 42, width / 2, height / 4, 255);
    displayText(
        `
    Activate your webcam
    pop the bubble with your index finger
    press [enter] to start`,
        28, width / 2, height / 2, 255
    )
}

// Displays the gameplay screen
function gameplay() {
    // checks if there is a hand 
    // outlines index finger
    if (predictions.length > 0) {
        updatePin();
        displayPin();
    }

    // Display array of bubbles
    for (let i = 0; i < numBubbles; i++) {
        bubble = bubbles[i];
        bubble.display();
        bubble.move();
        bubble.lit();
    }
    
    if (bubblesCounter == numBubbles) {
        state = `ending`;
    }
}

function ending() {
    imageMode(CENTER);
    image(elmoImg, width / 2, height / 2, width, height);
}