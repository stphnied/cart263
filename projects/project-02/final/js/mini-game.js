/**
Project 2: Gachapyon
Stephanie Dang.

This script is dedicated to the minigames functionalities.

- Uses p5js
- 
*/

// Variables
let minigameCanvas;
let catsData;
let catImg;
const
    CATS_URL = `assets/data/cats.json`
    NUM_CATS = 3;



function preload() {
    catsData = loadJSON(CATS_URL);
}

function setup() {
    minigameCanvas = createCanvas(750, 750);
    minigameCanvas.parent("#mini-games");
    catImg = loadImage(catsData.cats.tofu.paw_url); 
}

function draw() {
    background(127);
    displayUser();
    
}


function displayUser() {
     imageMode(CENTER);
     image(catImg, mouseX, mouseY, 100, 100);
}