"use strict";

const d = document;
let button = d.getElementById(`btn`);
let textInput = d.getElementById(`textBtn`);
let slider = d.getElementById(`inputSlider`);
let btnSlider = d.getElementById(`btnSlider`);
let inputColor = d.getElementById(`inputColor`);
// Text input
button.addEventListener(`click`, function (event) {
    let input = textInput.value;

});

textInput.addEventListener(`keydown`,function(event){
    // Enter
    if(event.keyCode === 13) {
        let input = textInput.value;
        alert(input);
    }
});

// Slider btn
btnSlider.addEventListener(`click`, function(event){
    let value = slider.value;
    console.log(value);
});
// Slider
slider.addEventListener(`change`,function(event){
    console.log("slider value:"+slider.value);
});

// Color picker
inputColor.addEventListener(`input`,function(event){
    let color = inputColor.value;
    d.body.style[`background`] = color;
});