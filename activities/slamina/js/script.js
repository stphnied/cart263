"use strict";

/*****************

Activity 03: Slamina
Stephanie Dang

The program will speak the name of a common animal backwards and the user will have to say (with their voice) what they think it is in the form “I think it is x.”
 If they get it right, their guess will be displayed in green, if they get it wrong, their guess will be displayed in red.
******************/

// Variables ----------------------------------

// Current animal name to guess
let currentAnimal = "";
// Current user guess
let currentAnswer = "";
// Instruction text
let instructionTxt = "Click to start";

// setup()
// Setting up canvas
// Setting up Annyang with text defaults
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Check if annyang is available
    if (annyang) {
        // Create commands
        let commands = {
            'I think it is *animal': guessAnimal
        };

        // Add and calls commands
        annyang.addCommands(commands);
        annyang.start();
    }

    // Text defaults
    textSize(55);
    textStyle(BOLD);
    textAlign(CENTER);
}


// draw()
// Display background
//if correct answer, displays it
//else : nothing
function draw() {
    background(0);
    
    push();
    fill(255);
    text(instructionTxt, width / 2, height / 2);
    pop();

    displayAnswer();
}

// When user clicks : says the animal name backward
function mousePressed() {
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    responsiveVoice.speak(reverseAnimal, "UK English Male");
    console.log(currentAnimal);

    instructionTxt = "";
}

// Called by annyang
// User making guess
// animal param = user's guess
function guessAnimal(animal) {
    currentAnswer = animal.toLowerCase();
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
    if (currentAnswer === currentAnimal) {
        fill(0, 255, 0);
    } else {
        fill(0, 0, 0);
    }

    text(currentAnswer, width / 2, height / 2);
}