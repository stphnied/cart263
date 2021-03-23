/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Code goes hereg

// Add event listener
$(`.secret`).one(`mouseover`, function (event) {
    $(this).addClass(`found`, 500);
    $(this).draggable({
        helper: "clone"
    });
});

// Droppable
$(`#answer`).droppable({
    drop: function (event, ui) {
        let character = ui.draggable.text();
        $(this).append(character);

        ui.draggable.draggable(`disable`);
        ui.draggable.removeClass(`found`);
        ui.draggable.off(`mouseover`);

        if($(this).text() == `Theremin`){
            $(`#solved-dialog`).dialog("open");
        }
    }
});

$(`#solved-dialog`).dialog({
    buttons: {
        "I know": function () {
            $(this).dialog(`close`);
        }
    },
    autoOpen: false
});