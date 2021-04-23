/**
Project 2: Anything
Stephanie Dang.

This script is dedicated to the claw-machine functionality/interactivity.
*/

// VARIABLES

// Claw machine parts
let clawHandle = $(`#claw-machine-handle-container`);
let clawJoystick = $(`#claw-machine-joystick`);
let clawBtnDown = $(`#claw-machine-btn-down`);
let jsDown = false;
let jsLeft = false;
let btnDown = false;

// Money
const clawMPrice = 1;
let walletAmount = 0;
let insertedCoins = 0;
let amountPaid = false;
let noRefund = false;

// Toys
let plushToy;
let iNb = 28;
let randNb;
let plushies = [];
let plushiesCollected = [];
let isGrabbed = false;


// Adding absolute class to all the claw-machine parts
$(`#claw-machine img`).addClass(`claw-machine-parts`);
// $(`#claw-machine`).css(`background-image`, `url("assets/images/claw-machines/background.png")`);



/*/////////////////////////////////////////////////////////////////////////////////
USER
*/ /////////////////////////////////////////////////////////////////////////////////
$(`#claw-machine .user`).css({
    position: `absolute`,
    width: `400px`,
    height: `400px`,
    bottom: `-18px`,
    right:`15%`,
})
// $(`#paw-user`).attr()
showCatPaw();
function showCatPaw() {
    // Gets the cats JSON image url depending on the selected cat
    $.getJSON("assets/data/cats.json", function (catsData) {
        switch (user) {
            case `tofu`:
                $(`#paw-user`).attr(`src`, catsData.cats.tofu.paw_url);
                break;
            case `lilo`:
                $(`#paw-user`).attr(`src`, catsData.cats.lilo.paw_url);
                break;
            case `kosper`:
                $(`#paw-user`).attr(`src`, catsData.cats.kosper.paw_url);
                break;
        }
    });
}


/*/////////////////////////////////////////////////////////////////////////////////
COINS
*/ /////////////////////////////////////////////////////////////////////////////////

// Adding values to the coins 
// Coin-1 -> 1$
// Coin-2 -> 2$
$(`.coin-1`).attr(`value`, `1`);
$(`.coin-2`).attr(`value`, `2`);

coinRandomPos();
function coinRandomPos() {
    // Top position = min: 0 max: 125px
    // Left position = min: 0 max: 325px
    let randTop = (Math.random() * 172) + -27;
    let randLeft = (Math.random() * 221) + 18;

     $(`.coin`).css({
        top:randTop,
        left: randLeft
    });
}

// Coins are draggable
$(`.coin`).draggable({
    revert: "valid"
});

// Coin-slot is now droppable
// Coins can be dragged in it
$(`#claw-machine-coin-slot`).droppable({
    // When dropped
    // Hide the coin and add a "used" class
    drop: function (event, ui) {
        $(ui.draggable).hide({
            effect: `scale`,
            duration: 500
        });

        $(ui.draggable).addClass(`used`);

        // Updates the inserted coins amount
        insertedCoins += $(ui.draggable).attr(`value`);

        // If it is equals to the claw-machine price then allows to play
        if (insertedCoins == clawMPrice) {
            amountPaid = true;
        }
    }
});

// Reset coins
// If the player did not play yet and wants his coin back
$(`#claw-machine-btn-reset`).on(`click`, function (event) {
    if (!noRefund) {
        $(`.used`).show("scale");
        $(`.used`).removeClass(`used`);
        insertedCoins = 0;
        amountPaid = false;
        noRefund = false
    }
});

// If the joystick has been used -> can no longer get a refund
function removeCoin() {
    if ($(`.coin`).hasClass(`used`)) {
        $(`.used`).remove();
    }
}

/*/////////////////////////////////////////////////////////////////////////////////
TOYS
*/ /////////////////////////////////////////////////////////////////////////////////
// Creates an empty div where the toy will drop 
$(`<div>`).attr({
    id: `drop-plush-container`,
    class: `claw-machine-parts`
}).css({
    width: `150px`,
    height: `150px`,
    left: `17%`,
    bottom: `15%`,

}).appendTo(`#claw-machine #main-body`);

// Adds elm to the plushies array (28-56)
for (let i = 0; i <= 28; i++) {
    plushies[i] = iNb;
    iNb++;
}

