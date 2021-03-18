/**JQUERY*/
"use strict";
// add class
$(`.header`).addClass(`highlight`);
// remove class
$(`.header`).on('click', function (event) {
    $(this).removeClass(`highlight`);
})

// Blink effect
// setInterval(()=> {
//     $(`.header`).toggleClass(`highlight`);
// },500);

// Hide on click btn and reappear
// $(`#button`).on('click',function(event){
//     $(`#main-heading`).hide();
//     setTimeout(() => {
//         $(`.header`).show();
//     }, 400);
// })

// 
$(`#button`).on('click', function (event) {
    // Toggling
    // $(`.header`).toggle();

    // Fadeout - Fadein
    // $(`.header`).fadeOut(2000, () => {
    //     $(`.header`).fadeIn(2000);
    // });

    // Toggle fade
    // $(`.header`).fadeToggle(2000);

    // Slide 
    // $(`.header`).slideToggle(2000);

    // Animate
    $(`.header`).animate({
        "opacity": 0.5,
        "font-size": `3rem`,
        "height": `200px`
    }, {
        duration: 2000,
        complete: function () {
            $(this).text("ANIMATED");
        },
        easing: `linear`
    });

});

// Each
$(`.header`).each(function(){
    let reverseTxt = $(this).text().split(``).reverse().join(``);
    $(this).text(reverseTxt);
})