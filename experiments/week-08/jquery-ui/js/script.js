/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
$(`#prisoner`).effect({
    effect: `shake`,
    duration: 2000,
    time: 15,
    distance:7,
    complete: makePrisonerDraggable
})

$(`#escape-tunnel`).droppable({
    drop: function (event,ui) {
        $(ui.draggable).remove();
        $(this).hide({
            effect:`blind`,
            duration:500
        });
    }
})

// setTimeout(function() {
//     $(`#prisoner`).draggable(`disable`);
// }, 5000);


function makePrisonerDraggable() {
$(`#prisoner`).draggable({
    containment: `parent`,
    start: function (event,ui) {
        // $(this).css(`text-decoration`, `underline`);
        // $(this).animate({
        //     "color": `#4444ff`
        // },750);
        $(this).addClass("dragged",750);
    },
    stop: function (event,ui) {
        // $(this).css(`text-decoration`, `none`);
        // $(this).animate({
        //     "color": `black`
        // },750);
        $(this).removeClass("dragged",750);
    }
});
}