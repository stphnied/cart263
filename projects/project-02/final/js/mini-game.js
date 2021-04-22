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
let userMG = {
    x: 0,
    y: 0,
    size: 150,
    img: undefined
};
let mouseImg;
const
    CATS_URL = `assets/data/cats.json`
NUM_CATS = 3;


// preloads()
// Loads data and images
function preload() {
    catsData = loadJSON(CATS_URL);
    mouseImg = loadImage(`assets/images/mouse.png`);
}

// setup()
// Setting up the canva and user
function setup() {
    minigameCanvas = createCanvas(1000, 800);
    minigameCanvas.parent("#mini-games");

    userSetup();
    noCursor();
}

// draw()
// 
function draw() {
    background(`aliceblue`);
    displayHoles(125, height / 5, 150, 4, 250);
    displayHoles(125, height / 1.5, 150, 4, 250);
    
    displayMouse(125, height / 1.5, 150, 4, 250);

    displayUser(125, height / 1.5, 150, 4, 250);


}

// userSetup()
// depending on the cat selected, will load a different image
function userSetup() {
    switch (user) {
        case ``:
            userMG.img = loadImage(catsData.cats.tofu.paw_url);
            break;
        case `tofu`:
            userMG.img = loadImage(catsData.cats.tofu.paw_url);
            break;
        case `lilo`:
            userMG.img = loadImage(catsData.cats.lilo.paw_url);
            break;
        case `kosper`:
            userMG.img = loadImage(catsData.cats.kosper.paw_url);
            break;
        default:
            break;
    }
}

// displayUser()
// Displaying the user's cursor image
function displayUser() {
    imageMode(CENTER);
    image(userMG.img, mouseX, mouseY, userMG.size, userMG.size);
}


function displayHoles(x, y, size, nbMoles, lineSpace) {
    for (let i = 0; i < nbMoles; i++) {
        ellipseMode(CENTER);
        stroke(`#777696`);
        strokeWeight(5);
        fill(`#838996`);
        ellipse(x, y, size);
        x += lineSpace;
    }
}

function displayMouse(x, y, size, nbMoles, lineSpace) {
        imageMode(CENTER);
        image(mouseImg, x, y, size);
        x += lineSpace;
}

function checkMouseOverlap() {
    for (let i = 0; i < nbCircles; i++) {
        let d = dist(mouseX, mouseY, x, y);
        if (d < userMG.size / 2 + size / 2) {
            // do stuff
        }
        x += lineSpace;
    }
}

function mouseClicked() {
    let d = dist();
}