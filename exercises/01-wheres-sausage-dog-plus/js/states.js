// States
// Navigate thru different states screens
"use strict";

// Displays the start screen
function start() {
    background(255,150,100);
    displayText(`Where's Mr. Sausage Dog?`, 72, width / 2, height / 2.5,255);
    displayText(`Activity 01`, 56, width / 2, height / 2,255);
    
    playMusic()
    createSausageDog();
    updateSausageDog();
}

// Displays the gameplay screen
function play() {
    updateAnimals();
    updateSausageDog();
}

// Displays the end screen
function end() {
    background(255,150,100);
    displayText(`Press enter to play again!`, 72, width / 2, height / 2.5,255);
    sausageDog.found = true;
    sausageDog.update();
}