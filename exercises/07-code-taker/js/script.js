/**
Code Taker ++
Stephanie Dang

The user is the Tom-Hanks-in-the-Da-Vinci-Code of classic poetry, seeing coded messages in poems.
The user reads a poem and searches it with their mouse to uncover special letters.
If they drag the letters in the correct order into a special solution area, they crack the code!
Code taker! Da Vinci!?

-Instruction
-CSS
-Retry btn
*/

"use strict";

// Code goes hereg

// Add event listener
$(`.secret`).on(`mouseover`, addClassFound);

// Add colors
function addClassFound(event) {
    $(this).addClass(`found`, 500);
    $(this).draggable({
        helper: "clone"
    });
}

// Droppable
$(`#answer`).droppable({
    drop: function (event, ui) {
        let character = ui.draggable.text();
        $(this).append(character);
        ui.draggable.draggable(`disable`);
        ui.draggable.removeClass(`found`);
        ui.draggable.off(`mouseover`);

        if ($(this).text() == `Theremin`) {
            $(`#solved-dialog`).dialog("open");
        }
    }
});

// Retry btn
$(`#retrybtn`).on(`click`, function (event, ui) {
    $(`#answer`).empty();
    $(`.secret`).on(`mouseover`, addClassFound);
    $(`.secret`).draggable(`enable`);

});

// Instruction dialog
$(`#instruction-dialog`).dialog({
    modal: true,
    resizable: false,
    buttons: {
        "Start": function () {
            $(this).dialog(`close`);
        }
    }
});

// Solved dialog
$(`#solved-dialog`).dialog({
    buttons: {
        "I know": function () {
            $(this).dialog(`close`);
        }
    },
    autoOpen: false
});