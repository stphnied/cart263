/**
Project 2: Anything
Stephanie Dang.

This script is dedicated to the claw-machine functionality/interactivity and the money-data

- Displays different claw-machines
- Can manipulate the machine:
    - Can drag coins inside the slot machine
    - Can ask for refund by clicking on button
    - Can control the claw with the joystick and drop the claw by clicking the big button
    - Can grab the plushies and add to collection

- Can check your collection
- Can see your wallet amount

- Loads previous data for the money if there is any
*/

// VARIABLES

// Claw machine parts
let clawBody = $(`#claw-machine-body`);
let clawHandle = $(`#claw-machine-handle-container`);
let clawJoystick = $(`#claw-machine-joystick`);
let clawBtnDown = $(`#claw-machine-btn-down`);
let jsDown = false;
let jsLeft = false;
let btnDown = false;
let colorNumb = 0;

// Money
let insertedCoins = 0;
let amountPaid = false;
let noRefund = false;
const clawMPrice = 3;

// Toys
let plushToy;
let iNb = 28;
let randNb;
let plushies = [];
let plushiesCollected = [];
let isGrabbed = false;


// Calling functions
checkData();
showCatPaw();
updateMoneyText();
coinRandomPos();
draggableCoin();
addCoinValue();


// Adding absolute class to all the claw-machine parts
$(`#claw-machine img`).addClass(`claw-machine-parts`);
// Adding the background image for the claw-machine section
$(`#claw-machine`).css({
    backgroundImage: `url(assets/images/claw-machines/background.png)`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`
});

/*/////////////////////////////////////////////////////////////////////////////////
USER
*/ /////////////////////////////////////////////////////////////////////////////////
$(`#claw-machine .user`).css({
    position: `absolute`,
    width: `400px`,
    height: `400px`,
    bottom: `-18px`,
    right: `15%`,
});

// Assign an image source to the user 
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
function addCoinValue() {
    $(`.coin-1`).attr(`value`, `1`);
    $(`.coin-2`).attr(`value`, `2`);
}

// Randomly assign a position
function coinRandomPos() {
    // Top position = min: -27 max: 125px
    // Left position = min: 18 max: 325px
    let randTop = (Math.random() * 172) + -27;
    let randLeft = (Math.random() * 50) + 18;

    $(`.coin`).css({
        top: randTop,
        left: randLeft
    });
}

// Coins are draggable
function draggableCoin() {
    $(`.coin`).draggable({
        revert: "valid"
    });
}

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

        // Add an used coin to mark them
        $(ui.draggable).addClass(`used`);
        // Plays a coin sfx
        let sfx = new Audio(`assets/sounds/coin-slot.mp3`);
        sfx.play();

        // Updates the inserted coins amount
        insertedCoins += parseInt($(ui.draggable).attr(`value`));
        data -= parseInt($(ui.draggable).attr(`value`));
        updateData(data);
        updateMoneyText();

        // If it is equals to the claw-machine price then allows to play
        if (insertedCoins == clawMPrice) {
            $(`#confirm-dialog`).dialog("open");
            $(`.coins`).hide();
        }

        // Hides the <> buttons 
        $(`.selectMachine button`).hide();
        $(`.btn-return`).hide();
    }
});

// When the user clicks on the reset button ==> calls for refund()
// Plays a refund sfx
$(`#claw-machine-btn-reset`).on(`click`, function (event) {
    refund();

    let sfx = new Audio(`assets/sounds/coin-reward.mp3`);
    sfx.play();
});

// If the user did not play yet:
// Remove the used class and show the coin
// Updated the user's wallet
// Sets back to initial
function refund() {
    if (!noRefund) {
        $(`.used`).show("scale");
        $(`.used`).removeClass(`used`);

        data += insertedCoins;
        updateData(data);

        insertedCoins = 0;
        updateMoneyText();

        amountPaid = false;
        noRefund = false;
    
        // show <> Button again
        $(`.selectMachine button`).show();
        $(`.btn-return`).show();
    }
}

// Removes the coin's existence
// If the joystick has been used -> can no longer get a refund
function removeCoin() {
    if ($(`.coin`).hasClass(`used`)) {
        $(`.used`).remove();
    }
}

/*/////////////////////////////////////////////////////////////////////////////////
PAYMENT DIALOG
*/ /////////////////////////////////////////////////////////////////////////////////

// Display a JQUERY UI DIALOG to confirm the payment
// Yes: proceed payment
// No: refund payment
$(`#confirm-dialog`).dialog({
    buttons: {
        "Yew": function () {
            amountPaid = true;
            noRefund = true;
            insertedCoins = 0;

            updateMoneyText();
            displayRandPlush();
            removeCoin();

            $(this).dialog(`close`);
        },
        "Nyo": function () {
            refund();

            $(`.selectMachine button`).show();
            $(`.btn-return`).show();
            $(`.coins`).show();

            $(this).dialog(`close`);
        }
    },
    autoOpen: false
});

// Changing the style of the Dialog
$(`.ui-dialog`).css({
    backgroundColor: `#97bcff`
});
$(`.ui-dialog-buttonset button`).css({
    fontFamily: `Fredoka One`,
    backgroundColor: `#97bcff`
});

