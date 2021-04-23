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


//   $(`<img>`).attr({
//         id:'toy',
//         src: `assets/images/collection/${randNb}.png`,
//         class: `toy`
//     }).appendTo(`#claw-machine .claw-machine-toys-container `)



function showStickers() {
    for (let i = 0; i < numStickers; i++) {
        $(`<div>`).addClass(`stickers sticker-${i}`).appendTo(`.items`);
        // $(`.items`).append(`<div class="stickers sticker-${i}"></div>`);
        $(`.sticker-${i}`).css(`background-image`, `url("assets/images/collection/${i}.png")`);
    }
}

function removeStickers() {
    for (let i = 0; i < numStickers; i++) {
        $(`.sticker-${i}`).remove();
    }
}


function showPlushies() {
    for (let i = 28; i < numPlushies; i++) {
        $(`.items`).append(`<div class="plushies plushie-${i}"></div>`);
        $(`.plushie-${i}`).css(`background-image`, `url("assets/images/collection/${i}.png")`);
    }
}

function removePlushies() {
    for (let i = 0; i < numPlushies; i++) {
        $(`.plushie-${i}`).remove();
    }
}