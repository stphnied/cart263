// States
// Navigate thru different states screens
"use strict";

// Displays the start screen
function menu() {
    displayText(`FRUIT BASKET`, 72, width / 2, height / 2.5, GREEN_COLOR);
    displayText(`Reverse spelling bee where you have to guess the fruit!`, 28, width / 2, height / 2, BROWN_COLOR);
    displayText(`Press ENTER to start`, 32, width / 2, height / 1.5, ORANGE_COLOR);
    playMusic();
}

// Displays the gameplay screen
function play() {
    push();
    fill(`#322001`)
    text(INSTRUCTION_TEXT, width / 2, height /10);
    pop();
    displayAnswer();
    displayNextBtn();
}