displayRandPlush();
// Displays a random plushie
// Excluding the previous pull
function displayRandPlush() {
    do {
        randNb = Math.floor(Math.random() * (numPlushies - 28 + 1)) + 28;
    }
    while (plushies[randNb] == -1);
    plushToy = plushies[randNb];
    plushies[randNb] = -1;


    $(`<img>`).attr({
        id: 'toy',
        src: `assets/images/collection/${randNb}.png`,
        class: `toy`
    }).appendTo(`#claw-machine .claw-machine-toys-container `)

    // Top position = min: 0 max: 125px
    // Left position = min: 0 max: 325px
    let randTop = (Math.random() * 125) + 0;
    let randLeft = (Math.random() * 325) + 0;
    // Assign random top & left pos for the toy
    $(`.toy`).css({
        top:randTop,
        left: randLeft
    });
}


// Adds the grabbed plush into collection
function addPlushCollection() {
    plushiesCollected.push(randNb);
}

// Check if the claw touched the toy
function collidePlush() {
    isColliding($(`#toy`), $(`#handle-box-collider`));
}

// Plays a drop animation on picked toy
// Displays it in the drop-container
function plushDropAnim() {
    // Drop animation
    $(`#toy`).animate({
        bottom: "-50%",
        opacity: 0,
        animation: "easein"
    }, function () {
        $(`#toy`).appendTo(`#drop-plush-container`)
        $(`#toy`).css({
            bottom: `0`,
            left: `10%`,
            width: `125px`,
            height: `105px`
        });
    });
    $(`#toy`).animate({
        opacity: 1,
        animation: "easein"
    });
}

// When clicking on 
$(`#toy`).on(`click`, function (event) {
    $(this).effect(`puff`, `slow`, function () {
        $(this).remove();
    });
    addPlushCollection();
    isGrabbed = false;
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
            }, "slow");

            clawHandle.animate({
                top: "0",
                animation: "easeout"
            }, "slow");

            clawHandle.animate({
                left: 0,
                animation: "easeinout",
            }, 3000, function () {
                if (isGrabbed) {
                    plushDropAnim()
                }
            });
            // Checks if the claw is overlapping the toy
            let callInterval = setInterval(collidePlush, 200);
            setTimeout(function () {
                clearInterval(callInterval);
            }, 1000);
        }
    },
    mouseup: function () {
        $(this).css(`transform`, `scaleY(1)`);
        insertedCoins = 0;
        btnDown = false;
        amountPaid = false;
        noRefund = false;
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
        // Finding mouse pos code inspired by: https://css-tricks.com/snippets/jquery/get-x-y-mouse-coordinates/
        let mouseX = (event.pageX - $(this).offset().left);
        let mouseposMin = 20;
        let mousePosMax = 33;

        if (amountPaid) {
            if (jsDown && !btnDown) {
                // to the right
                if (mouseX > mousePosMax) {
                    $(this).css(`transform`, `rotate(10deg)`);
                    jsLeft = false;
                }
                // to the left
                else if (mouseX <= mouseposMin) {
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
function joystickControl(event) {
    // to the right
    if (clawHandle.position().left < 400 && !jsLeft) {
        clawHandle.finish().animate({
            left: "+=10"
        });
    }
    // to the left
    else if (clawHandle.position().left > -10 && jsLeft) {
        clawHandle.finish().animate({
            left: "-=10"
        });
    }

    // Calls removing coin function
    removeCoin();
    noRefund = true;
}

// Function detecting collision between two div
// Code inspired by: https://gist.github.com/jtsternberg/c272d7de5b967cec2d3d
function isColliding(div1, div2) {
    let d1Offset = div1.offset();
    let d1Height = div1.outerHeight(true);
    let d1Width = div1.outerWidth(true);
    let d1Top = d1Offset.top + d1Height;
    let d1Left = d1Offset.left + d1Width;

    let d2Offset = div2.offset();
    let d2Height = div2.outerHeight(true);
    let d2Width = div2.outerWidth(true);
    let d2Top = d2Offset.top + d2Height;
    let d2Left = d2Offset.left + d2Width;

    if (!(d1Top < d2Offset.top || d1Offset.top > d2Top || d1Left < d2Offset.left || d1Offset.left > d2Left)) {
        isGrabbed = true;
        $(`#toy`).appendTo(`#handle-box-collider`);
        $(`#toy`).removeClass(`toy`);
        $(`#toy`).addClass(`grabbed`);
        $(`.grabbed`).css({
            top: ``,
            left: ``
        });

    } else {
        isGrabbed = false;
    };
    // return !(d1Top < d2Offset.top || d1Offset.top > d2Top || d1Left < d2Offset.left || d1Offset.left > d2Left);

};