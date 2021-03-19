/**
Activity 06: Raving Redactionist
Stephanie Dang

~Sad office hours~
Endless battle to keep secret information being leaked.

Added features:
- New lorem ipsum
- The office sad vers. music
- Improved Looks
*/

"use strict";
// Adds a `top-secret` clas to all span
$(`span`).addClass(`top-secret`);
// Add an eventlistener 
$(`.top-secret`).on(`click`, redact);
// Reveals redacted information
setInterval(revelation, 500);

// Plays music
$(`#music`)[0].play();

// Calls attemptReveal function for all span
function revelation() {
    $(`span`).each(attemptReveal)
}

// Reveals the secret information
function attemptReveal() {
    let num = Math.random(0, 1);

    if (num < 0.1) {
        $(this).removeClass(`redacted`);
        $(this).addClass(`revealed`);
    }
}

// Redactes the secret info on click
function redact() {
    $(this).removeClass(`revealed`);
    $(this).addClass(`redacted`);
}

