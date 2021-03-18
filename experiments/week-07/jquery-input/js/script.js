/**JQUERY*/
"use strict";

// input txt + btn
$(`#example-button`).on(`click`,function(){
    // $(this).remove();
    let $inputTxt = $(`#example-text`).val();
    console.log($inputTxt);
});

// slider
$(`#range-slider`).on(`change`,function(event){
    let inputSlider = $(this).val();
    console.log(inputSlider);
})