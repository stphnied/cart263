/**
Project 2: Anything
Stephanie Dang.

This script is dedicated to the claw-machine functionality/interactivity.

For the prototype:
As of now, the user is able draag the coin and insert it inside the coin slot to activate the joystick and button
Once they click on the button, it will drop down&up the claw and returns to its initial position.
The joystick and button are will be disabled after that. 

*/

// VARIABLES

// Claw machine parts
let clawHandle = $(`#claw-machine-handle`);
let clawJoystick = $(`#claw-machine-joystick`);
let clawBtnDown = $(`#claw-machine-btn-down`);
let jsDown = false;
let jsLeft = false;
let btnDown = false;

// Money
const clawMPrice = 0.25;
let walletAmount = 0;
let insertedCoins = 0;
let amountPaid = false;
let coin25, coin1, coin2;

// Adding absolute class to all the claw-machine parts
$(`#claw-machine img`).addClass(`claw-machine-parts`);



/*/////////////////////////////////////////////////////////////////////////////////
COINS
*/ /////////////////////////////////////////////////////////////////////////////////

// Adding values to the coins 
// Coin-0 -> 0.25c
// Coin-1 -> 1$
// Coin-2 -> 2$
$(`.coin-0`).attr(`value`, `0.25`);
$(`.coin-1`).attr(`value`, `1`);
$(`.coin-2`).attr(`value`, `2`);

// Coins are draggable
$(`.coin-0`).draggable({
    revert: "valid"
});

// Insert coins here
$(`#claw-machine-coin-slot`).droppable({
    drop: function (event, ui) {
        // $(ui.draggable).remove();
        $(ui.draggable).hide({
            effect: `blind`,
            duration: 500
        });

        // Updates the inserted coins
        insertedCoins += $(ui.draggable).attr(`value`);
        // Check if they add the exact amount to play
        if (insertedCoins == clawMPrice) {
            amountPaid = true;
        }
    }
});

// Reset coins
$(`#claw-machine-btn-reset`).on(`click`, function (event) {
    console.log("clicked it!");
    $(`.coin-01`).show("blind");

})


/*/////////////////////////////////////////////////////////////////////////////////
CLAW MACHINE DOWN BUTTON (↓) 
*/ /////////////////////////////////////////////////////////////////////////////////

// change the scale on Y of the button to create a "click" animation
// Control the clawHandle up and down movement, brings back to initial position
clawBtnDown.on({
    mousedown: function () {
        if (amountPaid) {
            btnDown = true;
            $(this).css(`transform`, `scaleY(0.8)`);
            clawHandle.animate({
                top: "+=100",
                animation: "easein"
            }, "slow")
            clawHandle.animate({
                top: "0",
                animation: "easeout"
            }, "slow")
            clawHandle.animate({
                left: 0,
                animation: "easeinout"
            }, 3000)
        }
    },
    mouseup: function () {
        $(this).css(`transform`, `scaleY(1)`);
        insertedCoins = 0;
        btnDown = false;
        amountPaid = false;
    }
});


/*/////////////////////////////////////////////////////////////////////////////////
Joystick
*/ /////////////////////////////////////////////////////////////////////////////////

// On mouse events
// mousedown: set the jsDown bool to true --> allows rotation
// mouseup: set the jsDown bool to false --> stops the rotation
// mousemove: rotates the joystick from left to right depending on mouse position
// mouseleave: initial position --> stops rotation and movement
clawJoystick.on({
    mousedown: function () {
        jsDown = true;
    },
    mouseup: function () {
        jsDown = false;
    },
    mousemove: function (event) {
        // mouse position
        let mouseX = event.pageX - this.offsetLeft;
        let mousePosCenter = 660;

        if (amountPaid) {
            if (jsDown && !btnDown) {
                // to the right
                if (mouseX > mousePosCenter) {
                    $(this).css(`transform`, `rotate(10deg)`);
                    jsLeft = false;
                }
                // to the left
                else if (mouseX <= mousePosCenter) {
                    $(this).css(`transform`, `rotate(-10deg)`);
                    jsLeft = true;

                }
                joystickControl();
            }
            // Return to normal position
            else {
                $(this).css(`transform`, `rotate(0)`);
                jsDown = false;
            }
        }

    },
    mouseleave: function () {
        jsDown = false;
        $(this).css(`transform`, `rotate(0)`);
    },

});


// Joystick movement control
// constraining movement within the claw machine
function joystickControl() {
    // to the right
    if (clawHandle.position().left < 380 && !jsLeft) {
        clawHandle.finish().animate({
            left: "+=10"
        });
    }
    // to the left
    else if (clawHandle.position().left > -40 && jsLeft) {
        clawHandle.finish().animate({
            left: "-=10"
        });
    }
}