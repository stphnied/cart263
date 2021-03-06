/**
Project 2: Gachapyon
Stephanie Dang.

This script is dedicated to all collection functionalities.
- Creates images for the collection
- Keeping track of items acquired
*/

// VARIABLES
const numStickers = 28;
const numPlushies = 56;

// Calling function
createCollection();

// Creates sticker images for collection
$(`#collection button`).on("click", function (event) {
    switch ($(this).attr(`class`)) {
        case `btn-x`:
            $(`#collection`).css(`display`, `none`);
            break;
        case `btn-sticker`:
            showStickers();
            removePlushies()
            break;
        case `btn-plushie`:
            showPlushies();
            removeStickers();
            break;
    }
});

// Creates the stickers and plushies collection
// creates a div and assign each a bg-img 
function createCollection() {
    for (let i = 0; i < numStickers; i++) {
        $(`<div>`).addClass(`stickers sticker-${i}`).appendTo(`.items`);
        $(`.sticker-${i}`).css(`background-image`, `url("assets/images/collection/${i}.png")`);
    }
    for (let i = 28; i < numPlushies; i++) {
        $(`.items`).append(`<div class="plushies plushie-${i}"></div>`);
        $(`.plushie-${i}`).css(`background-image`, `url("assets/images/collection/${i}.png")`);
    }
}

// Displays all the stickers
function showStickers() {
    for (let i = 0; i < numStickers; i++) {
        $(`.sticker-${i}`).show();
    }
}

// Removes all the stickers
function removeStickers() {
    for (let i = 0; i < numStickers; i++) {
        $(`.sticker-${i}`).hide();
    }
}

// Displays all the plushies
function showPlushies() {
    for (let i = 28; i < numPlushies; i++) {
        $(`.plushie-${i}`).show();
    }
}

// Removes all the plushies
function removePlushies() {
    for (let i = 0; i < numPlushies; i++) {
        $(`.plushie-${i}`).hide();
    }
}