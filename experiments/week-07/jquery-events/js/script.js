/**JQUERY*/
"use strict";

// Remove on click, only once and affects all elm
$(`.header`).on(`click`, function (event) {
    // $(this).remove();
    $(this).css(`color`,`red`);
    $(`.header`).off(`click`);
});

// Add once on click
$(`section`).one(`click`, function (event) {
    $(this).append(`<p>Added</p>`);
});