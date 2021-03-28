/**
Project 2: Anything
Stephanie Dang.

This script is dedicated to the claw-machine functionality/interactivity.
*/

let clawHandle = $(`#claw-machine-handle`);
let clawJoystick = $(`#claw-machine-joystick`);
let clawBtnDown = $(`#claw-machine-btn-down`);
let jsDown = false;
let jsLeft = false;
let btnDown = false;

$(`#claw-machine img`).addClass(`claw-machine-parts`);


$(`#claw-machine-handle`).draggable({
    containment: "#main-body"
});

// Down button
// change the scale on Y of the button to create a "click" animation
// Control the clawHandle up and down movement, brings back to initial position
clawBtnDown.on({
    mousedown: function () {
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
        },3000)
    },
    mouseup: function () {
        $(this).css(`transform`, `scaleY(1)`);
    }
});


// Joystick

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