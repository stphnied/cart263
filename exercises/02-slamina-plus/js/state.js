// States
// Navigate thru different states screens
"use strict";

// Displays the start screen
function menu() {
    background(0);
    displayText(`Would you like a cup of tea?`, 72, width / 2, height / 2.5, 255);
    displayText(`Press ENTER to start`, 48, width / 2, height / 1.5, `brown`);

    // playMusic()
}

// Displays the gameplay screen
function play() {
    push();
    fill(0);
    text(instructionTxt, width / 2, height / 2);
    pop();

    displayAnswer();
}