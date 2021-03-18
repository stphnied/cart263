/**JQUERY*/
"use strict";
let $headers = $(`.header`);
let $spanTxt = $(`#example-span`).text();
let reverseSpanTxt = $spanTxt.split(``).reverse().join(``);
let spanHtml = $(`#example-span`).html();
let $link = $(`#thicc-link`);
let $p = $(`<p></p>`);

// headers change
$headers.css({
    "background-color": `black`,
    "color": `blue`,
    "font-size": `2.5rem`
});

// reverse text
$(`#example-span`).text(reverseSpanTxt);

// add strong
$(`#example-span`).html(`<strong>${spanHtml}</strong>`);

// add an attribute
$(`#main-heading`).attr(`contenteditable`,`true`);

// change link name
if($link.attr(`href`) === `https://thi.cc`) {
    $link.text(`THICC`);
}

// Add new paragraph
$p.text(`Thicc is thicc`);
// after elm
$(`#second-section`).append($p);
// before elm
$(`#second-section`).prepend($p);
// add after all h2
$(`h2`).after($p);

// Remove
// $(`#main-heading`).remove();