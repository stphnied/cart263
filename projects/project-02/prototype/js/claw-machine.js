/**
Project 2: Anything
Stephanie Dang.

This script is dedicated to the claw-machine functionality/interactivity.
*/

let clawHandle = $(`#claw-machine-handle`);
let clawJoystick = $(`#claw-machine-joystick`);
let clawBtnDown = $(`#claw-machine-btn-down`);
let jsDown = false;

$(`#claw-machine img`).addClass(`claw-machine-parts`);


$(`#claw-machine-handle`).draggable({
    containment: "#main-body"
});

// Down button
// change the scale on Y of the button to create a "click" animation
clawBtnDown.one({
    mousedown: function () {
        $(this).css(`transform`, `scaleY(0.8)`);
        clawHandle.finish().animate({
            top: "+=75",
            animation: "easin"
        });
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
        if (jsDown) {
            // to the right
            if (mouseX > mousePosCenter) {
                $(this).css(`transform`, `rotate(10deg)`);

                if (clawHandle.position().left < 380) {
                    clawHandle.finish().animate({
                        left: "+=10"
                    });
                }
            }
            // to the left
            else if (mouseX <= mousePosCenter) {
                $(this).css(`transform`, `rotate(-10deg)`);
                if (clawHandle.position().left > -50) {
                    clawHandle.finish().animate({
                        left: "-=10"
                    });
                }
            }
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