$(`.ui-widget`).css(`font-family`, `Fredoka One`);


/*/////////////////////////////////////////////////////////////////////////////////
TOYS
*/ /////////////////////////////////////////////////////////////////////////////////

// Creates an empty div where the toy will drop 
$(`<div>`).attr({
    id: `drop-plush-container`
}).css({
    position: `absolute`,
    width: `150px`,
    height: `150px`,
    left: `17%`,
    bottom: `15%`,

}).appendTo(`#claw-machine #main-body`);

// Adds elm to the plushies array (28-55)
for (let i = 0; i <= 27; i++) {
    plushies[i] = iNb;
    iNb++;
}


// Displays a random plushie
// Excluding the previous pull
// 0 -> orange | 1 -> blue | 2 -> pink | 3 -> purple (machine)
// 35-41        42-48       49-55       28-34         (plushies)
function displayRandPlush() {
    let minRNb;
    let maxRNb;
    switch (colorNumb) {
        case 0:
            minRNb = 35;
            maxRNb = 41;
            break;
        case 1:
            minRNb = 42;
            maxRNb = 48;
            break;
        case 2:
            minRNb = 49;
            maxRNb = 55;
            break;
        case 3:
            minRNb = 28;
            maxRNb = 34;
            break;
        default:
            break;
    }
    do {
        // Math.floor(Math.random() * (max - min + 1)) + min
        randNb = Math.floor(Math.random() * (maxRNb - minRNb + 1)) + minRNb;
    }
    while (plushies[randNb] == -1);

    // Assign the random number to the plushtoy
    plushToy = randNb;

    // Displays the plush toy on the screen
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
        top: randTop,
        left: randLeft
    });
}


// Check if the claw touched the toy
function collidePlush() {
    isColliding($(`#toy`), $(`#handle-box-collider`));
}

// Plays a drop animation once the claw's position is back to 0
// Displays the toy in the drop-container
// Enable de collecPlush()
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
    }, collectPlush);
}

// When clicking on the plush:
// Plays a removing animation
// Adds the plush to the collection
// Change the value to -1 (keeping the position of item without deleting it from array)
function collectPlush() {
    $(`#toy`).on(`click`, function (event) {
        $(this).effect(`puff`, `slow`, function () {
            $(this).remove();
        });

        addPlushCollection();
        plushies[randNb] = -1;
        isGrabbed = false;

        // plays a collect sound
        let sfx = new Audio(`assets/sounds/collect.mp3`);
        sfx.play();

        // Shows the <> buttons 
        $(`.selectMachine button`).show();
        $(`.btn-return`).show();
        $(`.coins`).show();

    });
}

// Adds the grabbed plush into collection
// If all the plushies are collected ===> GAME ENDS
function addPlushCollection() {
    plushiesCollected.push(plushToy);
    $(`.plushie-${plushToy}`).addClass(`gotItem`);

    // If all plushies are collected
    if (plushiesCollected.length == 28) {
        $(`#ending-dialog`).dialog("open");
    }
}

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

        // Play press btn sound
        let sfx = new Audio(`assets/sounds/press-btn.mp3`);
        sfx.play();
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

        // If the user paid the exact amount, they can control the joystick
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

                // Calls the joystick that will control the claws
                joystickControl();
            }
            // Return to normal position
            else {
                $(this).css(`transform`, `rotate(0)`);
                jsDown = false;
            }
        }

    },
    // Stops movement once the mouse is not on the joystick
    mouseleave: function () {
        jsDown = false;
        $(this).css(`transform`, `rotate(0)`);
    },

});

// Joystick movement control
// Controling the claw inside the machine
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

    } 
    
    else {
        isGrabbed = false;
    }
};

/*/////////////////////////////////////////////////////////////////////////////////
SWITCH CLAW MACHINES (BUTTONS)
*/ /////////////////////////////////////////////////////////////////////////////////

// Changes the colors of the machine by clicking next or previous arrows
// 0 -> orange | 1 -> blue | 2 -> pink | 3 -> purple
$(`.selectMachine button`).on(`click`, function (event) {
    switch ($(this).attr(`class`)) {
        // PREVIOUS button
        case `previous`:
            if (colorNumb > 0) {
                colorNumb -= 1;
            }
            else if (colorNumb < 1) {
                colorNumb = 3;
            }
            break;
            // NEXT button
        case `next`:
            if (colorNumb < 3) {
                colorNumb += 1;
            }
            else if (colorNumb == 3) {
                colorNumb = 0;
            }
            break;
    }
    // Changes the image source to the color of the machines
    clawBody.attr(`src`, `assets/images/claw-machines/claw-machine-${colorNumb}.png`);
    clawJoystick.attr(`src`, `assets/images/claw-machines/joystick-${colorNumb}.png`);
    clawBtnDown.attr(`src`, `assets/images/claw-machines/btn-${colorNumb}.png`);
    $(`#toy-bg`).attr(`src`, `assets/images/claw-machines/toys-${colorNumb}.png`);
    $(`#claw-machine-handle`).attr(`src`, `assets/images/claw-machines/claw-${colorNumb}.png`);
});