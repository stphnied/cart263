"use strict";

/*****************

Exercise 02: Slamina : Fruit basket
Stephanie Dang

The program will speak the name of a common fruit in a distorted voice and the user will have to say (with their voice) what they think it is in the form “I think it is x.”
If they get it right, their guess will be displayed in green, if they get it wrong, their guess will be displayed in red.
******************/

// Variables ----------------------------------

// States
let state = `menu`;
// Current fruit name to guess
let currentFruit = ``;
// Current user guess
let currentAnswer = ``;
// Instruction text
let instructionTxt = `Guess the fruit by saying "I think it is"`;
//Constant for loading sound
const BACKGROUND_MUSIC = `assets/sounds/piece-of-cake.mp3`;
// Music
let bgSFX;


// preload()
// Loads the music
function preload() {
    bgSFX = loadSound(`${BACKGROUND_MUSIC}`)
}

// setup()
// Setting up canvas
// Setting up Annyang with text defaults
function setup() {
    createCanvas(1000, 750);

    // Check if annyang is available
    if (annyang) {
        // Create commands
        let commands = {
            'I think it is *fruit': guessFruit
        };

        // Add and calls commands
        annyang.addCommands(commands);
        annyang.start();
    }

    // Text defaults
    textSize(36);
    textStyle(BOLD);
    textAlign(CENTER);
    noStroke();
}


// draw()
// Display background
//if correct answer, displays it
//else : nothing
function draw() {
    background(250);

    switch (state) {
        case "menu":
            menu();
            break;
        case "play":
            play();
    }
}

// keyPressed function 
// Navigates to the next screen
// Allows to restart the game by pressing ENTER once the game ended
function keyPressed() {
    if (state == `menu`) {
        if (keyCode === ENTER) {
            state = `play`;
        }
    }
}

// When user clicks : says the fruit name backward
function mousePressed() {
    if (state === "play") {
        currentFruit = random(fruits);
        let reverseAnimal = reverseString(currentFruit);
        responsiveVoice.speak(reverseAnimal, "UK English Male");
        console.log(currentFruit);

        // instructionTxt = "";
    }

}

// Called by annyang
// User making guess
// fruit param = user's guess
function guessFruit(fruit) {
    currentAnswer = fruit.toLowerCase();
    console.log(currentAnswer);
}

// Reverses the provided string
function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split('');
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join('');
    // Return the result
    return result;
}

// Display the current in green if right
function displayAnswer() {
    if (currentAnswer === currentFruit) {
        fill(0, 255, 0);
    } else {
        fill(0, 0, 0);
    }

    text(currentAnswer, width / 2, height / 2);
}


// Display the buton for the next guess
function displayNextBtn() {
    fill(`#026440`);
    displayText(`NEW FRUIT`,14,width/2,height/1.16,0)
    ellipse(width/2,height/1.1,50,50);
}

// Text configuration
function displayText(string, size, x, y, color) {
    push();
    textAlign(CENTER, CENTER);
    textSize(size);
    fill(color);
    text(string, x, y);
    pop();
}

// Play music in loop
function playMusic() {
    if (!bgSFX.isPlaying()) {
        bgSFX.setVolume(0.05)
        bgSFX.loop();
    }
}