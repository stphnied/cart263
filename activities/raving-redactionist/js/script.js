/**
Activity 06: Raving Redactionist
Stephanie Dang

We will create a webpage of text with some passages “redacted” (covered in colored bars).
*/
"use strict";

$(`span`).addClass(`top-secret`);
$(`.top-secret`).on(`click`,redact);
setInterval(revelation, 500);


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