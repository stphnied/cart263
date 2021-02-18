// Press functions
// Anything relating to keyPressed() or mousePressed()
"use strict";

// Going onto next state when pressing `ENTER`
function keyPressed() {
    if (state == `menu`) {
        if (keyCode === ENTER) {
            state = `instruction`;
        }
    }
    else if(state == `instruction`) {
        if (keyCode === ENTER) {
            state = `gameplay`;
        }
    }
}