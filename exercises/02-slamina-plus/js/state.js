// States
// Navigate thru different states screens
"use strict";

// Displays the start screen
function menu() {
    displayText(`FRUIT BASKET`, 54, width / 2, height / 2.5, "#026440");
    displayText(`Try to guess the correct fruit`, 36, width / 2, height / 2, `#026440`);
    displayText(`Press ENTER to start`, 36, width / 2, height / 1.5, `#ffb733`);

    // playMusic()
}

// Displays the gameplay screen
function play() {
    push();
    fill(`#ffb733`)
    text(instructionTxt, width / 2, height / 2);
    pop();

    displayAnswer();
}