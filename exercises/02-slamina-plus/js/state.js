// States
// Navigate thru different states screens
"use strict";

// Displays the start screen
function menu() {
    displayText(`FRUIT BASKET`, 72, width / 2, height / 2.5, "#322001");
    displayText(`Try to guess as many fruits as you can within 60 seconds`, 28, width / 2, height / 2, `#026440`);
    displayText(`Press ENTER to start`, 32, width / 2, height / 1.5, `#ffb733`);
    playMusic()
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