/**
Project 2: Gachapyon
Stephanie Dang.

This is the main script.
It handles general interactivity of the HOME, MENU, INSTRUCTION.
    - Buttons to proceed to each different screen
    - Display gamer cat picture

The player will go through the HOME first and then the MENU to select his character.
Afterward, it will lead him to the INSTRUCTION screen where he can go to either MENU, GAME, JOB, COLLECTION.
*/

"use strict";
// Variables
let user = "";
let perksTxt = "";
// Sound
let sfxSrc;
let musicBgSrc;
// arraySource
let aMusicBgSrc = [`happyDay.mp3`, `8bitParadise.mp3`, `blueSky.mp3`];


/*//////////////////////////////////////////////////////////////
HOME
*/ /////////////////////////////////////////////////////////////
musicBgSrc = aMusicBgSrc[0];
playMusic();
// Click events----

// Hides home -> display menu 
$(`#home button`).on("click", function (event) {
    $(`#home`).css(`display`, `none`);
    $(`#menu`).css(`display`, `block`);
});

// Return button available on section
// Instruction, Collection, Gameplay
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
                    musicBgSrc = aMusicBgSrc[0];
                    playMusic();
                    break;
                case `mini-games`:
                    $(`#mini-games`).css(`display`, `none`);
                    $(`#instruction`).css(`display`, `block`);
                    musicBgSrc = aMusicBgSrc[0];
                    playMusic();
                    break;
                case `gacha-machine`:
                    $(`#gacha-machine`).css(`display`, `none`);
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
            $(`#choosing-dialog`).dialog("open");
            break;
        case `btn-job`:
            $(`#instruction`).css(`display`, `none`);
            $(`#mini-games`).css(`display`, `flex`);
            $(`.btn-return`).show();
            musicBgSrc = aMusicBgSrc[2];
            playMusic();
            break;
    }
});

// Choosing which game to play
// Display a JQUERY UI Dialog
$(`#choosing-dialog`).dialog({
    buttons: {
        "Claw machine": function () {
            $(`#instruction`).css(`display`, `none`);
            $(`#claw-machine`).css(`display`, `block`);
            musicBgSrc = aMusicBgSrc[1];
            playMusic();
            $(this).dialog(`close`);
        },
        "Gacha machine": function () {
            $(`#instruction`).css(`display`, `none`);
            $(`#gacha-machine`).css(`display`, `flex`);
            $(this).dialog(`close`);
        }
    },
    autoOpen: false
});

$(`.ui-dialog`).css({
    backgroundColor: `#97bcff`
});
$(`.ui-dialog-buttonset button`).css({
    fontFamily: `Fredoka One`,
    backgroundColor: `#97bcff`
});

$(`.ui-widget`).css(`font-family`, `Fredoka One`);



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
        // Setup the cat images
        showCatPaw();
        userSetup();
    });
}

/*//////////////////////////////////////////////////////////////
COLLECTION
*/ ////////////////////////////////////////////////////////////

// Shows the user's collection
$(`.btn-collection`).on(`click`, function () {
    $(`#collection`).css(`display`, `flex`);
    showStickers();
});


// Plays the background music
// If it's the claw-machine section : plays a different song
// Else : same bg music
function playMusic() {
    $(`#music`).attr({
        src: `assets/sounds/` + musicBgSrc,
        type: `audio/mpeg`,
        autoplay: `autoplay`,
        loop: `loop`
    })

    $(`#music`).prop(`volume`, 0.3);
}


// Button click sound effect
$(`button`).on(`click`, function () {
    let sfx = new Audio(`assets/sounds/btn.mp3`);
    sfx.loop = false;
    sfx.play();
});

/*//////////////////////////////////////////////////////////////
THE ENDING
*/ ////////////////////////////////////////////////////////////
$(`<img>`).attr(`src`, `assets/images/capsules.png`).addClass(`capsules`).prependTo(`#the-end`);

function displayEnding() {
    $(`#gacha-machine`).css(`display`, `none`);
    $(`#the-end`).css(`display`, `block`);
}

$(`#ending-dialog`).dialog({
    buttons: {
        "Okay": function () {
            $(`#claw-machine`).css(`display`, `none`);
            $(`#the-end`).css(`display`, `flex`);
            $(this).dialog(`close`);
        }
    },
    autoOpen: false
});

$(`.ui-dialog`).css({
    backgroundColor: `#97bcff`
});
$(`.ui-dialog-buttonset button`).css({
    fontFamily: `Fredoka One`,
    backgroundColor: `#97bcff`
});

$(`.ui-widget`).css(`font-family`, `Fredoka One`);