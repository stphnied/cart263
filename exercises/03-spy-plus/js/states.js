// States
// Navigate through different states screens
"use strict";

// Displays the start screen
// Displays title and description of the game
// Call the function to play the background music
function menu() {
    displayText(`loading your profile`, 72, width / 2, height / 2.5, COLOR_GREEN);
    displayText(`please state your name`, 42, width / 2, height / 2, COLOR_GREEN);
    displayText(`[My name is ...]`, 32, width / 2, height / 1.75, COLOR_GREEN);
    displayText(`
    CAUTION:
    By entering this website...
    you are providing written instructions
    to PIPPINB Interactive, Inc. authorizing CART-263, Inc.
    to obtain information from your personal credit profile from xxx.
    You authorize PIPPINB, Inc.to obtain such information solely to confirm
    your identity and display your credit data to you.`,
    12, width / 2, height /1.1, COLOR_GREEN);
}

// Displays the gameplay screen
// Display instruction text
// Calls the function to display the answer and the next guess 
function mainpage() {
    // string template
    let profile = `** SPY PROFILE **    
    name: ${spyProfile.name}
    alias: ${spyProfile.alias}
    headquater: ${spyProfile.headquater}
    secret weapon: ${spyProfile.secretWeapon}
    companion: ${spyProfile.companion}
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