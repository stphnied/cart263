/**
Activity 06: Raving Redactionist
Stephanie Dang

~Sad office hours~
Creating a webpage of text with some passages redacted (covered in black bars)

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

