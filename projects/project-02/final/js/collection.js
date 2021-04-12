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
for (let i = 0; i < numStickers; i++) {
    $(`.items`).append(`<div class="stickers sticker-${i}"></div>`);
    $(`.sticker-${i}`).css(`background-image`,`url("assets/images/collection/${i}.png")`);
}
