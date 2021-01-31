// States
// Navigate thru different states screens
"use strict";

// Displays the start screen
function menu() {
    displayText(`FRUIT BASKET`, 72, width / 2, height / 2.5, "#322001");
    displayText(`Try to guess the correct fruit`, 38, width / 2, height / 2, `#026440`);
    displayText(`Press ENTER to start`, 32, width / 2, height / 1.25, `#ffb733`);
    playMusic()
}

// Displays the gameplay screen
function play() {
    push();
    fill(`#322001`)
    text(instructionTxt, width / 2, height / 2);
    pop();
    displayAnswer();
    displayNextBtn();
}