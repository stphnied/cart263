"use strict";

/*****************
Week 03
Stephanie Dang

This week's topic and experiments includes :
-Responsive voice
******************/

let phrase = `Would you like a cup of tea ?`;
let saying = ``;


function setup() {
    createCanvas(500, 500);
}


function draw() {
    background(255, 100, 150);

    push();
    textSize(32);
    textAlign(CENTER);
    text(saying, width / 2, height / 2);
    pop()

}

function mousePressed() {

    // UK English
    responsiveVoice.speak("Would you like a cup of tea?", "UK English Male", {
        onstart: showSpeaking,
        onend: hideSpeaking
    });

    // French 
    // responsiveVoice.speak("Comment ça va?", "French Female", {        
    //     rate: 1.5,
    //     volume: 1,
    //     pitch: 1});
}

function showSpeaking() {
    saying = phrase;
}

function hideSpeaking() {
    saying = ``;
}