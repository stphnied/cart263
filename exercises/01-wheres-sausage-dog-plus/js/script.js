"use strict";

/*****************

Activity 01 : Where's Sausage dog? - PLUS EDITION
Stephanie Dang

Try finding the sausage dog among other animals!
The player has to click on the sausage dog to win the game.
When successfull, the sausage dog will start spinning

Additional features : 
- Start & End screens
- Restart game


******************/

// Constants for image loading
const
    NUM_ANIMAL_IMG = 10,
    NUM_ANIMAL_DISPLAY = 100, //Number of img to display
    ANIMALS_IMG = `assets/images/animal`,
    SAUSAGE_DOG_IMG = `assets/images/sausage-dog.png`;

// Arrays of the loaded imgs
let animalImages = [];
// Arrays for animals object
let animals = [];

// Sausage dog object
let sausageDog;
// Sausage dog image
let sausageDogImg;

// current game state
let state = `start`;

// Loads all the animal images and sausage image
function preload() {

    for (let i = 0; i < NUM_ANIMAL_IMG; i++) {
        let animalImage = loadImage(`${ANIMALS_IMG}${i}.png`);
        animalImages.push(animalImage);
    }

    sausageDogImg = loadImage(`${SAUSAGE_DOG_IMG}`);
}

// Creates all the animal objects and sausage dog object
function setup() {
    createCanvas(windowWidth, windowHeight);

    createAnimals();
    createSausageDog();
}

// Creates all the animals at a random position
// Displays random animals images
function createAnimals() {
    //create animals
    for (let i = 0; i < NUM_ANIMAL_DISPLAY; i++) {
        let x = random(0, width);
        let y = random(0, height);

        let animalImage = random(animalImages);
        let animal = new Animal(x, y, animalImage);
        animals.push(animal);
    }
}

// Create the sausage dog at a random position
function createSausageDog() {
    let x = random(0, width);
    let y = random(0, height);
    sausageDog = new SausageDog(x, y, sausageDogImg);
}

// Draws the background and updates all animals and sausage dog
function draw() {
    background(255);

    switch (state) {
        case `start`:
            start();
            break;
        case `play`:
            play();
            break;
        case `end`:
            end();
            break;
    }
}

// Calls the update() method for all animals
function updateAnimals() {
    // display all animals
    for (let i = 0; i < animals.length; i++) {
        animals[i].update();
    }
}

// Calls the update() method for sausage dog
function updateSausageDog() {
    // Update the sausage dog
    sausageDog.update();
}

// Calls the mousePressed() method in js/Sausage-dog.js 
function mousePressed() {
    sausageDog.mousePressed();
    if (state == `start`) {
        state = `play`;
    }
}

// Allows to restart the game by pressing ENTER once the game ended
function keyPressed() {
    if (state == `end`) {
        if (keyCode === ENTER) {
            location.reload();
        }
    }
}

// Text configuration
function displayText(string, size, x, y, alpha) {
    push();
    textAlign(CENTER, CENTER);
    textSize(size);
    fill(255, 255, 255, alpha);
    text(string, x, y);
    pop();
}