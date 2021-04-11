/**
Project 2: Gachapyon
Stephanie Dang.

For the prototype: 
*/

"use strict";
// Variables
let user = "";

$(`#claw-machine`).css(`display`, `none`);
$(`#instruction`).css(`display`, `block`);

/*//////////////////////////////////////////////////////////////
HOME
*/ /////////////////////////////////////////////////////////////

$(`#home button`).on("click", function (event) {
    $(`#home`).css(`display`, `none`);
    $(`#menu`).css(`display`, `block`);
})


$(`.btn-return`).on("click", function (event) {
    $(`section`).each(function () {
        if ($(this).css(`display`) !== `none`) {
            switch (this.id) {
                case `instruction`:
                    $(`.btn-return`).css(`display`,`none`);
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

// Changing CSS cursor to default
$(`.card`).css(`cursor`, `default`);

// Select buttons event listener
$(`#menu button`).on("click", function (event) {

    // Hiding menu and showing instruction section
    $(`#menu`).css(`display`, `none`);
    $(`#instruction`).css(`display`, `block`);
    $(`.btn-return`).css(`display`,`block`);
    // Get the parent's id of selected cat
    let catId = $(this).parent().parent().attr(`id`);
    // Gets the cats JSON image url depending on the selected cat
    $.getJSON("assets/data/cats.json", function (catsData) {
        switch (catId) {
            case `tofu-cat`:
                $(`.user`).attr(`src`, catsData.cats.tofu.url);
                user = "tofu";
                break;
            case `lilo-cat`:
                $(`.user`).attr(`src`, catsData.cats.lilo.url);
                user = "lilo";
                break;
            case `kosper-cat`:
                $(`.user`).attr(`src`, catsData.cats.kosper.url);
                user = "kosper";
                break;
        }
    });
})

// Hides instruction and show claw-machine section
$(`#instruction .btn-play`).on("click", function (event) {
    $(`#instruction`).css(`display`, `none`);
    $(`#claw-machine`).css(`display`, `block`);

});
