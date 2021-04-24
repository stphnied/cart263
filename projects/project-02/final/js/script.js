/**
Project 2: Gachapyon
Stephanie Dang.

For the prototype:
As of now, the user is able draag the coin and insert it inside the coin slot to activate the joystick and button
Once they click on the button, it will drop down&up the claw and returns to its initial position.
The joystick and button are will be disabled after that. 

*/

"use strict";
// Variables
let user = "tofu";
let perksTxt = "";

/*//////////////////////////////////////////////////////////////
HOME
*/ /////////////////////////////////////////////////////////////

// Click events----

// Hides home -> display menu 
$(`#home button`).on("click", function (event) {
    $(`#home`).css(`display`, `none`);
    $(`#menu`).css(`display`, `block`);
});

// Return button available on section
// Instruction, Collection and Gameplay
$(`.btn-return`).on("click", function (event) {
    $(`section`).each(function () {
        if ($(this).css(`display`) !== `none`) {
            switch (this.id) {
                case `instruction`:
                    $(`.btn-return`).css(`display`, `none`);
                    $(`#instruction`).css(`display`, `none`);
                    $(`#menu`).css(`display`, `block`);
                    break;
                case `claw-machine`:
                    $(`#claw-machine`).css(`display`, `none`);
                    $(`#instruction`).css(`display`, `block`);
                    break;
            }
        }
    })
});


/*//////////////////////////////////////////////////////////////
MENU
*/ ////////////////////////////////////////////////////////////

// Select buttons event listener
// Setting up #instruction images and perks depending on user's choice
$(`#menu button`).on("click", function (event) {

    // Hiding menu and showing instruction section
    $(`#menu`).css(`display`, `none`);
    $(`#instruction`).css(`display`, `block`);
    $(`.btn-return`).css(`display`, `block`);

    // Call function that will show the chosen cat
    let catId = $(this).parent().parent().attr(`id`);
    showCat(catId);
});


/*//////////////////////////////////////////////////////////////
INSTRUCTION
*/ ////////////////////////////////////////////////////////////

// Click event---
// Shows the Collection
// Proceed to gameplay
$(`#instruction button`).on("click", function (event) {
    switch ($(this).attr(`class`)) {
        case `btn-collection`:
            $(`#collection`).css(`display`, `flex`);
            showStickers();
            break;
        case `btn-play`:
            $(`#instruction`).css(`display`, `none`);
            $(`#claw-machine`).css(`display`, `block`);
            break;
    }
});


// Displaying the user's cat
// Depending on which cat, different img and text
function showCat(catId) {
    // Giving perks to cat
    let perks = "";
    // Gets the cats JSON image url depending on the selected cat
    $.getJSON("assets/data/cats.json", function (catsData) {
        switch (catId) {
            case `tofu-cat`:
                $(`.user`).attr(`src`, catsData.cats.tofu.url);
                user = "tofu";
                perks = catsData.cats.tofu.perk

                break;
            case `lilo-cat`:
                $(`.user`).attr(`src`, catsData.cats.lilo.url);
                user = "lilo";
                perks = catsData.cats.lilo.perk
                break;
            case `kosper-cat`:
                $(`.user`).attr(`src`, catsData.cats.kosper.url);
                user = "kosper";
                perks = catsData.cats.kosper.perk
                break;
        }
        $(`.left-side p`).text(perks);
    });
}

/*//////////////////////////////////////////////////////////////
COLLECTION
*/ ////////////////////////////////////////////////////////////
$(`.btn-collection`).on(`click`, function(){
$(`#collection`).css(`display`, `flex`);
            showStickers();
});