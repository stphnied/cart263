"use strict";

/*****************

JSON
Stephanie Dang

******************/

let tarotData = undefined;
let fortune = "No fortune found yet...";

// preload()
// Description of preload
function preload() {
//     tarotData = loadJSON(`assets/data/tarot_interpretations.json`);
    tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
}


// setup()
// Description of setup
function setup() {
    createCanvas(windowWidth, windowHeight);

    let card = random(tarotData.tarot_interpretations);
    fortune = random(card.fortune_telling);

}


// draw()
// Description of draw()
function draw() {
    background(255);

    // let description = tarotData.description;
    // let firstShadowMeaning = tarotData.tarot_interpretations[0].meanings.shadow[0];

    push();
    textSize(32);
    textAlign(CENTER);
    fill(0);
    text(fortune,width/2,height/2);
    pop();
}



// v.2

// function mousePressed() {
//     loadJSON(`assets/data/tarot_interpretations.json`,tarotLoaded);
// }

// function tarotLoaded(data) {
//     tarotData = data;
//     let card = random(tarotData.tarot_interpretations);
//     fortune = random(card.fortune_telling);
// }