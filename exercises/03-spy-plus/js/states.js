// States
// Navigate through different states screens
"use strict";

// Displays the start screen
// Displays title and description of the game
// Call the function to play the background music
function menu() {
    displayText(`FRUIT BASKET`, 72, width / 2, height / 2.5);
    displayText(`Reverse spelling bee where you have to guess the fruit!`, 28, width / 2, height / 2);
    displayText(`Press ENTER to start`, 32, width / 2, height / 1.5);
    playMusic();
}

// Displays the gameplay screen
// Display instruction text
// Calls the function to display the answer and the next guess 
function play() {

      // string template
    let profile = `** SPY PROFILE **    
    name: ${spyProfile.name}
    alias: ${spyProfile.alias}
    secret weapon: ${spyProfile.secretWeapon}
    password: ${spyProfile.password}`;

    push();
    fill(COLOR_GREEN);
    textSize(32);
    textStyle(BOLD);
    textAlign(TOP, LEFT);
    textFont(`Courier, monospace`);
    text(profile, 100, 100);
    pop();
}