// States
// Navigate through different states screens
"use strict";

// Displays the start screen
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
    To play this game, you must activate your webcam
    Use your index finger to put the bubbles on fire
    `,
        24, width / 2, height / 2.25, 255
    )
    displayText(`press [enter] to start`, 20, width / 2, height / 1.5, RED_COLOR);
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

    // If all the bubbles are lit up, END SCENE
    if(bubblesCounter == numBubbles) {
        state = `ending`;
    }
}

// Display the ending surprise
function ending() {
    imageMode(CENTER);
    image(elmoImg, width / 2, height / 2, width, height);
    playBgMusic();
}