/**
Project 2: Gachapyon
Stephanie Dang.

This script is dedicated to all collection functionalities.
- Creates images for the collection
- Keeping track of items acquired
*/

// VARIABLES
const numStickers = 28;
// Creates sticker images for collection

showStickers();



$(`#collection button`).on("click", function (event) {
    switch ($(this).attr(`class`)) {
        case `btn-x`:
            $(`#collection`).css(`display`, `none`);
            break;
        case `btn-sticker`:
            showStickers();
            break;
        case `btn-plushie`:
            removeStickers();
            break;
    }
});


function showStickers() {
    for (let i = 0; i < numStickers; i++) {
        $(`.items`).append(`<div class="stickers sticker-${i}"></div>`);
        $(`.sticker-${i}`).css(`background-image`, `url("assets/images/collection/${i}.png")`);
    }
}

function removeStickers() {
    for (let i = 0; i < numStickers; i++) {
        $(`.sticker-${i}`).remove();
    }
}


function showPlushies() {
    console.log("hi");
}

function removePlushies() {
    
}